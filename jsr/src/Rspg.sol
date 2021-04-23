pragma solidity ^0.6.0;

contract Rsp { //32bit짜리 숫자를 생성하는 rand함수 만들기
    uint8 randA;
    uint8 randB;
    uint8 whatresult;
    string transresult="";
    address owner; //컨트랙 제작자
    mapping (address => uint) balanceOf; // 잔고를 저장하는 mapping. 잔고의 key는 address, address의 key는 uint
    constructor() public { // 생성자, 누구나 객체를 만들 수 있음
        owner = msg.sender;  
    }
    
    //무작위로 가위, 바위, 보를 생성하고, 설정한다. 1000 wei씩 금액을 건다.
    function setA(uint amount) payable public {
        require(msg.value == amount);
        balanceOf[msg.sender] += amount;
        randA = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%3);
        // 0 : 가위, 1 : 바위, 2 : 보
    } 

    //외부에서 직접 입력하여 설정한다. 1000 wei씩 금액을 건다.
    function setB(address addr, uint amount, uint8 _value) payable public {
        require(msg.value == amount);
        balanceOf[addr] += amount;
        randB = _value;
    }
    
    //가위, 바위, 보의 승패를 정한다.
    function play() public { //tie = 3, A win = 4, B win = 5
        if(randA==0) { //가위
            if(randB==0) { //가위
                whatresult= 3;
            }
            else if(randB==1){ //바위
                whatresult= 5;
            }
            else{ //B가 보
                whatresult= 4;
            }
        }
        else if(randA == 1) { //바위
            if(randB==0) { //가위
                whatresult= 4;
            }
            else if(randB==1) {
                whatresult= 3;
            }
            else {
                whatresult= 5;
            }
        }
        else if(randA==2){ //보
            if(randB==0){ //가위
                whatresult= 5;
            }
            else if(randB==1){
                whatresult= 4;
            }
            else {
                whatresult= 3;
            }
        }
        if(whatresult==3){
            transresult = "tie";
        }
        else if(whatresult==4){
            transresult = "A win";
        }
        else if(whatresult==5){
            transresult = "B win";
        }
    }
    
    //이긴 측에게 내기 금액을 분배한다. A가 이기면 B의 내기 금액 1000 wei를 가지게 된다.
    function distributeBetAmount(address payable receiver) public payable{
        if(whatresult==3){ //tie
            balanceOf[receiver];
            balanceOf[msg.sender];
        }
        else if(whatresult==4){ //A win
            balanceOf[receiver] -= 1000;
            balanceOf[msg.sender] += 1000;
        }
        else if(whatresult==5){ //B win
            balanceOf[msg.sender] -= 1000;
            balanceOf[receiver] += 1000;
        }
    }
    
    // 컨트랙 잔고 확인
    function getContract() public view returns(uint){
         return (address(this).balance);
    }
    
    //A의 잔고 확인
    function getA() public view returns(uint) {
        return (balanceOf[owner]); // A의 잔고 출력       
    }
    
    //B의 잔고 확인
    function getB(address addr) public view returns(uint) {
        return balanceOf[addr]; //B의 계좌 잔고를 읽어옴
    }
    
    //"A wins", "B wins", "tie" 결과를 출력
    function getMatchResult()public view returns(string memory) {
        return (transresult);
    }
    
    function getwhatresult() public view returns(uint) {
        return (whatresult);
    }
    
}
