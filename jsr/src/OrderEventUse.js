
var Web3=require('web3');
var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    var web3 = new Web3(new Web3.providers.WebsocketProvider("http://127.0.0.1:8345"));
}
var _abiArray = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"","type":"string"}],"name":"OrderLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes2","name":"_itemId","type":"bytes2"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"OrderLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"OrderLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"bytes2","name":"_itemId","type":"bytes2"},{"indexed":true,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"OrderLog","type":"event"},{"inputs":[{"internalType":"bytes2","name":"_itemId","type":"bytes2"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"order","outputs":[],"stateMutability":"payable","type":"function"}];
//var _abiArray=JSON.parse(_abiStr);

async function doIt() {
    var _order = new web3.eth.Contract(_abiArray, '0xDFEaf2894F334cE23C7fb78a77eA6f790dB32aae');
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    var event = _order.events.OrderLog({
            //filter: {_from: accounts[0], _value: [20,50]},
            filter: {_from: accounts[0], _value: 30}, //주소를 넣음 
            fromBlock: 'latest', toBlock: 'pending'
        }, function (error, result) { //callback 함수, error first 문법, result가 object로 출력되므로 JSON.stringify 이용
        if (!error) { //매개변수 없이 불러주기. 
            //console.log("Event fired: " + JSON.stringify(result) + "\n---> " + JSON.stringify(result.returnValues));
            console.log("Event fired: " + JSON.stringify(result.returnValues));
            //process.exit(1); //대기를 끊고 싶을 때 강제종료 시키는 문구
        }
    });
    var value;
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    // this will fire an event
    my = await _order.methods.order("0x1234", 3) //여기서 불러주는 중, 리믹스에서 쓴 것처럼 쓴다
        .send({from: accounts[0], gas: 100000, value:30})
        //.then(function(my) {console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));});
    console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));
    // this will fire another event
    my = await _order.methods.order("0x1234", 4).send({from: accounts[0], gas: 100000, value:40});
    console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));
    // this will NOT fire another event
    my = await _order.methods.order("0x1234", 10).send({from: accounts[0], gas: 100000, value:100});
    console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
    process.exit(1); 
}

doIt()
