
var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));
var _abiArray = [{"inputs":[{"internalType":"string","name":"_hello","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"string","name":"s","type":"string"}],"name":"PrintLog","type":"event"},{"inputs":[{"internalType":"string","name":"_str","type":"string"}],"name":"compareTo","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sayHello","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"setHello","outputs":[],"stateMutability":"nonpayable","type":"function"}];
var hello = new web3.eth.Contract(_abiArray, "0x6cBFfbe9c1c87BEc797Cd7b1067af189b628FFBC");
var event = hello.events.PrintLog(function (error, result) {
    if (!error) { //이벤트가 있으면 발생시킴
        console.log("Event fired: " + JSON.stringify(result) + "\n---> " + JSON.stringify(result.returnValues));
    }
});

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    hello.methods.sayHello().call().then(console.log);  //null
    
    await hello.methods.setHello().send({from: accounts[0]});
    hello.methods.sayHello().call().then(console.log);
    hello.methods.compareTo("Hello").call().then(console.log);
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
    
}
doIt()
