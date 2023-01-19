pragma solidity ^0.5.0;

contract Bank {
    address payable owner; //sender
    uint balance; //contract balance
    constructor() public {
        owner = msg.sender;
        balance = address(this).balance; //contract balance
    }
    
    // 입금액을 정해서 입금하는 함수
    function deposit(uint amount) public payable {
        require(msg.value == amount);
        balance += amount;
    }
    
    // 전액 인출 함수
    function widthdrawAll() public {
        owner.transfer(address(this).balance);
    }
    
    // 컨트랙 잔고확인 함수 (this를 이용한 잔고, 상태변수 잔고 (this 잔고가 맞는지 확인하는 용도)
    function getBalance() public view returns(uint,uint) {
        return (address(this).balance, balance); //now contract address balance
    }

    /*// owner잔고확인 함수
    function getBalanceOfOwner() public view returns (uint) {
        return owner.balance;
    }*/
    
    // 다른 계정으로 계좌이체 함수
    function forwardTo(address payable _receiver) public payable {
        _receiver.transfer(333);
    }
}