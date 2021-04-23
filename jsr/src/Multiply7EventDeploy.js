var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));
var _abiArray=[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"param1","type":"address"},{"indexed":false,"internalType":"uint256","name":"param2","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"param3","type":"uint256"}],"name":"Print","type":"event"},{"constant":false,"inputs":[{"internalType":"uint256","name":"param4","type":"uint256"}],"name":"multiply","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
//var _abiArray=JSON.parse(_abiStr);
var _bin="0x" + "6080604052348015600f57600080fd5b5060e98061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063c6888fa114602d575b600080fd5b605660048036036020811015604157600080fd5b81019080803590602001909291905050506058565b005b3373ffffffffffffffffffffffffffffffffffffffff167f91da4985ab616136202f4e81fd2d8cac1eb12591132d609cece407f7c6fb92054283600702604051808381526020018281526020019250505060405180910390a25056fea265627a7a72315820aaad7155218d1ee10efe9a7e130d71151dda2dca5a50112684a20002454a900f64736f6c63430005100032";
//unlock the account with a password provided
//web3.personal.unlockAccount(web3.eth.accounts[0],'password');
async function deploy() {
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying the contract from " + accounts[0]);
    var deployed = await new web3.eth.Contract(_abiArray)
        .deploy({data: _bin})
        .send({from: accounts[0], gas: 364124, gasPrice: '1000000000'}, function(err, transactionHash) {
                if(!err) console.log("hash: " + transactionHash); 
        })
        //.then(function(newContractInstance) {
        //    console.log(newContractInstance.options.address)
        //});
    console.log("---> The contract deployed to: " + deployed.options.address)
}
deploy()
