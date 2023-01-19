// 8과 16을 받는 use파일
var Web3=require('web3');
var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    var web3 = new Web3(new Web3.providers.WebsocketProvider("http://127.0.0.1:8345"));
}
var _abiArray=[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"param1","type":"address"},{"indexed":false,"internalType":"uint256","name":"param2","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"param3","type":"uint256"}],"name":"Print","type":"event"},{"constant":false,"inputs":[{"internalType":"uint256","name":"param4","type":"uint256"}],"name":"multiply","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
//var _abiArray=JSON.parse(_abiStr);
var _test = new web3.eth.Contract(_abiArray, '0x1989D04c0D6D49Ca265bF47a2b69589148fa1553');
var event = _test.events.Print({fromBlock: 0}, function (error, result) {
    if (!error) {
        //console.log("Event fired: " + JSON.stringify(result) + "\n---> " + JSON.stringify(result.returnValues));
        console.log("\nEvent fired: " + JSON.stringify(result.returnValues));
        //process.exit(1);
    }
});

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    console.log("-----------------------------------------------------------------------------------------------");
    const value1 = await _test.methods.multiply(8)
        .send({from: accounts[0], gas: 364124, gasPrice: '1000000000'})
        //.then(function(value) {console.log("---> MyFunction called " + JSON.stringify(value1) +
        //                               '\n---> '+ JSON.stringify(value1.events.Print.returnValues));});
    console.log("---> MyFunction called " + JSON.stringify(value1) +
        '\n\n---> '+ JSON.stringify(value1.events.Print.returnValues));
    console.log("-----------------------------------------------------------------------------------------------");
    const value2 = await _test.methods.multiply(16)
        .send({from: accounts[0], gas: 364124, gasPrice: '1000000000'})
        //.then(function(value) {console.log("---> MyFunction called " + JSON.stringify(value2) +
        //                               '\n---> '+ JSON.stringify(value2.events.Print.returnValues));});
    console.log("---> MyFunction called " + JSON.stringify(value2) +
        '\n\n---> '+ JSON.stringify(value2.events.Print.returnValues));
    
    console.log("-----------------------------------------------------------------------------------------------");
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
}

doIt()
