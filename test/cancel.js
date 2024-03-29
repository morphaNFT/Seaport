const { expect } = require("chai");
const {getOfferData721, getSignatureData, fulfillBasicOrder, addBigNum, makeOrderSalt} = require("./signature");
const {Contract} = require("ethers");
const {abi721} = require("./abi/ERC721.json")
const {abi} = require("../artifacts/contracts/Seaport.sol/Seaport.json")
const config = require("../config.json")


//  单个721交易
describe("【Order cancel test】", function () {
    describe("cancel", function () {
        it("cancel true", async function () {
            // 选择网络
            const networkData = config.seaport_sepolia

            const [sellSigner] = await ethers.getSigners();
            console.log("sellAddress", await sellSigner.getAddress())
            const netWork = await ethers.provider.getNetwork();
            console.log("networkId:",netWork.chainId)
            // 交易原始数据
            const offerData = getOfferData721();
            const salt = makeOrderSalt(77)
            const orderComponents = [
                {
                    "offerer": offerData.offerer,
                    "zone": offerData.zone,
                    "offer": offerData.offer,
                    "consideration": offerData.consideration,
                    "orderType": offerData.orderType,
                    "startTime": offerData.startTime,
                    "endTime": offerData.endTime,
                    "zoneHash": offerData.zoneHash,
                    "salt": salt,
                    "conduitKey": networkData.conduitKey,
                    "counter": offerData.counter
                }
            ]
            // const options = {gasLimit: 500000}
            // console.log("options",options)
            const sellSignerContract = new Contract(networkData.seaport, abi, sellSigner)
            const result = await sellSignerContract.cancel(orderComponents);
            // 交易哈希
            console.log('cancel Transaction hash:', result.hash);
            await result.wait()
            // 获取order的hash
            const orderHash = await sellSignerContract.getOrderHash(orderComponents[0])
            console.log('order hash:',orderHash)
            // 获取order的链上状态
            const [isValidated, isCancelled, totalFilled, totalSize] = await sellSignerContract.getOrderStatus(orderHash)
            console.log('Order Validated:', isValidated);
            console.log('Order Cancelled:', isCancelled);
            console.log('Total Filled:', totalFilled.toString());
            console.log('Total Size:', totalSize.toString());
            // 断言cancel是否执行成功
            expect(isCancelled).to.be.true;
        });
    });
});