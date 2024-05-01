async function main() {
    const netWork = await ethers.provider.getNetwork();
    console.log("【networkId】:",netWork.chainId)

    const [deployer] = await ethers.getSigners();
    console.log("【deployer】:", await deployer.getAddress());

    // deploy ConduitController contract
    const ConduitControllerContract = await ethers.getContractFactory("ConduitController");
    const ConduitController = await ConduitControllerContract.deploy()
    await ConduitController.deployed();
    console.log("【ConduitController】:", ConduitController.address);

    // init conduit
    const conduitKey = await deployer.getAddress() + "000000000000000000000000"
    console.log("【conduitKey 】:", conduitKey)
    const initialOwner = await deployer.getAddress()
    await ConduitController.createConduit(conduitKey, initialOwner)
    const conduitAddress = await ConduitController.getConduit(conduitKey);
    console.log("【conduitAddress】:", conduitAddress[0])

    // deploy Seaport contract
    const seaportContract = await ethers.getContractFactory("Seaport");
    const seaport = await seaportContract.deploy(ConduitController.address)
    await seaport.deployed();
    console.log("【seaport】:", seaport.address);

    // create channel
    await ConduitController.updateChannel(conduitAddress[0], seaport.address, true);
    console.log("【add channel】:", seaport.address)
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });