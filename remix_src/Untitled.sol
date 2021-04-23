pragma solidity ^0.5.0;

contract Customer {
    struct Member { //Infomation
        uint userid; //id
        string name; //name
        string callnumber; //telephone
        string userdes; //location
        uint point; //mileage
        string usertf; //ourcustomer
        address addr; //locate
    }
    Member[] mem; //info
    mapping(address=>Member) memberMap1; //InfoMap

    function getTxOriginMsgSender() view public returns(address, address) {
        return(tx.origin, msg.sender);
    }
    function setCustomer (uint _id, string memory _name, string memory _callnumber, string memory _userdes, address _addr) public {
        for(uint i=0;i<mem.length;i++){
            require(mem[i].userid!=_id);
        }
        uint _point = 0;
        string memory _usertf = "true";
        mem.push(Member(_id, _name, _callnumber, _userdes, _point, _usertf, _addr));
        for(uint i=0;i<mem.length;i++){
            memberMap1[_addr]=mem[i];
        }
    }
    
    function getCustomer(uint _number) public view returns(uint _id, string memory _name, string memory _callnumber, string memory _userdes, uint _point, string memory _usertf, address _addr){
        uint getCusId = mem[_number].userid;
        string memory getCusName = mem[_number].name;
        string memory getCusNum = mem[_number].callnumber;
        string memory getCusDes = mem[_number].userdes;
        uint getCusPoint = mem[_number].point;
        string memory getCustf = mem[_number].usertf;
        address getCusAddr = mem[_number].addr;
        return (getCusId, getCusName, getCusNum, getCusDes, getCusPoint, getCustf, getCusAddr);
    }
    function addPoint(uint _number, uint _cost) public {
        uint point = _cost/100;
        mem[_number].point+=point;
    }
    function getDestination(address _addr) public view returns(string memory){
        return (memberMap1[_addr].userdes);
    }
    
}

contract Order {
    Customer c;
    constructor() public {
        c = new Customer();
    }
    struct Member {
        uint userid;
        string name;
        string callnumber;
        string userdes;
        uint point;
        string usertf;
        address addr;
    }
    struct Orderlist {
        uint orderid;
        string product;
        uint pronum;
        uint cost;
        uint256 timestamp;
        string state;
        string destination;
        string ordertf;
        address addr;
    }
    mapping(address=>Orderlist) orderMap;
    mapping(address=>Member) memberMap;
    mapping(uint=>address) addressByOrderid;
    
    mapping (address => uint) balanceOf;
    Orderlist[] or;//List[] details
    
    function setCustomer (uint _id, string memory _name, string memory _callnumber, string memory _userdes, address _addr) public {
        c.setCustomer(_id, _name, _callnumber, _userdes, _addr);
    }
    function setOrder (uint _orderid, string memory _product, uint _pronum, uint _cost, address _addr) payable public {
        uint256 _timestamp=now;
        string memory _state="Ordered";
        string memory _ordertf="true";
        string memory _destination=c.getDestination(_addr);
        or.push(Orderlist(_orderid, _product, _pronum, _cost, _timestamp, _state, _destination, _ordertf, _addr));
        addressByOrderid[_orderid]=_addr;
        for(uint i=0;i<or.length;i++){
            orderMap[_addr]=or[i];
            
        }
    }
    function getOrder(uint _number) public view returns(string memory){
        string memory getDes = or[_number].destination;
        return (getDes);
    }
    function deposit(uint amount, address addr) payable public {
        balanceOf[addr] += amount;
    }
    function getPoint(uint _number, uint _cost) public returns (uint){
        c.addPoint(_number, _cost);
    }
    function getOrderByAddr(address addr) public view returns (uint , string memory, string memory, string memory){
        return (orderMap[addr].orderid, orderMap[addr].product, orderMap[addr].state, orderMap[addr].destination);
    }
    function getOrderById(uint _id) public view returns (uint, string memory, string memory, string memory){
        Orderlist memory my = orderMap[addressByOrderid[_id]];
        return (my.orderid, my.product, my.state, my.destination);
    }
    function getBalThis() public view returns (uint){
        return address(this).balance;
    }
}




