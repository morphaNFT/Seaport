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