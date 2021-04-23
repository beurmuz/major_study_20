var Web3=require('web3');
var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    var web3 = new Web3(new Web3.providers.WebsocketProvider("http://127.0.0.1:8345"));
}
var _abiArray=[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"bytes32","name":"_id","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Deposit","type":"event"},{"inputs":[{"internalType":"bytes32","name":"_id","type":"bytes32"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"}];
//var _abiArray=JSON.parse(_abiStr);
var _test = new web3.eth.Contract(_abiArray, '0xA051F2C36E16Ec41af3208dE4Db55535cb0E5636');
var event = _test.events.Deposit({fromBlock: 0}, function (error, result) {
    if (!error) {
        //console.log("Event fired: " + JSON.stringify(result) + "\n---> " + JSON.stringify(result.returnValues));
        console.log("Event fired: " + JSON.stringify(result.returnValues));
        //process.exit(1);
    }
});

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    const value = await _test.methods.deposit("0x111")
        .send({from: accounts[0], gas: 364124, gasPrice: '1000000000'})
        //.then(function(value) {console.log("---> MyFunction called " + JSON.stringify(value) +
        //                               '\n---> '+ JSON.stringify(value.events.Deposit.returnValues));});
    console.log("---> MyFunction called " + JSON.stringify(value) +
        '\n---> '+ JSON.stringify(value.events.Deposit.returnValues));
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
}

doIt()
