pragma solidity ^0.5.0;

contract BankV3 {
    address owner;
    uint balance; //contract의 잔고를 추적하기 위해서 쓰임
    uint256 timeToDeposit; //10초 흘러가는지 확인하기 위한 변수
    
    event PrintLog(string); //event
    event Sent(address from, address to, uint amount);
    constructor() public {
        owner = msg.sender; //초기화를 메세지를 전송하는 주소로 설정(전역변수)
        balance = 0; //초기값
    }
    function() external { //fallback,호출 했는데 해당하는 함수가 없을 경우 실행됨
        emit PrintLog("Fallback called");
    }
    function forwardTo(address payable _receiver) public payable onlyOwner { //인자는 받는 사람, 실행은 owner일 경우에만 하도록 modifier 1설정
        _receiver.transfer(msg.value);//receiver로 msg.value만큼 전송
        emit Sent(msg.sender, _receiver, msg.value); //forawrdTo(계좌이체)가 일어났을 땐 Sent라는 event를 발생시킴
        
    }
    function getBalance() public view returns(uint, uint) { //잔고를 읽는 함수 
        return (balance, address(this).balance); //두개의 잔고 반환 수동으로 추적하는 balance와, 자동으로 추적하는 this.balance
    }
    
    /*금액을 넘겨줘서 deposit하는 경우, 원래는 매개변수가 없어도 value라는 field에 금액을 넣으면 deposit이 됨
    매개변수를 비워놔도 되지만, value field와 amount field를 일치시키기 위함*/
    function deposit(uint amount) public payable onlyAfter { //modifier 2
        timeToDeposit = now + 10 seconds; //10초 지난 것을 여기서 측정함
        require(msg.value == amount); //값이 동일한 경우에만 실행됨. 동일하지 않으면 예외 발생
        balance += amount; //deposit되면 balance를 추적해야함
    }
    //전액인출하는 함수
    function withdrawAll() public onlyOwner minBalance { //오직 Owner만, 최소 잔액이 있어야만 전액 인출할 수 있음, modifier 3설정 
        balance -= address(this).balance; //전체 출금하니 이 금액만큼 잔고에서 제거
        msg.sender.transfer(address(this).balance); // 출금
    }
    modifier onlyOwner {
        require(msg.sender == owner); // msg.sender가 owner일때만 한다
        _; // 호출하는 소스코드
    }
    modifier onlyAfter {
        require(now >= timeToDeposit); // now가 10초 더한 timeTOdeposit과 크거나 같아야 함
        _; // 소스코드가 합쳐지고 나서 실행되도록 함
    }
    modifier minBalance { // 잔고가 101wei보다 클 경우에만 실행
        require(address(this).balance > 101 wei); // 소스코드가 여기에 합쳐지도록 함
        _;
    }
    
}