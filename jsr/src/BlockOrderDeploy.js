
var Web3=require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8345"));
var _abiArray =[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"","type":"uint256"},{"indexed":false,"internalType":"string","name":"","type":"string"}],"name":"OrderLog","type":"event"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_itemId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"_from","type":"string"}],"name":"order","outputs":[],"stateMutability":"payable","type":"function"}];
//var _abiArray = JSON.parse(_abiStr);
var _bin="0x" + "608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610287806100606000396000f3fe6080604052600436106100295760003560e01c806312065fe01461002e578063b0bb49eb14610059575b600080fd5b34801561003a57600080fd5b50610043610128565b6040518082815260200191505060405180910390f35b6101266004803603606081101561006f57600080fd5b810190808035906020019092919080359060200190929190803590602001906401000000008111156100a057600080fd5b8201836020820111156100b257600080fd5b803590602001918460018302840111640100000000831117156100d457600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610189565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461018357600080fd5b47905090565b3373ffffffffffffffffffffffffffffffffffffffff167f40c379409af56ac92abea08a48623434cb7ac020221d5e4840d056e19d6ec2958484846040518084815260200183815260200180602001828103825283818151815260200191508051906020019080838360005b838110156102105780820151818401526020810190506101f5565b50505050905090810190601f16801561023d5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a250505056fea264697066735822122042b8eb617c5ae5ea67f3bb2fc4bc6b51baabb268ee3f5092fb15f94e2c8af88f64736f6c63430006030033";

async function deploy() { 
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
