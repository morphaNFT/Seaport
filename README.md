## Sepolia

| 合约  | 地址  | 
|-----|-----|
| ConduitController | 0x4d6c551fF60d09898d392aCef52b55834fb4a056 |
| seaport | 0x75ddBD443EaA8150f75411896bE1e3C834935Ac7 |
| conduitKey | 0x8A8ee995FcE4E30Ecf6627a9D06409766d4d1492000000000000000000000000 |
| initialOwner | 0x8A8ee995FcE4E30Ecf6627a9D06409766d4d1492 |
| conduitAddress | 0xBd08A39F9548A71953Abab119c0E39259c48911e |


## Morph

| 合约  | 地址  | 
|-----|-----|
| ConduitController | 0x9465E3d83365646656d94a90c55506994aFc9542 |
| seaport | 0x8eF5333810401C3A8b930949f41C9712A6995050 |
| conduitKey | 0x8A8ee995FcE4E30Ecf6627a9D06409766d4d1492000000000000000000000000 |
| initialOwner | 0x8A8ee995FcE4E30Ecf6627a9D06409766d4d1492 |
| conduitAddress | 0xae9c90A7C9acD1215900A31Ed267b2862Cb87AC8 |





## 部署步骤
```shell
 npx hardhat run scripts/seaport.js --network sepolia
```

## 测试
```shell
npx hardhat test test/fulfillBasicOrder.js  --network sepolia
```