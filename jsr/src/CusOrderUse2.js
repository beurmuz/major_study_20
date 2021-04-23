var Web3=require('web3');
var web3=new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));       //ok
var fs=require('fs');
var _str = fs.readFileSync("src/CusOrder.json");
var _json = JSON.parse(_str);
var _abiArrayA=JSON.parse(_json.contracts["src/CusOrder.sol:Customer"].abi);
var _abiArrayB=JSON.parse(_json.contracts["src/CusOrder.sol:Order"].abi);
var _binA="0x"+_json.contracts["src/CusOrder.sol:Customer"].bin;
var _binB="0x"+_json.contracts["src/CusOrder.sol:Order"].bin;

async function doIt() {//arr 대신 _rspGame
    var customer = new web3.eth.Contract(_abiArrayA, "0x47b7A93068eAf3C11EAe37Baf5dB355E813b8Ba3");
    var order = new web3.eth.Contract(_abiArrayB, "0x4CEd444A57a8B1e7bc7c13A21E45b85E51AB9122");
    const accounts = await web3.eth.getAccounts();
    const bal1 = await web3.eth.getBalance(accounts[0]);
    const bal2 = await web3.eth.getBalance(accounts[1]);
    const bal3 = await web3.eth.getBalance(accounts[2]);
    console.log("<Q1-1. Print the accounts and balance>"); //잔고 출력
    console.log("Address 1 : "+accounts[0]);
    console.log("Address 1 balance : "+bal1);
    console.log("Address 2 : "+accounts[1]);
    console.log("Address 2 balance : "+bal2);
    console.log("Address 3 : "+accounts[2]);
    console.log("Address 3 balance : "+bal3);
    console.log("BlockNumber : "+web3.eth.blockNumber);
    console.log(" ");
    
    console.log("<Q1-2 & 3. print the Order contract, Enter 3 customer information>"); //2번에서 gas가 자꾸 뒤에 나와서 하나로 묶음
    new web3.eth.Contract(_abiArrayB).deploy({data: _binB}).estimateGas(function(err,gas){console.log("Order contract gas is "+gas);});
  
    //console.log("<Q1-3. Enter 3 customer information>");
    /*await order.methods.importCustomer(111, "kim", "010-2017-1111", "111 hongji-dong jongro-gu seoul",accounts[0]).send({from: accounts[0], gas:320137});
    await order.methods.importCustomer(112, "lee", "010-2017-1112", "112 hongji-dong jongro-gu seoul",accounts[1]).send({from: accounts[0], gas:320137});
    await order.methods.importCustomer(113, "lim", "010-2017-1113", "113 hongji-dong jongro-gu seoul",accounts[2]).send({from: accounts[0], gas:320137}); */
    await customer.methods.setcustomer(111, "kim", "010-2017-1111", "111 hongji-dong jongro-gu seoul",accounts[0]).send({from: accounts[0], gas:1426108});
    await customer.methods.mapinfo(accounts[0]).call();
    await customer.methods.setcustomer(112, "lee", "010-2017-1112", "112 hongji-dong jongro-gu seoul",accounts[1]).send({from: accounts[0], gas:1426108});
    await customer.methods.mapinfo(accounts[1]).call();
    await customer.methods.setcustomer(113, "lim", "010-2017-1113", "113 hongji-dong jongro-gu seoul",accounts[2]).send({from: accounts[0], gas:1426108});      
    await customer.methods.mapinfo(accounts[2]).call();         
    console.log("--Complete Input--");
    console.log(" ");
                       
    console.log("<Q1-4. All customer's locations>");
    const loc1 = await customer.methods.whereLocation(accounts[0]).call({from: accounts[0], gas : 50000});
    const loc2 = await customer.methods.whereLocation(accounts[1]).call({from: accounts[1], gas : 50000});
    const loc3 = await customer.methods.whereLocation(accounts[2]).call({from: accounts[2], gas : 50000});
    console.log("customrer's locations  addr : " + loc1);
    console.log("customrer's locations  addr : " + loc2);
    console.log("customrer's locations  addr : " + loc3);          
    console.log(" ");
                 
                       
    console.log("<Q1-5. set Order, deposit, give the mileage>");
    await order.methods.setOrder(555, "T-Shirt", 2, 1115, accounts[0]);
    await order.methods.setOrder(556, "T-Shirt", 3, 1116, accounts[1]);
    await order.methods.setOrder(557, "T-Shirt", 4, 1117, accounts[2]);
    await order.methods.deposit(1115, accounts[0]).send({from: accounts[0], gas:10000, value:1115});
    await order.methods.deposit(1116, accounts[1]).send({from: accounts[0], gas:10000, value:1116});
    await order.methods.deposit(1117, accounts[2]).send({from: accounts[0], gas:10000, value:1117});
    console.log(" ");
                       
    console.log("<Q1-6. Order count, order amount total, and balance>");
    console.log(" ");
                       
    console.log("<Q1-7. All customer's Order List>");
    await order.methods.OrderByAddr(accounts[0]).call().then(console.log);
    await order.methods.OrderByAddr(accounts[1]).call().then(console.log);
    await order.methods.OrderByAddr(accounts[2]).call().then(console.log);
    console.log(" ");
                       
    console.log("<Q1-8. 556 Order List>");
    await order.methods.OrderById(556).call().then(console.log);
    console.log(" ");
                       
}

doIt()
