const { expect } = require("chai");
const {getOfferData721, getSignatureData, fulfillBasicOrder, addBigNum, makeOrderSalt} = require("./signature");
const {Contract, BigNumber} = require("ethers");
const {abi721} = require("./abi/ERC721.json")
const {abi20} = require("./abi/ERC20.json")
const {abi} = require("../artifacts/contracts/Seaport.sol/Seaport.json")
const config = require("../config.json")


//  单个721交易
describe("【【seaport contract test 721】】", function () {
    describe("fulfillBasicOrder", function () {
        it("fulfillBasicOrder true", async function () {
            // 选择网络
            const networkData = config.seaport_morph

            const [sellSigner, buySigner] = await ethers.getSigners();
            console.log("sellAddress", await sellSigner.getAddress())
            console.log("buyAddress", await buySigner.getAddress())
            const netWork = await ethers.provider.getNetwork();
            console.log("networkId:",netWork.chainId)
            // 交易原始数据
            const offerData = getOfferData721();
            const token = offerData.offer[0].token
            // nft授权approve
            let contractWithSigner = new Contract(token, abi721, sellSigner)
            let tx = await contractWithSigner.setApprovalForAll(networkData.conduitAddress, true)
            await tx.wait();
            console.log("SetApprovalForAll txHash：",tx.hash)
            // token授权
            if (offerData.consideration[0].token !== "0x0000000000000000000000000000000000000000") {
                let tokenContractWithSigner = new Contract(offerData.consideration[0].token, abi20, buySigner)
                const amountToApprove = BigNumber.from('10000000000000000000');
                let txApprove = await tokenContractWithSigner.approve(networkData.conduitAddress, amountToApprove)
                await tx.wait();
                console.log("approve txHash：",txApprove.hash)
            }
            const salt = makeOrderSalt(77)
            // 交易数据EIP-712签名
            const signatureData = getSignatureData(netWork.chainId, networkData.seaport, offerData.offerer, offerData.zone, offerData.offer, offerData.consideration,
                offerData.orderType,offerData.startTime, offerData.endTime, offerData.zoneHash, salt, networkData.conduitKey, offerData.counter);
            const signature = await sellSigner._signTypedData(signatureData[0], signatureData[1], signatureData[2])
            console.log("signature", signature)
            // fulfillBasicOrder方法inputData
            const inputData = fulfillBasicOrder(offerData, salt, signature, networkData.conduitKey)
            console.log("inputData", inputData)
            const options = {value: offerData.price, gasLimit: 500000}
            // const options = {gasLimit: 500000}
            console.log("options",options)
            const buySignerContract = new Contract(networkData.seaport, abi, buySigner)
            const result = await buySignerContract.fulfillBasicOrder(inputData, options);
            // 交易哈希
            console.log('Transaction hash:', result.hash);
            await result.wait()
            //  断言nft新的owner是否与购买者一致
            const newOwner = await contractWithSigner.ownerOf(offerData.offer[0].identifierOrCriteria)
            expect(newOwner.toUpperCase()).to.equal((await buySigner.getAddress()).toUpperCase())
            console.log("newOwner",newOwner)
        });
    });
});