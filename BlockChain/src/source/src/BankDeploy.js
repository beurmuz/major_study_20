//geth
var Web3=require('web3');
var web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8445"));
}
var _abiArray=[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"_receiver","type":"address"}],"name":"forwardTo","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"widthdrawAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
var _bin="608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555047600181905550610218806100676000396000f3fe60806040526004361061003f5760003560e01c806312065fe01461004457806327d8ad88146100765780633c459375146100ba578063b6b55f25146100d1575b600080fd5b34801561005057600080fd5b506100596100ff565b604051808381526020018281526020019250505060405180910390f35b6100b86004803603602081101561008c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061010e565b005b3480156100c657600080fd5b506100cf61015a565b005b6100fd600480360360208110156100e757600080fd5b81019080803590602001909291905050506101c4565b005b60008047600154915091509091565b8073ffffffffffffffffffffffffffffffffffffffff166108fc61014d9081150290604051600060405180830381858888f19350505050158015610156573d6000803e3d6000fd5b5050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f193505050501580156101c1573d6000803e3d6000fd5b50565b8034146101d057600080fd5b806001600082825401925050819055505056fea265627a7a723158206d0489633afc897071c3f6fca904305ee46670af234d9616f107d010672f8f3f64736f6c63430005100032";
var _contract = new web3.eth.Contract(_abiArray);
//unlock the account with a password provided
//web3.personal.unlockAccount(web3.eth.accounts[0],'password');
_contract
    .deploy({data:"0x"+_bin})
    .send({from: "0xc920e93d60afac15d7e2ca2c3fccf5307b3e227e", gas: 200000, gasPrice: '10000000'})
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address
    });
