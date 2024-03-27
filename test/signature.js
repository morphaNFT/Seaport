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
            price: "1000000000000000",
            offerer: "0x8A8ee995FcE4E30Ecf6627a9D06409766d4d1492",
            offer: [
                {
                    itemType: 2,                 // 2: ERC721 3: ERC1155
                    token: "0x8eF5333810401C3A8b930949f41C9712A6995050",                   // NFT 合约地址
                    identifierOrCriteria: 1,     // tokenId
                    startAmount: 1,              // 数量
                    endAmount: 1                 // 数量
                }
            ],
            consideration: [
                {
                    itemType: 0,    // 0: ETH  1: ERC20
                    token: "0x0000000000000000000000000000000000000000",     // 合约地址， ETH为零地址，ERC20是合约地址
                    identifierOrCriteria: 0,                                 // 如果itemType是0或1该属性被忽略，写0即可
                    startAmount: '925000000000000',                          // 卖家实际收到的钱
                    endAmount: '925000000000000',
                    recipient: "0x8A8ee995FcE4E30Ecf6627a9D06409766d4d1492",  // 收款地址
                },
                {
                    itemType: 0,
                    token: "0x0000000000000000000000000000000000000000",
                    identifierOrCriteria: 0,
                    startAmount: '25000000000000',                         // 平台手续费
                    endAmount: '25000000000000',
                    recipient: "0x00EE50f5CD1560aA685432BC91Fc872B274d19a2"     // 平台收款
                },
                {
                    itemType: 0,
                    token: "0x0000000000000000000000000000000000000000",
                    identifierOrCriteria: 0,
                    startAmount: '50000000000000',                         // 版权费
                    endAmount: '50000000000000',
                    recipient: "0x5f7a144D7fa67306c4B6a4B77632eE080e5f02d0"   // 版权费收款地址
                }
            ],
            startTime: "1665557877",         // 挂单开始时间
            endTime: "1668236277",           // 挂单结束时间
            orderType: 0,                    // 0: ERC721 (FULL_OPEN)  1: ERC1155（PARTIAL_OPEN）
            zone: "0x0000000000000000000000000000000000000000",  // 辅助地址 零地址即可
            zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",   // 32 字节的零值
            salt: "",        // 77位随机数字
            counter: 0        // 与offerer的counter相同，初始值0   // 通过seaport合约的getCounter(address offerer)  获取
        }
    },

    getOfferData721Other: function () {
        return {
            price: "10000000000000000",
            offerer: "0x247098dFFc21a8A6A6A62d1461C36B54b1db92Fa",
            offer: [
                {
                    itemType: 2,                 // 0 ETH 1 ERC20 2 ERC721
                    token: "0x01B9A755a825Ee508AA689E39BDa351dD92c98ED",                   // NFT 合约地址
                    identifierOrCriteria: 1,     // tokenId or root merkel root
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
                    recipient: "0x247098dFFc21a8A6A6A62d1461C36B54b1db92Fa",
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
                    recipient: "0x247098dFFc21a8A6A6A62d1461C36B54b1db92Fa"
                }
            ],
            startTime: "1665557877",
            endTime: "1668236277",
            orderType: 0,   // FULL_OPEN
            zone: "0x0000000000000000000000000000000000000000",
            zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
            salt: "",
            counter: 0
        }
    },


    fulfillBasicOrder: function (offerData, salt, signature, conduitKey) {
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
    },

    getOfferData1155: function () {
        return {
            price: "20000000000000000",
            offerer: "0x8A8ee995FcE4E30Ecf6627a9D06409766d4d1492",
            offer: [
                {
                    itemType: "3",                 // 0 ETH 1 ERC20 2 ERC721 3 ERC1155
                    token: "0xcD9AE776C6B0f95A882dA7306319a3BEE3Ef3a8F",                   // NFT 合约地址
                    identifierOrCriteria: 1,     // tokenId or root merkel root
                    startAmount: "10",              // 数量
                    endAmount: "10"                 // 数量
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
            orderType: 1,   // PARTIAL_OPEN
            zone: "0x0000000000000000000000000000000000000000",
            zoneHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
            counter: 0
        }
    },

    fulfillAdvancedOrder: function (offerData, salt, signature, conduitKey) {
        return {
            "advancedOrder": {
                "denominator": "10",
                "extraData": "0x",
                "numerator": "5",
                "parameters": {
                    "conduitKey": conduitKey,
                    "consideration": offerData.consideration,
                    "endTime": offerData.endTime,
                    "offer": offerData.offer,
                    "offerer": offerData.offerer,
                    "orderType": offerData.orderType,
                    "salt": salt,
                    "startTime": offerData.startTime,
                    "totalOriginalConsiderationItems": offerData.consideration.length.toString(),
                    "zone": offerData.zone,
                    "zoneHash": offerData.zoneHash
                },
                "signature": signature
            },
            "criteriaResolvers": [],
            "fulfillerConduitKey": conduitKey,
            "recipient": "0x0000000000000000000000000000000000000000"
        }
    },

    fulfillAvailableAdvancedOrders: function (offerData721, offerData1155, conduitKey) {
        return {
            "advancedOrders": [
                {
                    "denominator": "1",
                    "extraData": "0x",
                    "numerator": "1",
                    "parameters": {
                        "conduitKey": conduitKey,
                        "consideration": offerData721.consideration,
                        "endTime": offerData721.endTime,
                        "offer": offerData721.offer,
                        "offerer": offerData721.offerer,
                        "orderType": offerData721.orderType,
                        "salt": offerData721.salt,
                        "startTime": offerData721.startTime,
                        "totalOriginalConsiderationItems": offerData721.consideration.length.toString(),
                        "zone": offerData721.zone,
                        "zoneHash": offerData721.zoneHash
                    },
                    "signature": offerData721.signature
                },
                {
                    "denominator": "10",
                    "extraData": "0x",
                    "numerator": "2",
                    "parameters": {
                        "conduitKey": conduitKey,
                        "consideration": offerData1155.consideration,
                        "endTime": offerData1155.endTime,
                        "offer": offerData1155.offer,
                        "offerer": offerData1155.offerer,
                        "orderType": offerData1155.orderType,
                        "salt": offerData1155.salt,
                        "startTime": offerData1155.startTime,
                        "totalOriginalConsiderationItems": offerData1155.consideration.length.toString(),
                        "zone": offerData1155.zone,
                        "zoneHash": offerData1155.zoneHash
                    },
                    "signature": offerData1155.signature
                }
            ],
            "criteriaResolvers": [],
            "offerFulfillments": [
                [
                    {
                        "itemIndex": "0",
                        "orderIndex": "0"
                    }
                ],
                [
                    {
                        "itemIndex": "0",
                        "orderIndex": "1"
                    }
                ]
            ],
            "considerationFulfillments": [
                [
                    {
                        "itemIndex": "0",
                        "orderIndex": "0"
                    },
                    {
                        "itemIndex": "2",
                        "orderIndex": "0"
                    },
                    {
                        "itemIndex": "0",
                        "orderIndex": "1"
                    },
                    {
                        "itemIndex": "2",
                        "orderIndex": "1"
                    }
                ],
                [
                    {
                        "itemIndex": "1",
                        "orderIndex": "0"
                    },
                    {
                        "itemIndex": "1",
                        "orderIndex": "1"
                    }
                ]
            ],
            "fulfillerConduitKey": conduitKey,
            "recipient": "0x0000000000000000000000000000000000000000",
            "maximumFulfilled": "2"
        }
    },

    fulfillAvailableOrders: function (offerData721, offerDataOther, conduitKey) {
        return {
            "orders": [
                {
                    "parameters": {
                        "conduitKey": conduitKey,
                        "consideration": offerData721.consideration,
                        "endTime": offerData721.endTime,
                        "offer": offerData721.offer,
                        "offerer": offerData721.offerer,
                        "orderType": offerData721.orderType,
                        "salt": offerData721.salt,
                        "startTime": offerData721.startTime,
                        "totalOriginalConsiderationItems": offerData721.consideration.length.toString(),
                        "zone": offerData721.zone,
                        "zoneHash": offerData721.zoneHash
                    },
                    "signature": offerData721.signature
                },
                {
                    "parameters": {
                        "conduitKey": conduitKey,
                        "consideration": offerDataOther.consideration,
                        "endTime": offerDataOther.endTime,
                        "offer": offerDataOther.offer,
                        "offerer": offerDataOther.offerer,
                        "orderType": offerDataOther.orderType,
                        "salt": offerDataOther.salt,
                        "startTime": offerDataOther.startTime,
                        "totalOriginalConsiderationItems": offerDataOther.consideration.length.toString(),
                        "zone": offerDataOther.zone,
                        "zoneHash": offerDataOther.zoneHash
                    },
                    "signature": offerDataOther.signature
                }
            ],
            "offerFulfillments": [
                [
                    {
                        "itemIndex": "0",
                        "orderIndex": "0"
                    }
                ],
                [
                    {
                        "itemIndex": "0",
                        "orderIndex": "1"
                    }
                ]
            ],
            "considerationFulfillments": [
                //  0x8a8ee995fce4e30ecf6627a9d06409766d4d1492  卖家1
                [
                    {
                        "itemIndex": "0",
                        "orderIndex": "0"
                    },
                    {
                        "itemIndex": "2",
                        "orderIndex": "0"
                    },
                ],
                //  0x00EE50f5CD1560aA685432BC91Fc872B274d19a2  平台费
                [
                    {
                        "itemIndex": "1",
                        "orderIndex": "0"
                    },
                    {
                        "itemIndex": "1",
                        "orderIndex": "1"
                    }
                ],
                // 0x247098dffc21a8a6a6a62d1461c36b54b1db92fa  卖家2
                [
                    {
                        "itemIndex": "0",
                        "orderIndex": "1"
                    },
                    {
                        "itemIndex": "2",
                        "orderIndex": "1"
                    },
                ]
            ],
            "fulfillerConduitKey": conduitKey,
            "maximumFulfilled": "2"
        }
    }

}