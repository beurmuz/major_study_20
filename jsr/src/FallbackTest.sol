
pragma solidity ^0.6.0;
contract FallbackTest {
    event PrintLog(string);
    function callA () pure public returns(string memory){ // String은 reference함수니까 memory를 적어주어야 함
        return "doing callA"; // 문자열 반환
    }
    fallback () external { // callB호출 시 나오는 fallback함수
        emit PrintLog("fallback called");
    }
}
