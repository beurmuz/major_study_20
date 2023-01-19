pragma solidity ^0.4.0;
contract powerOf2 {
    int256 output;
    function PowerOf2(int256 input) public {
        output=1;
        for(int256 i=0; i<input; i++){
            output = output*2;
        }
    }
    function getResult() public view returns (int256) {
        return output;
    }
}
