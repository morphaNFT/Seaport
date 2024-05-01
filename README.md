## 准备环境
安装node.js

## 安装依赖
```shell
npm install
```
## 私钥配置
将私钥配置在config.js文件中的privateKey中
```json
{
  "common": {
    "privateKey": "" 
  }
}
```
## 配置区块链地址
在hardhat.config.js配置文件中,将要部署的网络地址写在url这里
```js
networks: {
    morph: {
      url: `https://rpc-holesky.morphl2.io`,
      accounts: [`0x${config.common.privateKey}`]
    }
}
```

## 开始部署
```shell
 npx hardhat run scripts/seaport.js --network morph
```
控制台将输出如下类似信息：其中ConduitController 可保存后续使用，conduitKey，conduitAddress，seaport信息交由前后端使用。

```shell
【ConduitController】: 0x9465E3d83365646656d94a90c55506994aFc9542
【conduitKey 】: 0x8A8ee995FcE4E30Ecf6627a9D06409766d4d1492000000000000000000000000
【conduitAddress】: 0xae9c90A7C9acD1215900A31Ed267b2862Cb87AC8
【seaport】: 0x8eF5333810401C3A8b930949f41C9712A6995050
```