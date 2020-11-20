pragma solidity ^0.5.0;
contract UnderscoreTest {
    string season = "";
    function getSeason() view public returns(string memory) {
        return season;
    }
    function setWinter() public setSummerAfter {
        season = "winter";
    }
    function setSpring() public setSummerBefore {
        season = "spring";
    }
    modifier setSummerAfter() {
        season = "summer"; //season에 summer가 들어간 후에
        _; //setWinter()가 실행되어 season에 winter가 들어가게 됨
    }
        modifier setSummerBefore() {
        _; //setSpring()함수가 실행되어 season이 spring이 된 후에 
        season = "summer"; //season이 summer로 바뀜
    }
}