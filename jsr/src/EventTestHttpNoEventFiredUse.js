// 이벤트가 출력되지 않는 코드(HttpProvider때문)

var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345")); 
//HttpProvider를 하게 되면 event가 fire되지 않음. 이는 안되는 걸 보여주기 위함
var _abiArray=[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"my","type":"string"}],"name":"MyLog","type":"event"},{"inputs":[],"name":"myFunction","outputs":[],"stateMutability":"nonpayable","type":"function"}];
var _test = new web3.eth.Contract(_abiArray, '0xe49D9895997E895D897783Bc4661f027CA6A1199');
var event = _test.events.MyLog({fromBlock: 0}, function (error, result) {
    //callback함수는 error first 구문으로 작성해준다. result는 MyLog를 실행하게되면 나오는 JSON결과가 result로 출력됨. 
    if (!error) { //이벤트명, 이는 가나슈이니 fromblock이 0부터임.
        console.log("Event fired: " + JSON.stringify(result) + "\n---> " + JSON.stringify(result.returnValues));
    } //JSON.stringify(result.내용을 출력해서 보게 됨) 뒤에있는 result만 출력해서 봐도 됨. 
});

async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    const value = await _test.methods.myFunction() 
    //앞서 만든 인스턴스 이름의 methods.함수이름 적고, 이 함수를 await(비동기 방식으로 실행), 결과를 value를 받음.
        .send({from: accounts[0], gas: 364124, gasPrice: '1000000000'})
        //.then(function(value) {console.log("---> myFunction called "+JSON.stringify(value)+
        //                               '\n---> '+ JSON.stringify(value.events.MyLog.returnValues));});
    console.log("---> myFunction called "+JSON.stringify(value)+ //위의 const value를 받음
        '\n---> '+ JSON.stringify(value.events.MyLog.returnValues)); //하나의 field를.. 
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
} //잔고 처리 전 후 빼기 등
doIt()
