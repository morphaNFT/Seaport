module.exports = {
    getSignatureData: function (netId, seaportAddress, offerer, zone, offer, consideration, orderType,
                                startTime, endTime, zoneHash, salt, conduitKey, counter) {

        const domain = {
            name: "Seaport",
            version: "1.1",
            chainId: netId,
            verifyingContract: seaportAddress,
        }

        const types = {
            OrderComponents: [
                { name: "offerer", type: "address" },
                { name: "zone", type: "address" },
                { name: "offer", type: "OfferItem[]" },
                { name: "consideration", type: "ConsiderationItem[]" },
                { name: "orderType", type: "uint8" },
                { name: "startTime", type: "uint256" },
                { name: "endTime", type: "uint256" },
                { name: "zoneHash", type: "bytes32" },
                { name: "salt", type: "uint256" },
                { name: "conduitKey", type: "bytes32" },
                { name: "counter", type: "uint256" },
            ],
            OfferItem: [
                { name: "itemType", type: "uint8" },
                { name: "token", type: "address" },
                { name: "identifierOrCriteria", type: "uint256" },
                { name: "startAmount", type: "uint256" },
                { name: "endAmount", type: "uint256" },
            ],
            ConsiderationItem: [
                { name: "itemType", type: "uint8" },
                { name: "token", type: "address" },
                { name: "identifierOrCriteria", type: "uint256" },
                { name: "startAmount", type: "uint256" },
                { name: "endAmount", type: "uint256" },
                { name: "recipient", type: "address" },
            ],
        };

        const message = {
            offerer: offerer,
            zone: zone,
            offer: offer,
            consideration: consideration,
            orderType: orderType,
            startTime: startTime,
            endTime: endTime,
            zoneHash: zoneHash,
            salt: salt,
            conduitKey: conduitKey,
            counter: counter
        }

        return [domain, types, message]
    },
    makeOrderSalt: function (length) {
        let result = ""
        const characters = "0123456789"
        const charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            )
        }
        return result
    },
    getOfferData721: function () {
        return {
            price: "100000000000000000",
            offerer: "0x8A8ee995FcE4E30Ecf6627a9D06409766d4d1492",
            offer: [
                {
                    itemType: 2,                 // 0 ETH 1 ERC20 2 ERC721
                    token: "0x4c9c4c269dd1d3cd970647b64a232f343198bfca",                   // NFT 合约地址
                    identifierOrCriteria: 0,     // tokenId or root merkel root
                    startAmount: 1,              // 数量
                    endAmount: 1                 // 数量
                }
            ],
            consideration: [
                {
                    itemType: 0,
                    token: "0x0000000000000000000000000000000000000000",
                    identifierOrCriteria: 0,
                    startAmount: '9250000000000000',
                    endAmount: '9250000000000000',
                    recipient: "0x8A8ee995FcE4E30Ecf6627a9D06409766d4d1492",
                },
                {
                    itemType: 0,
                    token: "0x0000000000000000000000000000000000000000",
                    identifierOrCriteria: 0,
                    startAmount: '250000000000000',
                    endAmount: '250000000000000',
                    recipient: "0x00EE50f5CD1560aA685432BC91Fc872B274d19a2"
                },
                {
                    itemType: 0,
                    token: "0x0000000000000000000000000000000000000000",
                    identifierOrCriteria: 0,
                    startAmount: '500000000000000',
                    endAmount: '500000000000000',
                    recipient: "0x8A8ee995FcE4E30Ecf6627a9D06409766d4d1492"
                }
            ],
            startTime: "1665557877",
            endTime: "1668236277",
            orderType: 0,
            zone: "0x0000000000000000000000000000000000000000",
            zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
            salt: "",
            // conduitKey: "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
            counter: 0
        }
    },

    getTransactionInputData721: function (offerData, salt, signature, conduitKey) {
        let additionalRecipients = []
        if (offerData.consideration.length > 1) {
            for (let i = 1; i < offerData.consideration.length; i++) {
                additionalRecipients[i-1] = {
                    "amount": offerData.consideration[i].startAmount,
                    "recipient": offerData.consideration[i].recipient
                }
            }
        }

        return {
            "additionalRecipients": additionalRecipients,
            "basicOrderType": offerData.orderType,
            "considerationAmount": offerData.consideration[0].startAmount,
            "considerationIdentifier": offerData.consideration[0].identifierOrCriteria,
            "considerationToken": offerData.consideration[0].token,
            "endTime": offerData.endTime,
            "fulfillerConduitKey": conduitKey,
            "offerAmount": offerData.offer[0].startAmount,
            "offerIdentifier": offerData.offer[0].identifierOrCriteria,
            "offerToken": offerData.offer[0].token,
            "offerer": offerData.offerer,
            "offererConduitKey": conduitKey,
            "salt": salt,
            "signature": signature,
            "startTime": offerData.startTime,
            "totalOriginalAdditionalRecipients": additionalRecipients.length,
            "zone": offerData.zone,
            "zoneHash": offerData.zoneHash
        }
    },

    addBigNum: function addBigNum(a, b){
        let arrA = String(a).split('').reverse()
        let arrB = String(b).split('').reverse()
        let aLen = arrA.length
        let bLen = arrB.length
        let shortArr, shortLen, longArr, longLen
        let result = []
        if(aLen<bLen){
            shortArr = arrA
            shortLen = aLen
            longArr = arrB
            longLen = bLen
        }else {
            shortArr = arrB
            shortLen = bLen
            longArr = arrA
            longLen = aLen
        }
        let add = 0
        for(let i = 0; i < shortLen; i++){
            let temp = (parseInt(arrA[i])+parseInt(arrB[i])+add)%10
            result.push(temp)
            add = Math.floor((parseInt(arrA[i])+parseInt(arrB[i])+add)/10)
        }
        if(shortLen===longLen){
            result.push(add)
        }else{
            for(let j = shortLen; j < longLen; j++){
                if(j===longLen-1){
                    result.push(parseInt(longArr[j])+add)
                }else{
                    let temp = (parseInt(longArr[j])+add)%10
                    result.push(temp)
                    add = Math.floor((parseInt(longArr[j])+add)/10)
                }
            }
        }
        return parseInt(result.reverse().join(''))
    }
}