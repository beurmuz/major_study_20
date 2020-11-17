pragma solidity ^0.5.0;
contract AddressTest {
    address owner; // 컨트랙 제작자
    address payable receiver; // 수신측 계정, 돈이 왔다 갔다 할거니까 payable 선언
    uint balanceOfOwner; // 잔고
    constructor() public {
        owner = msg.sender; // 오너 정하기, msg.owner는 전송측 주소
        balanceOfOwner = owner.balance; // 오너는 주소를 말하고, 이 주소의 잔고를 말함
    }
    function deposit() payable public { // 전송자가 보낸 ether를 addressTest에 저장하는 기능
    }// value에 적은 값이 이 컨트랙으로 이체됨
    function setReceiver(address payable addr) public { // 주소 설정
        receiver = addr;
    }
    function getReceiver() view public returns(address) {
        return receiver; // setReceiver에서 설정한 주소를 반환함
    }
    function getBalanceOfThis() public view returns(uint) { // 컨트랙의 잔고 반환
        return address(this).balance;
    }
    function getBalanceOfOwner() public view returns(uint) { // 송신자의 잔고 반환
        return owner.balance;
    }
    function getBalanceOfReceiver() public view returns(uint) { // 수신자의 잔고 반환
        return receiver.balance;
    }
    function send() public payable { // 수신측으로 send()한다
        require(receiver.send(111));
    }
    function transfer() public payable {
        receiver.transfer(11111); // require을 쓸 수 없음. sender는 return값이 TorF이므로 가능했다.
    }
    function callValue() public payable {
        receiver.call.value(11111)("");
        receiver.call.gas(10).value(11111)("");
    }
}
