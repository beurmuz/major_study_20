
pragma solidity ^0.6.0;

contract Hello1 {
    string private hello; // 가시성은 private로 하고, 아무도 못보게 한다
    address private owner; // 주소 owner도 하나 만든다
    event PrintLog(address addr, string s); // 주소와 문자열을 받는 이벤트를 하나 만든다
    
    constructor(string memory _hello) public { // 오버로딩해서 string이니 memory 참조타입
        hello = _hello; // state variable을 초기화
        owner = msg.sender; // msg.sender는 사용자측에서 컨트랙으로 보내는 트랜잭션을 말함. (msg를 블록체인에 보내는 사람의 주소를 말함)
    }
    
    function sayHello() view public returns(string memory) { //인사하는 문자열이니 메모리로 
        return hello;
    }
    
    modifier isOwner() { //isOwner를 쓰게되면, 이 경우만 특정 함수가 실행될 수 있게끔 하여 if문이 줄어들 수 있음
        if (msg.sender != owner) {
            revert(); // exception이 발생해서 중단하는 것
        }
        _; //continue executing rest of method body, // 위의 것을 호출하는게 _;이거임
    }
    
    function setHello() public { // state variable은 가급적 사용하지 말아야함
        string memory s = "";// local로 문자열을 하나 만들고, 최종적으로 state variable을 수정하는 걸로 해야함
        if (msg.sender == owner) { //Owner일 때 Hello라고 인사하는 문자열
            s = "Hello"; 
            emit PrintLog(msg.sender, s); // 이벤트를 발생시킴(주소, 문자열)
        } else {
            s = "Olleh"; //Owner가 아닐 때 Olleh라고 인사함
            emit PrintLog(msg.sender, s); // 이벤트를 발생시킴(주소, 문자열)
        }
        hello = s; // 여기서 최종적으로 state variable을 1번 update함(update 수는 비용에 영향을 미침)
    }
    
    function compareTo(string memory _str) view public returns(bool) { // 문자열을 받아서 hello와 비교하는 함수, 결과는 boolean으로 함
        bool isEqual = false; //우선 false를 넣고, 같으면 true로 대체한다.
        //참조타입이 아니면  if (hello == _str) {
            // String(이 외에 array나 mapping도)은reference 타입이기에, 해싱을 해서 진짜 문자열을 비교해야함.
        if (keccak256(bytes(hello)) == keccak256(bytes(_str))) { // 해시문자열을 비교
            isEqual = true;
        }
        return isEqual; // if문이 끝나고 반환함
    }
    
    function getBalance() view public isOwner returns(uint) { // 오직 Owner만 볼 수 있는 잔고
        return address(this).balance;
    } //Owner일 때는 balance를 보고, Owner가 아닐 때에는 balance를 보지 못하게 코딩할 수 있다는 것 잊지말기!! 
}
