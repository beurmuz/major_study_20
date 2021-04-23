
pragma solidity ^0.6.0;
contract BankV4 {
    address owner; //컨트랙 제작자, 
    mapping (address => uint) balanceOf; //balanceOf는 uint로 value가 되어있어 초기값이 0이 나올 것.string이면 null일 것
    //잔고를 저장하는 mapping자료구조로, 잔고의 key는 address로 하고, address의 key는 uint로 함. 잔고의 변수명은 balanceOf;
    constructor() public { //생성자. 누구든지 객체를 만들 수 있음 
        owner = msg.sender;
    }
    // save to individual addresses
    function deposit(uint amount) payable public onlyOwner { 
        //받아서 검증하는 것으로, 지급이 있으니 payable. 오직 오너만 입금 가능함
        require(msg.value == amount); //금액 확인 msg.value는 전역 변수임
        balanceOf[msg.sender] += amount; 
        //입금이 되면 balanceOf매핑에 sender가 주소가 되고, 이를 key값으로 해서 amount를 증가시킴
    }
    // forward from owner to another
    function forwardTo(address receiver, uint amount) payable public onlyOwner {
        // receiver로 amount만큼 계좌이체가 되는 함수. 오직 오너만 가능
        require(balanceOf[msg.sender] >= amount); //돈을 빼가려면 오너의 잔고가 amount보다 크거나 같아야 함
        balanceOf[msg.sender] -= amount; // Subtract from the sender , sender의 계좌에서 금액을 감소시키고
        balanceOf[receiver] += amount;   // Add the same to the recipient, reciever의 금액을 증가시킴(송금이니까)
    }
    function withdraw(address payable receiver, uint amount) public onlyOwner {
        //인출하는 함수, 돈을 완전히 인출하겠다! 즉 통장해지라고 생각하기. 
        require(balanceOf[receiver] >= amount && address(this).balance >= amount);
        //receiver의 잔고가 amount보다 커야하고, 이 컨트랙에서 가지고 있는 잔고도 amount보다 커야함
        balanceOf[receiver] -= amount; //balanceOf에 amount만큼 receiver를 감액해야 함
        receiver.transfer(amount); //receiver에게 amount만큼 계좌이체를 해야함 
    }
    function getBalance() public view returns(uint, uint) { //상태를 읽어오니 view를 하고, 잔고 확인하기
        return (address(this).balance, balanceOf[owner]); //컨트랙과 오너의 잔고를 출력
    }
    function getBalanceOf(address addr) public view returns (uint) {
        return balanceOf[addr]; //특정 잔고를 읽음 
    }
    modifier onlyOwner {
        require(msg.sender == owner);
        _; //호출하는 코드
    }
}
