
var fs=require('fs');
var Web3=require('web3');
var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    var web3 = new Web3(new Web3.providers.WebsocketProvider("http://127.0.0.1:8345"));
}


var _abiArray=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"string","name":"","type":"string"}],"name":"OrderLog","type":"event"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_itemId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"_from","type":"string"}],"name":"order","outputs":[],"stateMutability":"payable","type":"function"}];
async function doIt() {
    var _order = new web3.eth.Contract(_abiArray, '0xB159a9389763299B0920BF44e315E36e3f695Cf1');
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    var event = _order.events.OrderLog({//7
            //filter: {_from: accounts[0], _value: 20}, //주소를 넣음 6
            fromBlock: 'latest', toBlock: 'pending'
        }, function (error, result) { //7,5
        if (!error) { 
            log = JSON.stringify(result.returnValues);
            console.log("Event fired: " + log);
            {//3
                fs.appendFile("src/OrderEvent.txt", log, "utf-8", function(e){//2
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
    my = await _order.methods.order(1111, 3,"20 2-gil Hongji-dong Jongro-gu Seoul") //여기서 불러주는 중, 리믹스에서 쓴 것처럼 쓴다
        .send({from: accounts[0], gas: 100000})
    console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));
    
    my = await _order.methods.order(1111, 5,"20 2-gil Hongji-dong Jongro-gu Seoul") //여기서 불러주는 중, 리믹스에서 쓴 것처럼 쓴다
        .send({from: accounts[0], gas: 100000})
    console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));
    
    my = await _order.methods.order(1111, 20,"20 2-gil Hongji-dong Jongro-gu Seoul") //여기서 불러주는 중, 리믹스에서 쓴 것처럼 쓴다
        .send({from: accounts[0], gas: 100000})
    console.log("---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues));
    
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
    process.exit(1);   
    }

doIt()
