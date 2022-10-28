const { expect } = require("chai");
const {getSignatureData, makeOrderSalt, getOfferData1155, fulfillAdvancedOrder, getOfferData721,
    fulfillAvailableAdvancedOrders
} = require("./signature");
const {Contract} = require("ethers");
const {abi721} = require("./abi/ERC721.json")
const {abi1155} = require("./abi/ERC1155.json")
const {abi} = require("../artifacts/contracts/Seaport.sol/Seaport.json")
const config = require("../config.json")



describe("【【fulfillAvailableAdvancedOrders Test】】", function () {
    describe("fulfillAvailableAdvancedOrders", function () {
        it("fulfillAvailableAdvancedOrders true", async function () {
            const [sellSigner, buySigner] = await ethers.getSigners();
            console.log("sellAddress", await sellSigner.getAddress())
            console.log("buyAddress", await buySigner.getAddress())
            const netWork = await ethers.provider.getNetwork();
            console.log("【networkId】:",netWork.chainId)
            // 交易原始数据721
            const offerData721 = getOfferData721()
            const token1155 = offerData721.offer[0].token
            let nftInstance721 = new Contract(token1155, abi721, sellSigner)
            let tx721 = await nftInstance721.setApprovalForAll(config.seaport_xsc_main.conduitAddress, true)
            await tx721.wait();
            console.log("SetApprovalForAll 721 txHash：",tx721.hash)
            // 交易原始数据1155
            const offerData1155 = getOfferData1155();
            const token = offerData1155.offer[0].token
            // nft授权approve
            let nftInstance1155 = new Contract(token, abi1155, sellSigner)
            let tx1155 = await nftInstance1155.setApprovalForAll(config.seaport_xsc_main.conduitAddress, true)
            await tx1155.wait();
            console.log("SetApprovalForAll tx1155 txHash：",tx1155.hash)


            offerData721.salt = makeOrderSalt(77)
            // 交易数据签名721
            const signatureData721 = getSignatureData(netWork.chainId, config.seaport_xsc_main.seaport, offerData721.offerer, offerData721.zone, offerData721.offer, offerData721.consideration,
                offerData721.orderType,offerData721.startTime, offerData721.endTime, offerData721.zoneHash, offerData721.salt, config.seaport_xsc_main.conduitKey, offerData721.counter);
            let signature721 = await sellSigner._signTypedData(signatureData721[0], signatureData721[1], signatureData721[2])
            console.log("signature721", signature721)
            offerData721.signature = signature721

            offerData1155.salt = makeOrderSalt(77)
            // 交易数据签名1155
            const signatureData1155 = getSignatureData(netWork.chainId, config.seaport_xsc_main.seaport, offerData1155.offerer, offerData1155.zone, offerData1155.offer, offerData1155.consideration,
                offerData1155.orderType,offerData1155.startTime, offerData1155.endTime, offerData1155.zoneHash, offerData1155.salt, config.seaport_xsc_main.conduitKey, offerData1155.counter);
            let signature1155 = await sellSigner._signTypedData(signatureData1155[0], signatureData1155[1], signatureData1155[2])
            console.log("signature1155", signature1155)
            offerData1155.signature = signature1155


            const inputDataShopCar = fulfillAvailableAdvancedOrders(offerData721, offerData1155, config.seaport_xsc_main.conduitKey)
            console.log("inputData", inputDataShopCar)
            const options = {value: "12000000000000000"}
            console.log("options",options)
            const buySignerContract = new Contract(config.seaport_xsc_main.seaport, abi, buySigner)
            const result = await buySignerContract.fulfillAvailableAdvancedOrders(
                inputDataShopCar.advancedOrders,
                inputDataShopCar.criteriaResolvers,
                inputDataShopCar.offerFulfillments,
                inputDataShopCar.considerationFulfillments,
                inputDataShopCar.fulfillerConduitKey,
                inputDataShopCar.recipient,
                inputDataShopCar.maximumFulfilled,
                options);
            await result.wait()
            console.log("result", result.hash)
        });
    });
});