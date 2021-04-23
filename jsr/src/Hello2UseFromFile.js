
var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));
var fs=require('fs');
var _str = fs.readFileSync("src/Hello2.json");
var _json=JSON.parse(_str)
//var _abiArray=JSON.parse(_json.contracts.sHello2.abi);
var _abiArray=JSON.parse(_json.contracts['src/Hello2.sol:Hello2'].abi);

var hello = new web3.eth.Contract(_abiArray, "0x5FC347F39E48CdB6033e941f053e422b34355708");
var event = hello.events.PrintLog(function (error, result) {
    if (!error) {
        console.log("Event fired: " + JSON.stringify(result) + "\n---> " + JSON.stringify(result.returnValues));
    }
});

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    hello.methods.sayHello().call().then(console.log);  //null
    await hello.methods.setHello("Hello World!").send({from: accounts[0], value: 1111});
    hello.methods.sayHello().call().then(console.log);
    //hello.methods.getBalance().call(function(err, bal) { console.log("Contract Balance: "+bal) });
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
    //hello.methods.kill().send({from: accounts[0]}) 
    //명시적으로 kill 함수를 불러보자. 처음에 kill() 주석을 해제하지 않고 node를 실행하면 결과가 보이지만, 
    //kill()을 하고 나서 다시 node로 실행해보면 오류가 뜰 것이다.
}

doIt()
