
var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));
var fs=require('fs'); //파일시스템으로 읽는다. 
var _str = fs.readFileSync("src/MathMultiply7.json");
var _json=JSON.parse(_str)
var _abiArray=JSON.parse(_json.contracts["src/MathMultiply7.sol:Math"].abi);
//console.log(_abiArray);
//var _bin=_json.contracts.sHello2.bin;
var _bin="0x"+_json.contracts["src/MathMultiply7.sol:Math"].bin;
//console.log(_bin);
//unlock the account with a password provided
//web3.personal.unlockAccount(web3.eth.accounts[0],'password');

async function deploy() {
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying the contract from " + accounts[0]);
    var deployed = await new web3.eth.Contract(_abiArray) //await로 컨트랙이 생성될 때 해시코드랑 주소를 받음
        .deploy({data: _bin})
        .send({from: accounts[0], gas: 1000000}, function(err, transactionHash) {
                if(!err) console.log("hash: " + transactionHash); 
        })
        //.then(function(newContractInstance){
        //    console.log(newContractInstance.options.address)
        //});
    console.log("---> The contract deployed to: " + deployed.options.address)
}
deploy()
