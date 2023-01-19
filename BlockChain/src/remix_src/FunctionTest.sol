pragma solidity ^0.5.0;
contract FunctionTest {
    int x;
    constructor() public {
        x = 0;
    }
    function incrementX() public {
        x +=1;
    }
    
    function doubleX() public {
        X2();
    }
    function X2() internal {
        x *= 2;
    }
    function divideBy(int by) view public returns(int) {
        return x/by;
    }
    function getX_() public returns (int) {// state valiable을 읽어오는 것
        return x;
    } /// 명시적으로 반환이 있어도, view가 없으니 반환이 안됨
    function getX() view public returns (int) {// state valiable을 읽어오는 것
        return x;
        
    }// 값을 반환함
    function getBalance() view public returns (uint) { // 잔고를 반환함
        return address(this).balance;
    }
    function deposit() public payable { // deposit은 msg.value로 넘어온 값을 컨트랙에 저장해줌. 입출력이 되면 payable로 선언해야함
    }
    function getBlockNumber() view public returns(uint) {
        return block.number;
    }
}