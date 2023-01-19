
var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8445"));
var fs=require('fs');
var _str = fs.readFileSync("src/CusOrder.json"); //파일 읽어오기
var _json=JSON.parse(_str) //string을 JSON형식으로 바꾸어줌
var _abiArrayA=JSON.parse(_json.contracts["src/CusOrder.sol:Customer"].abi);
var _abiArrayB=JSON.parse(_json.contracts["src/CusOrder.sol:Order"].abi);
//console.log(_abiArray);
//var _bin=_json.contracts.sHello2.bin;
var _binA="0x"+_json.contracts["src/CusOrder.sol:Customer"].bin;
var _binB="0x"+_json.contracts["src/CusOrder.sol:Order"].bin;
//console.log(_bin);
//unlock the account with a password provided
//web3.personal.unlockAccount(web3.eth.accounts[0],'password');
async function deploy() {
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying the contract from " + accounts[0]);
    
    new web3.eth.Contract(_abiArrayA).deploy({data: _binA}).estimateGas(function(err, gas) {
        if(!err) console.log(">> A gas: "+ gas);});
    new web3.eth.Contract(_abiArrayB).deploy({data: _binB}).estimateGas(function(err, gas) {
        if(!err) console.log(">> B gas: "+ gas);});
    
    //Customer
    var deployedA = await new web3.eth.Contract(_abiArrayA)
        .deploy({data: _binA})
        .send({from: accounts[0], gas: 1064307}, function(err, transactionHash) {
                if(!err) console.log("hash: " + transactionHash); 
        })
        //.then(function(newContractInstance){
        //    console.log(newContractInstance.options.address)
        //});
    console.log("---> The Customer contract deployed to: " + deployedA.options.address)
    console.log("");
    //Order
    var deployedB = await new web3.eth.Contract(_abiArrayB)
        .deploy({data: _binB})
        .send({from: accounts[0], gas: 2866028}, function(err, transactionHash) {
                if(!err) console.log("hash: " + transactionHash); 
        })
        //.then(function(newContractInstance){
        //    console.log(newContractInstance.options.address)
        //});
    console.log("---> The Order contract deployed to: " + deployedB.options.address)
}
deploy()
