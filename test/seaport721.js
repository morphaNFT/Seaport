const { expect } = require("chai");
const {getOfferData721, getSignatureData, getTransactionInputData721, addBigNum, makeOrderSalt} = require("./signature");
const {Contract} = require("ethers");
const {abi721} = require("./abi/ERC721.json")
const {abi} = require("../artifacts/contracts/Seaport.sol/Seaport.json")
const config = require("../config.json")



describe("【【seaport contract test 721】】", function () {
    describe("fulfillBasicOrder", function () {
        it("fulfillBasicOrder true", async function () {
            const [sellSigner, buySigner] = await ethers.getSigners();
            console.log("sellAddress", await sellSigner.getAddress())
            console.log("buyAddress", await buySigner.getAddress())
            const netWork = await ethers.provider.getNetwork();
            console.log("Deploying 【networkId】:",netWork.chainId)
            // 交易原始数据
            const offerData = getOfferData721();
            const token = offerData.offer[0].token
            // nft授权approve
            let contractWithSigner = new Contract(token, abi721, sellSigner)
            let tx = await contractWithSigner.setApprovalForAll(config.seaport_xsc_main.conduitAddress, true)
            await tx.wait();
            console.log("SetApprovalForAll txHash：",tx.hash)
            const salt = makeOrderSalt(77)
            // 交易数据签名
            const signatureData = getSignatureData(netWork.chainId, config.seaport_xsc_main.seaport, offerData.offerer, offerData.zone, offerData.offer, offerData.consideration,
                offerData.orderType,offerData.startTime, offerData.endTime, offerData.zoneHash, salt, config.seaport_xsc_main.conduitKey, offerData.counter);
            const signature = await sellSigner._signTypedData(signatureData[0], signatureData[1], signatureData[2])
            console.log("signature", signature)
            // fulfillBasicOrder方法inputData
            const inputData = getTransactionInputData721(offerData, salt, signature, config.seaport_xsc_main.conduitKey)
            console.log("inputData", inputData)
            const options = {value: offerData.price}
            console.log("options",options)
            const buySignerContract = new Contract(config.seaport_xsc_main.seaport, abi, buySigner)
            const result = await buySignerContract.fulfillBasicOrder(inputData, options);
            await result.wait()
            console.log("result", result.hash)
            //  断言nft新的owner是否与购买者一致
            const newOwner = await contractWithSigner.ownerOf(offerData.offer[0].identifierOrCriteria)
            expect(newOwner.toUpperCase()).to.equal((await buySigner.getAddress()).toUpperCase())
            console.log("newOwner",newOwner)
        });
    });
});