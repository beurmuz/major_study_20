var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));       //ok
var fs=require('fs');
var _str = fs.readFileSync("src/Rsp.json");
var _json = JSON.parse(_str)
//var _abiArray = JSON.parse(_json.contracts.sHello2.abi);
var _abiArray = JSON.parse(_json.contracts["src/Rsp.sol:Rsp"].abi);

async function doIt() {//arr 대신 _rspGame
    var _rspGame = new web3.eth.Contract(_abiArray, "0x90F0f86856c31b1F995A9ec9D39aF4e95a4684E8");
    const accounts = await web3.eth.getAccounts();
    
    await _rspGame.methods.distributeBetAmount(accounts[0]).send({from: accounts[0], gas:135482});
    console.log("<The Last Balance>");
    const AafterBal = await _rspGame.methods.getA().call();
    const ContractafterBal = await _rspGame.methods.getB(accounts[1]).call(); 
    const BafterBal = await _rspGame.methods.getContract().call();
    console.log("A : " + AafterBal);
    console.log("Contract : " + ContractafterBal);
    console.log("B : " + BafterBal);
}

doIt()
