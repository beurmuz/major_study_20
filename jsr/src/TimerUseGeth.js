loadScript('src/TimerGeth.js')
contractName=Object.keys(_compiled.contracts)
_abi=JSON.parse(_compiled.contracts[contractName[0]].abi)
//_abi=JSON.parse(_compiled.contracts['src/Example.sol:Example'].abi)
var _contract=eth.contract(_abi);
var _address="0x5656377d2206c37904b23c98e76d2f0df8bf5855";
var _instance=eth.contract(_abi).at(_address);
console.log(_instance.getNow.call());
_instance.start.sendTransaction({from:eth.accounts[0]});
console.log(_instance.timePassed.call());
