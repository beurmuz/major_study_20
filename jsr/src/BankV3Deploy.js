
var Web3 = require('web3'); //라이브러리설정
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));
//var _abiArray = JSON.parse(_abiStr); //js의 dictionary
var _abiArray = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"","type":"string"}],"name":"PrintLog","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Sent","type":"event"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"_receiver","type":"address"}],"name":"forwardTo","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
//key:value로 이루어진 독특한 notation임
var _bin = "0x" + "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060006001819055506103ee806100686000396000f3fe60806040526004361061003f5760003560e01c806312065fe0146100b657806327d8ad88146100e8578063853828b61461012c578063b6b55f2514610143575b34801561004b57600080fd5b507f968f0302429ff0e5bd56a45ce3ba1f4fa79f4b822857e438616435f00c3b59fd60405180806020018281038252600f8152602001807f46616c6c6261636b2063616c6c6564000000000000000000000000000000000081525060200191505060405180910390a1005b3480156100c257600080fd5b506100cb610171565b604051808381526020018281526020019250505060405180910390f35b61012a600480360360208110156100fe57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610180565b005b34801561013857600080fd5b506101416102c2565b005b61016f6004803603602081101561015957600080fd5b8101908080359060200190929190505050610381565b005b60008060015447915091509091565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101d957600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f1935050505015801561021f573d6000803e3d6000fd5b507f3990db2d31862302a685e8086b5755072a6e2b5b780af1ee81ece35ee3cd3345338234604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a150565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461031b57600080fd5b6065471161032857600080fd5b476001600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f1935050505015801561037e573d6000803e3d6000fd5b50565b60025442101561039057600080fd5b600a42016002819055508034146103a657600080fd5b806001600082825401925050819055505056fea265627a7a723158201106f1b5227d80d31f8d10d35fae0849693ef12f217bf379ebfbd69ae67e68c764736f6c63430005100032";
//binary는 16진수로.
//unlock the account with a password provided
//web3.personal.unlockAccount(web3.eth.accounts[0],'password');
async function deploy() { //async로 선언, 그 안에 promise 반환하는 것을 await해서 결과값을 받아내겠다는 것
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying the contract from " + accounts[0]); //deploy하고있는 coinbase출력
    var deployed = await new web3.eth.Contract(_abiArray)
        .deploy({data: _bin}) //blockchain하고, blockchain에 send하는
        .send({from: accounts[0], gas: 1000000}, function(err, transactionHash) {
                if(!err) console.log("hash: " + transactionHash); 
        }) //send가 되고나면 결과가 deploy에 들어가도록 함
        //.then(function(newContractInstance){
        //    console.log(newContractInstance.options.address)
        //});
    console.log("---> The contract deployed to: " + deployed.options.address) //contract이 어디에 deployed되고있는지 출력
}
deploy()
