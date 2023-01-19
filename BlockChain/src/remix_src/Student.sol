pragma solidity ^0.5.0;

contract Student{
    struct InfoStudent{
        uint num; // 학번
        string name; // 이름
        bool isEnrolled; // 등록여부
    }
    InfoStudent[] students; // 배열 사용을 위해 배열 선언

    // 입력 함수
    function insert(uint n, string memory sn, bool e) public {
        students.push(InfoStudent(n, sn, e));
    }

    // 첫 데이터 조회
    function getFirstStudent() public view returns(uint, string memory, bool){
        return (students[0].num, students[0].name, students[0].isEnrolled);
    }

    // 검색 함수
    function findBy(uint8 index) view public returns(uint, string memory, bool){
        return (students[index].num, students[index].name, students[index].isEnrolled);
    }

    // 삭제 함수
    function remove(uint index) public {
        for(uint i = index; i < students.length-1; i++) {
            students[i] = students[i+1];
        }
        delete students[students.length-1];
        students.length--;
    }


    // 배열크기 조회 함수
    function getLength() view public returns(uint) {
        return students.length;
    }

    // 삭제 함수
    function pop() public{
        students.pop();
    }
}
