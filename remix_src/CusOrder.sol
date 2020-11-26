pragma solidity ^0.5.0;

//contract 1
contract Customer { 
    struct Infomation{
        uint id;
        string name;
        string telephone;
        string location; 
        address locate;
        uint mileage;
        string ourcustomer;
    }
    Infomation[] info;
    mapping(address=>Infomation) Infomap; // key : address, value : Infomation

    function setcustomer(uint _id, string memory _name, string memory _telephone, string memory _location, address _locate) public {
        for(uint i=0; i<info.length; i++) {
            require(info[i].id!=_id); 
        }
        uint _mileage = 0; 
        string memory _ourcustomer= "true";
        info.push(Infomation(_id, _name, _telephone, _location, _locate, _mileage, _ourcustomer)); 
        mapinfo(_locate);
    }
    
    function mapinfo(address _locate) public {
        for(uint i=0;i<info.length;i++){
            Infomap[_locate]=info[i];
        }
    }
    
    function getcustomer(uint index) public view returns(uint, string memory, string memory, string memory, address, uint, string memory){
        return (info[index].id, info[index].name, info[index].telephone, info[index].location, info[index].locate, info[index].mileage, info[index].ourcustomer);
    }
    
   /*function addmileage(uint _index, uint _val) public{
        uint mileage = _val/100;
        info[_index].mileage+=mileage;
    }*/
    
    function whereLocation(address _locate) public view returns(string memory){
        return (Infomap[_locate].location);
    }
}

//contract 2
contract Order {
    Customer c;
    constructor() public {
        c = new Customer();
    }
    
    struct Infomation{
        uint id;
        string name; 
        string telephone;
        string location; 
        address locate;
        uint mileage;
        string ourcustomer;
    }
    
    struct List{
        uint orderID;
        string ProductName; 
        uint ProductNum; 
        uint price; 
        uint256 timestamp; 
        string condition;
        string place; 
        string orderstate; 
        address locate;
    }
    List[] details; 

    mapping(address=>Infomation) map; 
    mapping(address=>List) listmap;
    mapping(uint=>address) addressById;
    
    mapping (address => uint) balanceOf;
    function deposit(uint amount, address _locate) payable public {
        balanceOf[_locate] += amount;
    }
    
    function setOrder(uint _orderID, string memory _ProductName, uint _ProductNum, uint _price, address _locate) payable public{
        uint256 timestamp2 = now;
        string memory condition2 = "Ordered!";
        string memory place2 = c.whereLocation(_locate);
        string memory orderstate2 = "True";
        details.push(List(_orderID, _ProductName, _ProductNum, _price, timestamp2, condition2, place2, orderstate2, _locate));
        addressById[_orderID]=_locate;
        mapdetails(_locate); 
    }
    
    function mapdetails(address _locate) public{
        for(uint i=0; i<details.length; i++){
            listmap[_locate]=details[i];
        }
    }

   /* function savemileage(uint index, uint _price) public returns (uint){
        c.addmileage(index, _price);
    }*/
    
    function importCustomer (uint _id, string memory _name, string memory _telephone, string memory _location, address _locate) public {
        c.setcustomer(_id, _name, _telephone, _location, _locate);
    } 
    
    function getOrder(uint index) public view returns(string memory){
        string memory whereplace = details[index].place;
        return (whereplace);
    }
    
    function contractBalance() public view returns (uint){
        return address(this).balance;
    }
    
    function OrderByAddr(address addr) public view returns (uint , string memory, string memory, string memory){
        uint _id = listmap[addr].orderID;
        string memory _productname = listmap[addr].ProductName;
        string memory _condition = listmap[addr].condition;
        string memory _palce = listmap[addr].place;
        return (_id, _productname, _condition, _palce);
    }
    
    function OrderById(uint guestid) public view returns (uint, string memory, string memory, string memory){
        List memory li = listmap[addressById[guestid]];
        return (li.orderID, li.ProductName, li.orderstate, li.place);
    }
}