pragma solidity ^0.6.0;

contract ExceptionTest {
    address owner; //멤버변수
    constructor() public {
        owner=msg.sender; //초기화
    }
    function requireException() view public returns(string memory) {
        //if (msg.sender != owner) { throw; }
        require(msg.sender != owner, "Sorry! You are owner. Require failed...");
        //msg.sender가 owner일때는 실패.
        return "require condition met"; //성공시 return
    }
    function assertException() view public returns(string memory) {
        assert(msg.sender == owner); //오너인지 아닌지 확인. 실패하든 성공하든 진행이 됨.
        return "asserted";  //do this line only 'assert' is succeeded
    }
    function revertException() view public returns(string memory) {
        if(msg.sender != owner) {
            revert("Sorry! You are NOT owner. Reverted...");
            //센더가 오너가 아니면, 리버트시킴. 리버트하고나면 return을 해야함. 근데 출력 안됨
            //return "reverted";  // this line can't be reached if revert is executed 
        } else { //리버트가 아닌 경우
            return "not reverted";
        }
    }
    function raiseException() pure public { //강제로 오류발생 시키기
        int x=0;
        int y=0;
        x/y;    //divide by zero
    }
}