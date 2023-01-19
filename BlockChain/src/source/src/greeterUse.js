var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8445"));
var _abiArray=[{"constant":false,"inputs":[{"name":"_greeting","type":"bytes32"}],"name":"setGreeting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"greet","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var greeter = new web3.eth.Contract(_abiArray,"0x7d842efEf5077092365670b496d11F7B2d0Cd358");
greeter.methods.setGreeting(web3.utils.fromAscii("Hello World!")).send({from:"0xc920e93d60afac15d7e2ca2c3fccf5307b3e227e",gas:100000});
var sent=web3.utils.fromAscii("Hello!");
greeter.methods.setGreeting(sent);
greeter.methods.greet().call().then(function(value) {console.log(web3.utils.toAscii(value));});
