const my = require('./Timer');
console.log("- compiled results: " +my);
console.log("- ABI: "+my._compiled.contracts['src/Timer.sol:Timer'].abi);
console.log("- Bytecode: "+my._compiled.contracts['src/Timer.sol:Timer'].bin);
