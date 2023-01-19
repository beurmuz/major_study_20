
pragma solidity ^0.6.0;
contract GlobalVarsTest {
    function getEther() pure public returns(uint) {
        return 1 ether;  // 전역변수, 1000000000000000000
    }
    
    function getDays() view public returns(uint,uint) {
        require(block.timestamp==now); // 예외문, 같으면 다음문장을 수행함
        return(now, 1 days);
    }
    
    function getMsgValue() view internal returns(uint) {
        return msg.value; // 금액이 들어간 필드를 의미함. 
    }
    
    function getMsgSender() view public returns(address) {
        return msg.sender;
    }
    
    function getCoinbase() view public returns(address) {
        return block.coinbase;
    }
    
    function getBlockNumber() view public returns(uint) {
        return block.number;
    }
    
    function getBlockTimeStamp() view public returns(uint) {
        return block.timestamp;
    }
}
