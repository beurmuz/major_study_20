
var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));
var _abiArray = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"","type":"string"}],"name":"OrderLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes2","name":"_itemId","type":"bytes2"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"OrderLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"OrderLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":false,"internalType":"bytes2","name":"_itemId","type":"bytes2"},{"indexed":true,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"OrderLog","type":"event"},{"inputs":[{"internalType":"bytes2","name":"_itemId","type":"bytes2"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"order","outputs":[],"stateMutability":"payable","type":"function"}];
//var _abiArray = JSON.parse(_abiStr);
var _bin="0x" + "6080604052600a60005534801561001557600080fd5b50610201806100256000396000f3fe60806040526004361061001e5760003560e01c806332af7f7314610023575b600080fd5b61007a6004803603604081101561003957600080fd5b8101908080357dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191690602001909291908035906020019092919050505061007c565b005b6000429050600080548302905080341461009557600080fd5b7fb9e815be6bf0b588396af8fa0244c9f92e26ad4dbf3694c09d90b0cc9f2be8e56040518080602001828103825260078152602001807f4f7264657265640000000000000000000000000000000000000000000000000081525060200191505060405180910390a17f2fb1e4e17675a393b0a43253759334f7e61806d1ac2690f0432362ed1c4c1611826040518082815260200191505060405180910390a1343373ffffffffffffffffffffffffffffffffffffffff167f1f7c3420c50f5b8875456d867e023a6d440ef2c1706d52ba38f5c6f553b53d508660405180827dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167dffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200191505060405180910390a35050505056fea26469706673582212207229691c42a8c3b0a93b507e5c0295755bc82ac4f4745461a9a2eb8ceb91045b64736f6c63430006030033";

//unlock the account with a password provided
//web3.personal.unlockAccount(web3.eth.accounts[0],'password');
async function deploy() { //async 이용합니댜
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying the contract from " + accounts[0]);
    var deployed = await new web3.eth.Contract(_abiArray)
        .deploy({data: _bin})
        .send({from: accounts[0], gas: 300000}, function(err, transactionHash) {
                if(!err) console.log("hash: " + transactionHash); 
        })
        //.then(function(newContractInstance) {
        //    console.log(newContractInstance.options.address)
        //});
    console.log("---> The contract deployed to: " + deployed.options.address)
}

deploy()
