
pragma solidity ^0.6.0;
contract Random { //32bit짜리 숫자를 생성하는 rand함수 만들기
    function rand() public view returns(bytes32) {
        return keccak256(abi.encodePacked(block.timestamp, block.difficulty));
    } //사용하는 전역변수는 timestamp, difficulty. 이는 매시점 달라짐.
                 
    function rand0and250() public view returns(uint8) { //0~250사이의 랜덤 수를 생성, 반환은 8bit.
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%251);
    } // 형변환을 uint256로 해주어야 함. 그리고 다시 한번 uint8로 해주어야 함. (총 2번 형변환하기)
    
    function rand0and9() public view returns(uint8) { //0~9까지 생성하기. 
    //뒤에 251을 10으로만 바꾸어주면 됨. 가위바위보는 3으로 바꾸면 됨. 이 숫자가 modulus임
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%10);
    }
                 
    function rand0and2() public view returns(uint8) { 
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%3);
    }
                 
    function genRandomInteger() view public returns(uint8[] memory) {//for문으로 무작위숫자 10개 만들기                                                             
        uint8[] memory r = new uint8[](10); //동적 배열 선언, new명령어로 동적배열 10개 선언
        for(uint i = 0; i<r.length; i++) //r의 길이만큼 반복해서 무작위수 생성하기. 
            //r[i] = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%10);
            //change timestamp by adding i, otherwise all the same numbers generated
            r[i] = uint8(uint256(keccak256(abi.encodePacked(block.timestamp + i, block.difficulty)))%10);
            //반환되는 것이 uint8이므로 전부 uint8로 바꾸기                                                          
        return r;
    }
}
