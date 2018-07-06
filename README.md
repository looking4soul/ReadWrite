# Read Write DApp 

本项目是一个基于以太坊智能合约简单DApp。

项目包含一个智能合约：有一个字段用以保存一个字符串，有一个函数可以设置这个字符串，另外一个函数可以读这个字符串。

包含前端页面：同时包含web页面，包含一个区域显示这个字符串，一个输入框和按钮修改这个字符串。

开发完成后，将智能合约部署到测试网络，使这个DApp在测试网络可用。

# 部署说明

## 将contracts/ReadWrite.sol部署到Ropsten测试网络

参见下文Remix部分

部署完成后，用Remix调用智能合约的函数，以自测部署是否成功。

部署成功后，用智能合约地址替换掉front/src/index.js中的第8行的地址。

## 安装浏览器扩展MetaMask, 并创建Ropsten测试网络账户

参见下文MetaMask部分

账户创建后，用账户地址替换掉front/src/index.js中的第60行的地址。

## 通过Ropsten的faucet网站免费获取测试网络Ether

参见下文faucet部分

## 安装

`npm install`

## js打包

`npm run build`

## 运行服务器

`npm run dev`

最后，访问：`http://localhost:3000`

DApp成功运行。

# 说明

## Remix

Remix是以太坊智能合约开发官方IDE

地址：https://remix.ethereum.org/

功能：编辑、编译、调试、静态分析、运行、部署智能合约

如需了解如何使用，参考Remix文档：https://remix.readthedocs.io/

## MetaMask

MetaMask将以太坊的js库web3.js注入到浏览器中，并提供账户管理功能。

官网地址：https://metamask.io/

## Faucet

从Ropsten Test Net测试网络的faucet网站给账户充值。

faucet网站地址：

https://faucet.metamask.io/ 

or

http://faucet.ropsten.be:3001/

## Solidity

智能合约开发语言，编写智能合约的核心知识

文档地址：https://solidity.readthedocs.io/

## web3.js

调用智能合约的js库

1.0文档：http://web3js.readthedocs.io/en/1.0/index.html

0.2x.x文档：https://github.com/ethereum/wiki/wiki/JavaScript-API

github：https://github.com/ethereum/web3.js/

