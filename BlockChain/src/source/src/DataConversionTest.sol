
pragma solidity ^0.6.0;

contract DataConversionTest {
    function convertInt8ToInt() pure public returns(int) {
        int8 i8 = 20;
        return int(i8); //20
    }
    
    function convertIntToBytes32() pure public returns(bytes32) {
        uint x = 20;
        return bytes32(x); // bytes32로 형변환, 10진수, 0x0000,,,14
    }
    
    function convertInt64ToBytes8() pure public returns(bytes8) {
        uint64 x = 10;
        return bytes8(x); // 0x0000...aa
    }
    
    function convertIntToBytes() pure public returns(bytes memory) {
        uint x = 20;
        bytes32 y = bytes32(x);
        bytes memory z = new bytes(32); // 데이터를 받을 bytes, bytes는 참조형이므로 memory가 되어야 함
        for(uint i=0; i<32; i++) {
            z[i] = y[i];
        }
        return z; // 0 is 60.
    }
    
    function convertStringToBytes() pure public returns(bytes memory) {
        string memory s = "hello";
        return bytes(s);
    }
    
    function convertBytes4ToBytes2() pure public returns(bytes2) {
        bytes4 b4 = 0x68656c6c;
        return bytes2(b4); //overflow occur
    }
    
    function convertBytes4ToInt32() pure public returns(int32) {
        bytes4 b4 = 0x68656c6c;
        return int32(b4); //16 -> 10, no hex, int 10
    }
}
