pragma solidity ^0.4.0;
contract Multiply7 {
    function multiply(uint input) public pure returns (uint){
        uint output=1;
        for (uint i=0; i < input; i++) {
            output*=2;
        }
        return output;
    }
}
