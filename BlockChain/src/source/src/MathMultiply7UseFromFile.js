
var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));
var fs=require('fs');
var _str = fs.readFileSync("src/MathMultiply7.json");
var _json=JSON.parse(_str)
var _abiArray=JSON.parse(_json.contracts["src/MathMultiply7.sol:Math"].abi);
var _instance = new web3.eth.Contract(_abiArray, "0xdb3a271D6b9E3C5429C91E2eF1C70FC10aB24b1B");

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    _instance.methods.multiply().call().then(console.log); //multiply함수 불러서 실행결과 보고, 
    _instance.methods.deposit(123).send({from:accounts[0], value:123}); //deposit하고
    _instance.methods.getBalanceOfM7().call().then(console.log); //잔고 확인하고 
    
    await _instance.methods.send11M7().send({from:accounts[0]}); //fallback함수 호출되는지 보고
    _instance.methods.getBalanceOfM7().call().then(console.log); 
    //잔고까지 확인함. 근데 주소 확인하는 건 안넣었어요. 복잡해질거같아서. 혼자 할 수 있을듯요
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
}

doIt()
