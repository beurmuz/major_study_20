var Web3 = require('web3');
var web3 = new Web3('http://127.0.0.1:8345');
web3.eth.getCoinbase().then(console.log);
//web3.eth.getChainId().then(console.log);
web3.eth.getAccounts(console.log);
web3.eth.getCoinbase().then(console.log);
web3.eth.getBlockNumber().then(console.log);
web3.eth.getBalance('0x84293ED1B46DbF3BB932358996d12b7D9f8acbc9').then(console.log);
web3.eth.getNodeInfo().then(console.log);
