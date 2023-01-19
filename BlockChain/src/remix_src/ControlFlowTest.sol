pragma solidity ^0.6.0;

contract ControlFlowTest {
    uint sum;  //최종 sum
    constructor() public {
        sum = 0;
    }
    function doForLoop() public { //지역변수로 쓰겠다 
        //sum = 0; 
        uint sumLocal = 0; //update가 계속 일어남. 이는 메모리변수를 쓰는 것.
        for(uint i = 0; i < 1001; i++) { 
            sumLocal += 1;
        }
        sum = sumLocal; //최종 sum, 최종적으로 state variable을 1번 update하고있음
    } 
    
    function doForLoop2() public {  //전역변수로 쓰겠다
        sum = 0; //초기화, 메모리변수에 쓰고있음
        //uint sumLocal = 0;
        for(uint i = 0; i < 1001; i++) {
            //sumLocal += i;
            sum += 1; //for문내에서 update를 계속 하고있음 
        }
        //sum = sumLocal;
    }
    function getSum() view public returns(uint) { //합계를 조회하는 함수
        return sum;
    }
}