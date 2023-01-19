console.log('Coinbase : ',eth.coinbase);
var coin = eth.getBalance((eth.coinbase))
console.log('Balance : ',web3.fromWei(coin,"ether"));
miner.start(1);admin.sleepBlocks(2);miner.stop();
console.log('Balance : ',web3.fromWei(coin,"ether")); 
