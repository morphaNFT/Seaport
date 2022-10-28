const { expect } = require("chai");
const {getSignatureData, makeOrderSalt, getOfferData1155, fulfillAdvancedOrder} = require("./signature");
const {Contract} = require("ethers");
const {abi1155} = require("./abi/ERC1155.json")
const {abi} = require("../artifacts/contracts/Seaport.sol/Seaport.json")
const config = require("../config.json")



describe("【【seaport contract test 1155】】", function () {
    describe("fulfillAdvancedOrder", function () {
        it("fulfillAdvancedOrder true", async function () {
            const [sellSigner, buySigner] = await ethers.getSigners();
            console.log("sellAddress", await sellSigner.getAddress())
            console.log("buyAddress", await buySigner.getAddress())
            const netWork = await ethers.provider.getNetwork();
            console.log("【networkId】:",netWork.chainId)
            // 交易原始数据
            const offerData = getOfferData1155();
            const token = offerData.offer[0].token
            // nft授权approve
            let nftInstanceWithSigner = new Contract(token, abi1155, sellSigner)
            let tx = await nftInstanceWithSigner.setApprovalForAll(config.seaport_xsc_main.conduitAddress, true)
            await tx.wait();
            console.log("SetApprovalForAll txHash：",tx.hash)
            let salt = makeOrderSalt(77)
            // 交易数据签名
            const signatureData = getSignatureData(netWork.chainId, config.seaport_xsc_main.seaport, offerData.offerer, offerData.zone, offerData.offer, offerData.consideration,
                offerData.orderType,offerData.startTime, offerData.endTime, offerData.zoneHash, salt, config.seaport_xsc_main.conduitKey, offerData.counter);
            let signature = await sellSigner._signTypedData(signatureData[0], signatureData[1], signatureData[2])
            console.log("signature", signature)

            // fulfillBasicOrder方法inputData

            // signature = "0x1c6657bc7661c94b29458b137e41ebbb0dfdc1e53f4bcb8ecabbafb7f264f7df31f99bb48ce3d2d040140fa309b4705a630b4cfad2149574f44f6c1e1719e4b01c"
            // salt = "53831889355276379944314786763478960796829837246325694460708211809927873791297"

            const inputData = fulfillAdvancedOrder(offerData, salt, signature, config.seaport_xsc_main.conduitKey)
            console.log("inputData", inputData)
            const options = {value: offerData.price}
            console.log("options",options)
            const buySignerContract = new Contract(config.seaport_xsc_main.seaport, abi, buySigner)
            const result = await buySignerContract.fulfillAdvancedOrder(
                inputData.advancedOrder,
                inputData.criteriaResolvers,
                inputData.fulfillerConduitKey,
                inputData.recipient,
                options);
            await result.wait()
            console.log("result", result.hash)

            const number = await nftInstanceWithSigner.balanceOf(await buySigner.getAddress(),offerData.offer[0].identifierOrCriteria)
            console.log("buy",number)
        });
    });
});