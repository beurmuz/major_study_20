pragma solidity ^0.6.0;

contract Multiply7 {
   //event Print(uint);
   receive() external payable {} // receiver()는 fallback함수가 없을 때 호출되며, 송금이 될 수 있는 함수로 선언한다. 
   fallback() external payable {}  // body에 이벤트를 발생하는 함수를 넣어도 좋지만 안넣겠다!
   function multiply(uint input) pure public returns (uint) {
      //emit Print(input * 7);
      return input * 7;
   }
   function getAddress() view public returns(address) { // 주소 확인 함수, 컨트랙도 주소가 있고 외부 사용자 계정도 주소가 있다. 
       return address(this); // 주소 반환
   }
}

contract Math {
    Multiply7 m7=new Multiply7(); // 두 컨트랙을 연결시키기 위해 컨트랙의 객체를 만든다.
    // 같은파일이니 new명령어를 이용하고, 다른 파일이면 주소를 이용해야함
    function deposit(uint amount) payable public { 
        require(msg.value==amount); // 입력 값이 msg.value와 동일할 때에만 입금이 되도록함
    }
    function setM7(address payable _addr) public { // 주소를 이용해서 setting. 입력이 address
        m7 = Multiply7(_addr); // 주소를 넣어서 객체 생성
    }
    function multiply() view public returns(uint) { // Multiply7에 있는 함수를 호출해서 결과를 보여주는 것
        uint res=m7.multiply(8); // abi없이 함수를 호출해서 쓰는 것, 결과값을 받아놓는다.
        //this.send11(); It does not send value.
        return res;
    }
    function send11M7() public payable {
        // multiply7의 fallback함수, 돈을 송금하는 함수로, 송금 시 M7으로 입금이 됨.
        //m7.multiply.value(11)(9);
        //m7.multiply(9);
        address(m7).transfer(11); // 11wei만 address로 형변환 해준 m7을 호출함
    }
    function getBalanceOfThis() public view returns(uint) { // 잔고구하기
        return address(this).balance;
    }
    function getBalanceOfM7() public view returns(uint) { //multiply7 컨트랙의 객체인 m7의 잔고를 구하는 함수
        return address(m7).balance;
    }
    function getAddressOfM7() view public returns(address) { // 주소구하기
        return address(m7); //형변환 후 !! 봐야함
   }    
}