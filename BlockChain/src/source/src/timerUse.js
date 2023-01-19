var Web3=require('web3');
var my = require('./Timer');  //cotaining abi,bin
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));
//abi from Timer.js
var _abiArray=JSON.parse(my._compiled.contracts['src/Timer.sol:Timer'].abi);   //JSON parsing needed!!
console.log("- ABI: "+my._compiled.contracts['src/Timer.sol:Timer'].abi);
var timer = new web3.eth.Contract(_abiArray,"0xB3765f966ACCfDca71E88D4074106ABd0A28ba11");
timer.methods.getNow().call().then(function(value) {console.log(value);});
timer.methods.start().send({from:"0x8779b1c2bfb317618912174516fe9f65b209b952",gas:100000});
timer.methods.timePassed().call().then(function(value) {console.log(value);});
