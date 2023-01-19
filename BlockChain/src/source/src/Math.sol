pragma solidity ^0.4.0;
contract Math{
    function powerOf2 (uint input) public pure returns(uint) {
            uint out =1;
          for (uint i=0; i<input; i++) {
              out *=2;
        }
        return out;
    }
}
