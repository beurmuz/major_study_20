var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));
var fs=require('fs');
var _str = fs.readFileSync("src/C2.json");
var _json = JSON.parse(_str)
//var _abiArray = JSON.parse(_json.contracts.sHello2.abi);
var _abiArray = JSON.parse(_json.contracts["src/C2.sol:C2"].abi);

var c2 = new web3.eth.Contract(_abiArray, "0xb5b6b591f8B4E7A4C52CFe7fa9a7e790b9bbe97E");
async function doIt() {
    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts[0]);
    const balanceBefore = await web3.eth.getBalance(accounts[0]);
    console.log("Balance before: " + balanceBefore);
    console.log("--- new C1 ---");
    await c2.methods.getC1Address().call(function(err, c1addr) {
        if(!err) console.log("c1 address by 'new': "+c1addr); //주소 출력 
    });
    await c2.methods.get7().call().then(console.log);
    console.log("--- set the above deployed address of C1 ---"); // 아래 주소는 위의 C1 디폴로이후 얻은 주소를 넣는 것 
    await c2.methods.setC1("0xA0CD2baDdFbF84Fa6FDa41180053451adD2058B7").send({from:accounts[0], gas:50000});
    await c2.methods.getC1Address().call(function(err, c1addr) {
        if(!err) console.log("c1 address by 'setC1()': "+c1addr); //바꾼 주소 출력
    });
    c2.methods.get7().call().then(console.log);
    await c2.methods.set(222).send({from: accounts[0],gas:50000});
    c2.methods.get().call().then(console.log);
    const balanceAfter = await web3.eth.getBalance(accounts[0]);
    console.log("Balance after: " + balanceAfter);
    console.log("Balance diff: " + (balanceBefore - balanceAfter));
    //hello.methods.kill().send({from: accounts[0]})
}

doIt()
