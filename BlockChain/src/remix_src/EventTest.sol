pragma solidity ^0.5.0;
contract EventTest {
    address private owner;
    event MyLog(string my);
    function myFunction() public {//function
        emit MyLog("Hello World!"); //event는 emit, 이벤트 명은 MyLog()
    } // 결과는 deploy후 로그창에서 디버그를 누르고, log부분을 확인해본다.
}