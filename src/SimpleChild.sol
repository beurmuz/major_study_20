pragma solidity ^0.6.0;

contract Parent {
    //state variables
    address payable owner;
    uint private counter;

    //constructor
    constructor() public {
        owner=msg.sender;
        counter = 0;
    }
    //functions
    function add() public { counter++; }
    function getCounter() public view returns(uint) { return counter; }
}

contract SimpleChild is Parent {
    //state variables
    string nickName;
    mapping(address => uint) private balances;
    //event
    event PrintLog(address, uint);

    //constructor
    constructor() public {}
    //functions
    function setNickName(string memory s) public { nickName = s; }
    function getNickName() public view returns(string memory) { return nickName; }
    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit PrintLog(msg.sender, msg.value);
    }
    function queryBalance() public view returns (uint) {
        return balances[msg.sender];
    }
    //access non-private members of the parent
    function kill() public {
        if (msg.sender == owner) selfdestruct(owner);
    }
}
