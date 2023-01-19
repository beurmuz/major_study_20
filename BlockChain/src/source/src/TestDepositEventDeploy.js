var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));
var _abiArray=[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"bytes32","name":"_id","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Deposit","type":"event"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_id","type":"bytes32"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}];
//var _abiArray=JSON.parse(_abiStr);
var _bin="0x" + "6080604052348015600f57600080fd5b5060d38061001e6000396000f3fe608060405260043610601c5760003560e01c8063b214faa5146021575b600080fd5b604a60048036036020811015603557600080fd5b8101908080359060200190929190505050604c565b005b803373ffffffffffffffffffffffffffffffffffffffff167f19dacbf83c5de6658e14cbf7bcae5c15eca2eedecf1c66fbca928e4d351bea0f346040518082815260200191505060405180910390a35056fea265627a7a72315820833791e3a4151485b6afeaf53c7009ed63af7549fc4666b71bf6d4a55940e73564736f6c63430005100032";
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
