
pragma solidity ^0.6.0;

contract OrderEvent {
    address owner;
    event OrderLog(address indexed, uint, uint, string); 
    
    constructor() public{
        owner = msg.sender;
    }
    
    modifier isOwner() { 
        if (msg.sender != owner) {
            revert(); // exception이 발생해서 중단하는 것
        }
        _; 
    }

    function order(uint _itemId, uint amount, string memory _from) public payable { 
        emit OrderLog(msg.sender,_itemId, amount, _from);
    }
    
    function getBalance() view public isOwner returns(uint) { // 오직 Owner만 볼 수 있는 잔고
        return address(this).balance;
    }
}
