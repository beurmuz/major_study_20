
var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));
var fs=require('fs');
var _str = fs.readFileSync("src/FallbackTest.json");
var _json=JSON.parse(_str)
var _abiArray=JSON.parse(_json.contracts["src/FallbackTest.sol:FallbackTest"].abi);
var _instance = new web3.eth.Contract(_abiArray, "0xA52c12CEf48428Bd34B4949C4bd2cd1cC3ed872b");
var event = _instance.events.PrintLog(function (error, result) {
    if (!error) {
        console.log("Event fired: " + JSON.stringify(result) + "\n---> " + JSON.stringify(result.returnValues));
    } //이벤트 발생시키기
});

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    _instance.methods.callA().call().then(console.log);  //null
    //call without calling any method //바로 아래에서 callB를 호출하고 있음. 이로인해 오류가 날 것. 
    //await _instance.methods.callB().send({from:accounts[0], to: 0x08c6FB3fFDfdf5d46db22A7e9e8Ac8DdC930bbC9});
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
}

doIt()
