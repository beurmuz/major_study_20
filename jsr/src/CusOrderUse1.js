var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));       //ok
var fs=require('fs');
var _str = fs.readFileSync("src/CusOrder.json");
var _json = JSON.parse(_str);
var _abiArrayA=JSON.parse(_json.contracts["src/CusOrder.sol:Customer"].abi);
var _abiArrayB=JSON.parse(_json.contracts["src/CusOrder.sol:Order"].abi);
var _binA="0x"+_json.contracts["src/CusOrder.sol:Customer"].bin;
var _binB="0x"+_json.contracts["src/CusOrder.sol:Order"].bin;

async function doIt() {//arr 대신 _rspGame
    var customer = new web3.eth.Contract(_abiArrayA, "0xDf6161e696234ae236808032C071B79f67537E4e");
    var order = new web3.eth.Contract(_abiArrayB, "0x605f0347e74c622803cb5629B844563c6355886F");
    const accounts = await web3.eth.getAccounts();
    const bal1 = await web3.eth.getBalance(accounts[0]);
    const bal2 = await web3.eth.getBalance(accounts[1]);
    const bal3 = await web3.eth.getBalance(accounts[2]);
    console.log("<Q1-1. Print the accounts and balance>"); //잔고 출력
    console.log("Address 1 : "+accounts[0]);
    console.log("Address 1 balance : "+bal1);
    console.log("Address 2 : "+accounts[1]);
    console.log("Address 2 balance : "+bal2);
    console.log("Address 3 : "+accounts[2]);
    console.log("Address 3 balance : "+bal3);
    console.log("BlockNumber : "+web3.eth.blockNumber);
    console.log(" ");
    
    console.log("<Q1-2 & 3. print the Order contract, Enter 3 customer information>"); //2번에서 gas가 자꾸 뒤에 나와서 하나로 묶음
    new web3.eth.Contract(_abiArrayB).deploy({data: _binB}).estimateGas(function(err,gas){console.log("Order contract gas is "+gas);});
  
    //console.log("<Q1-3. Enter 3 customer information>");
    await order.methods.importCustomer(111, "kim", "010-2017-1111", "111 hongji-dong jongro-gu seoul",accounts[0]).send({from: accounts[0], gas:315615});
    await order.methods.importCustomer(112, "lee", "010-2017-1112", "112 hongji-dong jongro-gu seoul",accounts[1]).send({from: accounts[0], gas:315615});
    await order.methods.importCustomer(113, "lim", "010-2017-1113", "113 hongji-dong jongro-gu seoul",accounts[2]).send({from: accounts[0], gas:315615});         
    console.log(" ");                
}

doIt()
