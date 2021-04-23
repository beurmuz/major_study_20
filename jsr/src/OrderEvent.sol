
pragma solidity ^0.6.0;

contract OrderEvent {
    uint unitPrice = 10; // 가격
    event OrderLog(string);
    event OrderLog(bytes2 _itemId, uint _value); // 주문하는 품목의 id
    event OrderLog(uint256 timestamp);
    event OrderLog(address indexed _from, bytes2 _itemId, uint indexed _value);

    function order(bytes2 _itemId, uint quantity) public payable { // item ID, 주문량을 매개변수로 받음. 지급이 일어나므로 payable
        uint256 orderTime = now; // 주문시간
        uint256 orderAmount = quantity * unitPrice; // 금액 구하기
        require(msg.value == orderAmount); // 입금 금액이 orderAmount와 같도록
        emit OrderLog("Ordered"); // String에 대한 것
        emit OrderLog(orderTime); // TimeStamp
        emit OrderLog(msg.sender, _itemId, msg.value);
    }
}
