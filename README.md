## Prepare the environment
install  node.js

## Install dependencies
```shell
npm install
```
## Private key configuration
Configure the private key in the privateKey of the config. js file
```json
{
  "common": {
    "privateKey": "" 
  }
}
```
## Configure blockchain address
In the hardhat.comnfig.js configuration file, write the network address to be deployed here in the URL
Replace the following URL with the node address to be deployed
for example:
```js
networks: {
    morph: {
      url: `https://rpc-quicknode-holesky.morphl2.io`,
      accounts: [`0x${config.common.privateKey}`]
    }
}
```

## Start deployment
```shell
 npx hardhat run scripts/seaport.js --network morph
```
The console will output similar information as follows: ConduitController can be saved for future use, 
and ConduitKey, ConduitAddress, and Seaport information will be handed over to the front-end and back-end for use。
for example:
```shell
【ConduitController】: 0x9465E3d83365646656d94a90c55506994aFc9542
【conduitKey 】: 0x8A8ee995FcE4E30Ecf6627a9D06409766d4d1492000000000000000000000000
【conduitAddress】: 0xae9c90A7C9acD1215900A31Ed267b2862Cb87AC8
【seaport】: 0x8eF5333810401C3A8b930949f41C9712A6995050
```