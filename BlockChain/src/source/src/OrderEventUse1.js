
var fs=require('fs');
var Web3=require('web3');
var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    var web3 = new Web3(new Web3.providers.WebsocketProvider("http://127.0.0.1:8345"));
}


var _abiArray=[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"","type":"string"}],"name":"OrderLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes2","name":"_itemId","type":"bytes2"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"OrderLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"OrderLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"bytes2","name":"_itemId","type":"bytes2"},{"indexed":true,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"OrderLog","type":"event"},{"inputs":[{"internalType":"bytes2","name":"_itemId","type":"bytes2"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"order","outputs":[],"stateMutability":"payable","type":"function"}];

async function doIt() {
    var _order = new web3.eth.Contract(_abiArray, '0x7A319C712a37b80212a20375dE4eDDFA8ADAAc43');
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    var event = _order.events.OrderLog({//7
            filter: {_from: accounts[0], _value: 30}, //주소를 넣음 6
            fromBlock: 'latest', toBlock: 'pending'
        }, function (error, result) { //7,5
        if (!error) { 
            log = JSON.stringify(result.returnValues);
            console.log("Event fired: " + log);
            {//3
                fs.appendFile("src/OrderEventList.txt", log, "utf-8", function(e){//2
                if(!e){//1
                    console.log(">> Writing to file");
                }//1
            }//2
        )}//3
        }//4
    });//5
    
    var value;
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    my = await _order.methods.order("0x1234", 3) //여기서 불러주는 중, 리믹스에서 쓴 것처럼 쓴다
        .send({from: accounts[0], gas: 100000, value:30})
    console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
    process.exit(1);   
    }

doIt()
