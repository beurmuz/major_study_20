var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8445"));
var fs=require('fs');
var _str = fs.readFileSync("src/Rspg.json");
var _json = JSON.parse(_str)
//var _abiArray = JSON.parse(_json.contracts.Rspg.abi);
var _abiArray = JSON.parse(_json.contracts["src/Rspg.sol:Rspg"].abi);
//var _bin = _json.contracts.sHello2.bin;
var _bin="0x" + _json.contracts["src/Rspg.sol:Rspg"].bin;

//unlock the account with a password provided
//web3.personal.unlockAccount(web3.eth.accounts[0],'201810803');
async function deploy() {
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying the contract from " + accounts[0]);

    new web3.eth.Contract(_abiArray).deploy({data: _bin}).estimateGas(function(err, gas) {
        if(!err) console.log(">> gas: "+ gas); //gas를 산정하는 함수를 위에 넣어놓음 
    });

    var deployed = await new web3.eth.Contract(_abiArray)
        .deploy({data: _bin})
        .send({from: accounts[0], gas: 791305}, function(err, transactionHash) {
                if(!err) console.log("hash: " + transactionHash); 
        })
        //.then(function(newContractInstance){
        //    console.log(newContractInstance.options.address)
        //});
    console.log("---> The contract deployed to: " + deployed.options.address)
}

deploy()
