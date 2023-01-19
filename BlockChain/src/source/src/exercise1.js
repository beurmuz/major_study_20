console.log('1. Blocknumber of now: ',eth.blockNumber);
console.log('2.',admin.nodeInfo.enode);
console.log('3. Peer is : ',eth.peer);
console.log('4. Accounts list : ',eth.accounts);
console.log('5-1. 1st Accounts Balance : ',eth.getBalance(eth.accounts[0]));
console.log('5-2. 2nd Accounts Balance : ',eth.getBalance(eth.accounts[1]));
console.log('5-3. 3rd Accounts Balance : ',eth.getBalance(eth.accounts[2]));
console.log('5-4. 4th Accounts Balance : ',eth.getBalance(eth.accounts[3]));
console.log('6. Change the coinbase : ');
console.log('   Before:     ',eth.coinbase);
console.log('   After: ',miner.setEtherbase(eth.accounts[1]),eth.coinbase);
console.log('7. Waiting transactions: ',JSON.stringify(txpool.status));
console.log('8-1. Blocknumber of now: ',eth.blockNumber);
console.log("8-2. Blocknumber는 가장 먼저 0으로 시작해 마이닝을 하면 Block이 만들어지면서 Blocknumber가 증가하게 된다. 이 때 마이닝은 거래 기록을 남기는 과정으로, 계정과 잔고를 출력하는 작업들과는 다르기 때문에 block이 만들어지지 않게 된 것이다. 따라서 처음 block의 개수와 같게 나온 것이다.")

