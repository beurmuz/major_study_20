var Web3 = require('web3');
var web3 = new Web3('http://127.0.0.1:8345');
web3.eth.getAccounts(function(err,res) { console.log("accounts: " + res); } );
my=[]
web3.eth.getAccounts(function(err, res) { for (x in res) { my.push(res[x]) } } );
console.log("accounts from array: " + my[0]);
