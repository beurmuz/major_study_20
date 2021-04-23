var Web3 = require('web3');
var web3 = new Web3('http://127.0.0.1:8345');
var ganaacc="0xbf6ec8821f59ba1f2c3d2f2a4d197410404bbec9";
var gethacc="0xc920e93d60afac15d7e2ca2c3fccf5307b3e227e";
web3.eth.sendTransaction({from:ganaacc, to:gethacc, value:1});
var gana_after = web3.eth.getBalance(ganaacc).then(console.log); 
var geth_after = web3.eth.getBalance(gethacc).then(console.log);
console.log('After remittance of Ganache, geth ')
gana_after
geth_after
