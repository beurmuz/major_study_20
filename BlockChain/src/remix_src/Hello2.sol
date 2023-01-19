pragma solidity ^0.6.0;

contract Hello2 {
    string hello; //Hello 문자열 선언
    address payable owner; //Owner 선언

    event PrintLog(string _s);
    constructor() public {
        owner = msg.sender;
    }
    function sayHello() view public returns(string memory) {
        return hello;
    }
    function setHello(string memory _hello) public payable {
        hello = _hello;
        emit PrintLog(_hello);
    }
    function getBalance() view public returns(uint) {
        return address(this).balance;
    }
    //Balance를 반환하기 때문에 kill()을 이용하면 잔고 확인이 불가하다. 왜냐하면 컨트랙이 블록체인에서 제거되었기 때문.
    function kill() public { // 따라서 kill()하기 전에 잔고 확인 함수를 만들고, 그 잔고만큼 web3에서 coinbase에 그 잔액이 들어왔는지를 확인해야 함
        if (msg.sender == owner)  //지우는 권한은 오직 owner에게만 주어져야 한다. 
        selfdestruct(owner); //owner를 넣어서 지움
        
    }
    
}