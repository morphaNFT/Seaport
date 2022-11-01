const { expect } = require("chai");
const {getSignatureData, makeOrderSalt, getOfferData721, getOfferData721Other, fulfillAvailableOrders
} = require("./signature");
const {Contract} = require("ethers");
const {abi721} = require("./abi/ERC721.json")
const {abi} = require("../artifacts/contracts/Seaport.sol/Seaport.json")
const config = require("../config.json")



describe("【【fulfillAvailableOrders Test】】", function () {
    describe("fulfillAvailableOrders", function () {
        it("fulfillAvailableOrders true", async function () {
            const [sellSigner01, sellSigner02, buySigner] = await ethers.getSigners();
            console.log("sell01Address", await sellSigner01.getAddress())
            console.log("sell02Address", await sellSigner02.getAddress())
            console.log("buyAddress", await buySigner.getAddress())
            const netWork = await ethers.provider.getNetwork();
            console.log("【networkId】:",netWork.chainId)
            // 交易原始数据721
            const offerData721 = getOfferData721()
            const token721 = offerData721.offer[0].token
            let nftInstance721 = new Contract(token721, abi721, sellSigner01)
            let tx721 = await nftInstance721.setApprovalForAll(config.seaport_xsc_main.conduitAddress, true)
            await tx721.wait();
            console.log("SetApprovalForAll 721 txHash：",tx721.hash)

            // 交易原始数据Other
            const offerDataOther = getOfferData721Other();
            const token = offerDataOther.offer[0].token
            // nft授权approve
            let nftInstanceOther = new Contract(token, abi721, sellSigner02)
            let txOther = await nftInstanceOther.setApprovalForAll(config.seaport_xsc_main.conduitAddress, true)
            await txOther.wait();
            console.log("SetApprovalForAll txOther txHash：",txOther.hash)


            offerData721.salt = makeOrderSalt(77)
            // 交易数据签名721
            const signatureData721 = getSignatureData(netWork.chainId, config.seaport_xsc_main.seaport, offerData721.offerer, offerData721.zone, offerData721.offer, offerData721.consideration,
                offerData721.orderType,offerData721.startTime, offerData721.endTime, offerData721.zoneHash, offerData721.salt, config.seaport_xsc_main.conduitKey, offerData721.counter);
            let signature721 = await sellSigner01._signTypedData(signatureData721[0], signatureData721[1], signatureData721[2])
            console.log("signature721", signature721)
            offerData721.signature = signature721

            offerDataOther.salt = makeOrderSalt(77)
            // 交易数据签名Other
            const signatureDataOther = getSignatureData(netWork.chainId, config.seaport_xsc_main.seaport, offerDataOther.offerer, offerDataOther.zone, offerDataOther.offer, offerDataOther.consideration,
                offerDataOther.orderType,offerDataOther.startTime, offerDataOther.endTime, offerDataOther.zoneHash, offerDataOther.salt, config.seaport_xsc_main.conduitKey, offerDataOther.counter);
            let signatureOther = await sellSigner01._signTypedData(signatureDataOther[0], signatureDataOther[1], signatureDataOther[2])
            console.log("signatureOther", signatureOther)
            offerDataOther.signature = signatureOther

            const inputDataShopCar = fulfillAvailableOrders(offerData721, offerDataOther, config.seaport_xsc_main.conduitKey)
            // console.log("inputData", inputDataShopCar)
            const options = {value: "21000000000000000"}
            console.log("options",options)
            const buySignerContract = new Contract(config.seaport_xsc_main.seaport, abi, buySigner)

            console.log("orders", inputDataShopCar.orders)
            console.log("offerFulfillments", inputDataShopCar.offerFulfillments)
            console.log("considerationFulfillments", inputDataShopCar.considerationFulfillments)
            console.log("fulfillerConduitKey", inputDataShopCar.fulfillerConduitKey)
            console.log("maximumFulfilled", inputDataShopCar.maximumFulfilled)

            const result = await buySignerContract.fulfillAvailableOrders(
                inputDataShopCar.orders,
                inputDataShopCar.offerFulfillments,
                inputDataShopCar.considerationFulfillments,
                inputDataShopCar.fulfillerConduitKey,
                inputDataShopCar.maximumFulfilled,
                options);
            await result.wait()
            console.log("result", result.hash)
        });
    });
});