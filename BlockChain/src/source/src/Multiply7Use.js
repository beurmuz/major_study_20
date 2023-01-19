var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8445"));
var abi =[{"constant":true,"inputs":[{"name":"input","type":"uint256"}],"name":"multiply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"}];
var addr = "0xF5cB44f22f4F0e7200197b6Ef03Fd3b25400d781";
var counter = new web3.eth.Contract(abi,addr);
counter.methods.multiply(8).call().then(function(str) {console.log(str);});
