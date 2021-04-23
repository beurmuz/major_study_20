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
    console.log("<The Init Balance>"); //A,B,컨트랙 초기잔고 출력 
    const Ainit = await _rspGame.methods.getA().call();           
    const Binit = await _rspGame.methods.getB(accounts[1]).call(); 
    const Cinit = await _rspGame.methods.getContract().call();
    console.log("A : " + Ainit);
    console.log("Contract : " + Cinit);
    console.log("B : " + Binit);
    console.log("setA, setB---------");
    console.log("\n");
    await _rspGame.methods.setA("1000").send({from: accounts[0], gas:135482,value:1000}); //A 가위바위보
    await _rspGame.methods.setB(accounts[1],"1000","1").send({from: accounts[0], gas:135482,value:1000}); //B 가위바위보
}

doIt()
