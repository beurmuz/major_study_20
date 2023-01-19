var Web3 = require('web3');
var web3 = new Web3('http://127.0.0.1:8345');
var gana="0xd184d44d1f73130233d18a00ca8184a3ee6db56a";
var gana_bal=web3.eth.getBalance(gana).then(console.log); 
console.log('The 1 ether is 227900KRW.');
var eth="227900";
console.log('change the krw is');
console.log(eth*gana_bal)
