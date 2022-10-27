async function main() {
    const netWork = await ethers.provider.getNetwork();
    console.log("【networkId】:",netWork.chainId)

    const [deployer] = await ethers.getSigners();
    console.log("【account】:", await deployer.getAddress());

    // deploy ConduitController contract
    const ConduitControllerContract = await ethers.getContractFactory("ConduitController");
    const ConduitController = await ConduitControllerContract.deploy()
    await ConduitController.deployed();
    console.log("【ConduitController address】:", ConduitController.address);

    // init conduit
    const conduitKey = "0x8a8ee995fce4e30ecf6627a9d06409766d4d1492000000000000000000000000"
    const initialOwner = "0x8A8ee995FcE4E30Ecf6627a9D06409766d4d1492"
    await ConduitController.createConduit(conduitKey, initialOwner)
    const conduitAddress = await ConduitController.getConduit(conduitKey);
    console.log("【create conduit 】:", conduitAddress[0])

    // deploy Seaport contract
    const seaportContract = await ethers.getContractFactory("Seaport");
    const seaport = await seaportContract.deploy(ConduitController.address)
    await seaport.deployed();
    console.log("【seaport address】:", seaport.address);

    // create channel
    await ConduitController.updateChannel(conduitAddress[0], seaport.address, true);
    console.log("【create channel】:", seaport.address)
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });



// account             0x8A8ee995FcE4E30Ecf6627a9D06409766d4d1492
// ConduitController   0xdC2F49e23dE19A376c8705eb333B058b4352047e
// conduit             0xad82C51FEbE75Ab93A27f603098aE45429132D28
// seaport             0x7665FC4a6D22C60f72e1f5Bdcd32C764c6dD8A09