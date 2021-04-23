var Web3 = require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
web3.eth.getCoinbase().then(console.log);
