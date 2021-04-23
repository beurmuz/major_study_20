var Web3 = require('web3');
var web3 = new Web3('http://127.0.0.1:8345');
console.log('Balance before of Ganache, Geth coinbase');
var gana_before="0xbf6ec8821f59ba1f2c3d2f2a4d197410404bbec9";
gana_bal=web3.eth.getBalance(gana_before).then(console.log);
var geth_before="0xc920e93d60afac15d7e2ca2c3fccf5307b3e227e";
web3.eth.getBalance(geth_before).then(console.log);
