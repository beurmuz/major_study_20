
pragma solidity ^0.6;
//pragma solidity 0.4.21;
contract C1 {
    uint128 v1;
    function set(uint128 _v1) public { //인자받아서 v1을 설정
        v1=_v1;
    }
    function get() public view returns(uint128) { //v1을 반환
        return v1;
    }
    function get7() public pure returns(uint128) { //7을 반환
        return 7;
    }
}

contract C2 {
    C1 c1;
    //function C2() public {  //0.4.21 constructor
    constructor() public {    //0.6 constructor
        c1=new C1();
    }
    function set(uint128 _v1) public { //c2에서 c1이 되면, 제대로 연결되었다는 것임
        c1.set(_v1);
    }
    function get() public view returns(uint128) {
        return c1.get();
    }
    function get7() public view returns(uint128) {
        return c1.get7();
    }
    function getC1Address() public view returns(address) { //address를 출력 
        return address(c1);
    }
}
