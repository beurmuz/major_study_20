var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));       //ok
var fs=require('fs');
var _str = fs.readFileSync("src/ArrayTest2.json");
var _json = JSON.parse(_str)
//var _abiArray = JSON.parse(_json.contracts.sHello2.abi);
var _abiArray = JSON.parse(_json.contracts["src/ArrayTest2.sol:ArrayTest2"].abi);

async function doIt() {
    var arr = new web3.eth.Contract(_abiArray, "0x86235ce7128b24f010EbbD0c79BFB47B82DD1774");
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    
    arr.methods.setCities23().estimateGas(function(err, gas) {
        if(!err) console.log(">> gas: "+ gas);
    });

    //await arr.methods.setCities23().send({from: accounts[0]});   //out of gas error
    await arr.methods.setCities23().send({from: accounts[0], gas:135482});
    arr.methods.getCities2().call().then(console.log);

    arr.methods.setMathMarks().estimateGas(function(err, gas) {
        if(!err) console.log(">> gas: "+ gas);
    });

    await arr.methods.setMathMarks().send({from: accounts[0], gas: 122001});
    //ERROR invalid opcode arr.methods.getMathAbove70().call().then(console.log);
    arr.methods.getMarksArr().call().then(console.log);

    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
    
}

doIt()
