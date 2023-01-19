var ac1 = eth.accounts[4];
var ac2 = eth.accounts[5];
var bal1 = eth.getBalance(ac1);
var bal2 = eth.getBalance(ac2);
console.log('The Accounts is: ',eth.accounts);
console.log('The Coinbase Balance is: ',web3.fromWei(bal1));
console.log('The 2st Balance is: ',web3.fromWei(bal2));
console.log('The Blocknumber: ', eth.blockNumber);
