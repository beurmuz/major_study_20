
//ganache
var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));
var _abiArray=[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"_receiver","type":"address"}],"name":"forwardTo","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"widthdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
var bank = new web3.eth.Contract(_abiArray,"0x86d8C0d12d9Db7EF78A4521290F473296cAD96cC");
bank.methods.deposit(11111).send({from:"0x9d564F3922dC833C551CaeB7CEA6D5368580aC1d",gas:800000,value:11111});
bank.methods.deposit(222).send({from:"0x9d564F3922dC833C551CaeB7CEA6D5368580aC1d",gas:800000,value:222});
bank.methods.getBalance().call().then(function(value) {console.log(value);});
bank.methods.forwardTo("0xD02A0b00faF6D2e82081397d1e97bC7dc59fCDb5").send({from:"0x9d564F3922dC833C551CaeB7CEA6D5368580aC1d",gas:100000});
bank.methods.getBalance().call().then(function(value) {console.log(value);});
bank.methods.widthdrawAll().send({from:"0x9d564F3922dC833C551CaeB7CEA6D5368580aC1d",gas:800000});
bank.methods.getBalance().call().then(function(value) {console.log(value);});
