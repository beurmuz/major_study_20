pragma solidity ^0.6.0;

contract MembersMap {
    struct Member {
        uint id;
        string name;
    }
    //bidrectional map
    mapping(address=>Member)  memberMap; //멤버매핑, 구조는 키를 address로, address를 넣으면 Member가 반환됨 
    mapping(uint=>address) addressById; //키를 uint(Id)로, 이를 입력하면 반환은 address가 됨
    //Id를 넣으면 멤버를 구할 수 있게 됨
    mapping(string=>address) addressByName; //string(name)에 대한 것, 이를 넣으면 address가 반환됨.
    function addMember (uint _id, string memory _name) public {
        //Member에 있는 Id, 이름을 받음
       Member memory m=Member(_id, _name); //멤버를 만들고, local에서 만들어지니 memory를 붙임
       memberMap[msg.sender]=m; //키          를 msg.sender로 하고, valaue를 m로 넣어주는 것 
       //saving into a bidiretional map to get address by id
       addressById[_id]=msg.sender; //Id로 member를 찾아올 수 있게 함. key값을 msg.sender, 주소값으로 해줌
       //saving into a bidiretional map to get address by name
       addressByName[_name]=msg.sender; //이름으로 member를 찾아옴 msg.sender로 키값을 잡음
    }
    //get Member by id, 반복문을 쓰지 않고 id를 가져오기 
    function getMemberById(uint _id) view public returns(uint, string memory) {
        Member memory my = memberMap[addressById[_id]];
        //Id를 가지고 주소를 구하기. [_id]를 넣으면 주소 값이 구해지고, 주소값으로 member값을 구하는 것은 memberMap.
        // Id를 넣어서 address를 구하고, 이 address가 들어가서 멤버값이 반환된다.
        return (my.id, my.name); //따로따로 출력할 수밖에 없음
    }
    // get address (not Member) by name
    function getMemberAddressByName(string memory _name) public view returns(address) {
        return addressByName[_name];
    }
    function getMember(address addr) view public returns (uint, string memory) {
        Member memory m=memberMap[addr];
        //주소값이 들어가서, 멤버값이 반환되는 것은 memberMap. 
        // 멤버맵넣고, 입력으로 들어온 addr를 넣게되면 멤버값이 반환 됨
        return (m.id, m.name); // 
    }
}