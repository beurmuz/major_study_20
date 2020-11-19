pragma solidity ^0.5.0;
contract ArrayTest {
    uint[3] ages = [15,25,35];
    int[] marks; //dynamic array
    
    function updateAges(uint index, uint val) public {
        if(index>=0 && index<=2)
            ages[index] = val;
    }
    function initMarks() public {
        marks = new int[](5);
    }
    function appendMark(int mark) public {
        marks.push(mark);
    }
    function popMark() public {
        marks.pop();
    }
    function getMarks() public view returns(int[] memory) {
        return marks;
    }
    function getAges() public view returns(uint[3] memory){
        return ages;
    }
    function getLenOfArray() pure public returns(uint){
        uint8[3] memory intArr = [0,1,2];
        return intArr.length;
    }
}
