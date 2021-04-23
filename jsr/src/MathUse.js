var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8446"));
var shelloContract = new web3.eth.Contract([{"constant":true,"inputs":[{"name":"input","type":"uint256"}],"name":"powerOf2","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"}],
                                      "0x6cd754b863dEB372E4205dDFCeAfCAF154f1f090");
shelloContract.methods.powerOf2(8).call().then(function(str) {console.log(str);});
shelloContract.methods.powerOf2(32).call().then(function(str) {console.log(str);});
