pragma solidity ^0.6.0;

contract MyBank {
    address payable owner;
    uint balance; //contract balance
    constructor() public {
        owner = msg.sender;
        balance = address(this).balance; //contract balance
    }
    
    // value에 적은 값이 이 컨트랙으로 이체됨
    function deposit(uint amount) public payable {
        require(msg.value == amount);// 입금되는 금액은 msg.value라는 전역변수에서 읽어올 수 있음.
        balance += amount;
    }
    
    // 인출하는 함수
    function withdraw(uint amount) public payable {
        balance -= amount; // 인출이니 계좌잔고에서 인출 값(amount)만큼을 빼주어야 함
        owner.transfer(amount); // owner에게 계좌 이체하기
    }
    
    // 계정을 정해서 인출하기 
    function transferTo(address payable receiver, uint amount) public payable { //받는 계정, 송금 금액
        balance -= amount;
        receiver.transfer(amount); //receiver에게 계좌이체 하기
    }
    
    // 잔고를 구하는 함수
    function getBalance() public view returns(uint) {
        return balance;
    }
    
    // 컨트랙의 잔고를 구하는 함수
    function getBalanceOfThis() public  view returns(uint) {
        return address(this).balance;
    }
    
    // 오너의 잔고 구하기
    function getBalanceOfOwner() public view returns(uint) {
        return owner.balance;
    }
}
