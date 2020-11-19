pragma solidity ^0.5.0;
contract Students2 {
    struct Student {
        uint num;
        string name;
        bool isEnrolled;
    }
    Student[] students;
    function insert(uint n, string memory sn, bool e) public {
        students.push(Student(n,sn,e));
    }
    function getFirstStudent() public view returns(uint, string memory, bool) {
        return (students[0].num, students[0].name, students[0].isEnrolled);
    }
    function findBy(uint8 index) view public returns(uint, string memory, bool) {
        return (students[index].num, students[index].name, students[index].isEnrolled);
    }
    function remove(uint index) public {
        delete students[index];
        students[index].num=students[students.length-1].num;
        students[index].name=students[students.length-1].name;
        students[index].isEnrolled=students[students.length-1].isEnrolled;
    }
    function getLength() view public returns(uint){
        return students.length;
    }
    function pop() public {
        students.pop();
    }
}