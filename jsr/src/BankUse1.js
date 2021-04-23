
//ganache
var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));
var _abiArray=[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"_receiver","type":"address"}],"name":"forwardTo","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"widthdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
var bank = new web3.eth.Contract(_abiArray,"0x5Eacb13634a7EF094B0BFF09a909552c056114Da");
bank.methods.deposit(11111).send({from:"0xBca0E776B883AC567E586f34e150016cB892a29E",gas:800000,value:11111});
bank.methods.deposit(222).send({from:"0xBca0E776B883AC567E586f34e150016cB892a29E",gas:800000,value:222});
bank.methods.getBalance().call().then(function(value) {console.log(value);});
