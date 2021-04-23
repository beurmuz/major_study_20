var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));       //ok
var fs=require('fs');
var _str = fs.readFileSync("src/Rsp.json");
var _json = JSON.parse(_str)
//var _abiArray = JSON.parse(_json.contracts.sHello2.abi);
var _abiArray = JSON.parse(_json.contracts["src/Rsp.sol:Rsp"].abi);

async function doIt() {//arr 대신 _rspGame
    var _rspGame = new web3.eth.Contract(_abiArray, "0x83Ca6fB049621290ACe825472054FF00eB017998");
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
    const A = await _rspGame.methods.getA().call();           
    const B = await _rspGame.methods.getB(accounts[1]).call(); 
    const C = await _rspGame.methods.getContract().call();
    console.log("<The Balance Before The Game>"); //A,B,컨트랙 게임 전 잔고 출력 
    console.log("A : " + A);
    //console.log("Contract : " + C);
    console.log("B : " + B);
    
    console.log("play----------------");
    await _rspGame.methods.play().send({from: accounts[0], gas:135482}); //승부내기
    console.log("\n");
    console.log("<The Match Result>");
    const Mresult = await _rspGame.methods.getMatchResult().call();
    console.log("result is... " + Mresult); //이긴사람 출력  
    const what = await _rspGame.methods.getwhatresult().call();   // 
    console.log("whatresult is "+what); //                  
    console.log("send the money-------"); 
    await _rspGame.methods.distributeBetAmount(accounts[1]).send({from: accounts[0], gas:135482});
    console.log("\n");
                       
    console.log("<The Last Balance>");
    const AafterBal = await _rspGame.methods.getA().call();
    const ContractafterBal = await _rspGame.methods.getB(accounts[1]).call(); 
    const BafterBal = await _rspGame.methods.getContract().call();
    console.log("A : " + AafterBal);
    console.log("Contract : " + ContractafterBal);
    console.log("B : " + BafterBal);
}

doIt()
