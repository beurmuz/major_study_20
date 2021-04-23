var Web3=require('web3');
var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8445"));
}
var _abiArray=[{"constant":false,"inputs":[{"name":"_greeting","type":"bytes32"}],"name":"setGreeting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"greet","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var _bin="608060405234801561001057600080fd5b507f48656c6c6f20576f726c642100000000000000000000000000000000000000006000816000191690555060ef8061004a6000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806350513b4f14604e578063cfae321714607c575b600080fd5b348015605957600080fd5b50607a600480360381019080803560001916906020019092919050505060ac565b005b348015608757600080fd5b50608e60ba565b60405180826000191660001916815260200191505060405180910390f35b806000816000191690555050565b600080549050905600a165627a7a7230582099321ee02d8f702f0486c8f57693162d0381ac861bffa9ea638b88d6011cb3960029";
var _contract = new web3.eth.Contract(_abiArray);
//unlock the account with a password provided
//web3.personal.unlockAccount(web3.eth.accounts[0],'password');
_contract
    .deploy({data:"0x"+_bin})
    .send({from: "0xc920e93d60afac15d7e2ca2c3fccf5307b3e227e", gas: 364124, gasPrice: '1000000000'})
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address
    });
