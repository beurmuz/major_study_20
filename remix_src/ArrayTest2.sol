pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract ArrayTest2 {
    string[3] cities1=["Seoul", "Sydney", "Tokyo"];  //문자열 고정배열, 데이터를 넣고 초기화함
    string[] cities2 = new string[](2);  //동적배열로 cities2를 만들고, new명령어로 갯수 할당
    string[] cities3;  //문자열 배열 선언
    int[5] mathMarks;  //점수와 관련된 것, 여기서 70점 이상을 걸러낼 것
    uint[3][] marks=[[100, 80, 95],[20,30,40]];  //다차원 배열 선언 [3][2]

    function getDynamicArrMemory() pure public returns(uint[] memory) { //uint[]배열로 반환, 매개변수에서 반환하는 것이니 memory를 반드시 적어야 함 
        uint[] memory num=new uint[](3);  //dynamic, 동적 배열이나 크기도 정하고 데이터도 다 넣었음
        for (uint i=0; i<num.length; i++) //초기화 가, length까지 반복함
            num[i]=i;       //push() not allowed for array memeory, i번째에 i를 넣고 반환
        return num;
    }
    //string is a dynamic array itself, which can not be returned.
    //function setArrMemory() view public returns(string[] memory) { //반환이 있으면 returns를 써주어야 함 but문자열일때는 string이 그 자체로 동적배열이라, 반환이 되지 않음. 때문에 지워야 함
    function getStringDynamicArrMemory() pure public { //반환이 되지 않을 것
        //array storage not allowed, storage는 우측의 로컬에서 생성되고 있기 때문에 memory를 써야 함 
        //error: string[2] storage places = ["9000", "Sydney"];
        string[2] memory places = ["9000", "Sydney"]; //고정배열로 선언. 
        //array memory push not allowed
        //places.push("Seoul");
        places[0]="Seoul"; //특정 요소를 잡아서 data를 넣을 수는 있음  
        //return places; //데이터 반환. but쓸 수 없음
    }
    /*returning 'string[] storage' is not allowed
    function getCities1_() view public returns(string[] memory) {
        return cities1;  //can not return stoarge var. 
    }*/
    function getCities1() view public returns(string memory) { //특정요소만 반환하는 함수, 위에cities를 선언해주었으니 pure가 아닌 view사용, string도 참조타입이니 memory로 반환
        return cities1[0];
    }
    function getCities1Length() view public returns(uint) { return cities1.length; }
    function setCities23() public { //2,3번째를 editing하니까 이렇게 주고,
        cities2[0]="New York";
        cities2.push("Busan"); //동적배열이니 push사용 가능
        cities3.push("New York"); //동적배열이니 push사용 가능 
        cities3.push("Beijing");
    }
    //dynamic array return needs "pragma experimental ABIEncoderV2;"
    function getCities2() view public returns(string[] memory){
        return cities2; //동적배열을 반환 하려면 함수를 이렇게 또 만들어야 함 
    }
    function setMathMarks() public {
        mathMarks=[100,60,95,50,80]; //70점이상이면 100,95,80만 반환할 것
    }


    //run setMathMarks() beforehand
   /* function getMathAbove70_() view public returns(int[] memory) {
        // size is not allocated yet -> invalid opcode error
        int[] memory mathAbove70; //local에서 써야 gas비용이 적게 듦
        uint counter = 0; //mathAbove70을 count하기 위한 변수선언
        for(uint8 i=0;i<mathMarks.length;i++)
            if(mathMarks[i]>70) { //점수가 70점 이상이 되면, 
                mathAbove70[counter] = mathMarks[i]; //mathMarks의 인덱스 i번째의 점수를 mathAbove70[counter]에 넣음 
                //mathAbove70.push(mathMarks[i]);
                counter++;
            }
        return mathAbove70;
    }*/ //컴파일은 되지만 log에서 오류가 발생. 동적배열의 크기를 정하지 않고 값을 할당하니까 안되는 것. mathMarks에서 70점 이상이 몇개인지를 센 후에, 그 크기를 동적배열에 할당하고 값을 넣어야 함 


    //run setMathMarks() beforehand
    function getMathAbove70() view public returns(int[] memory) { //참조타입이니 memory로
        //compute lengthOfMathAbove70
        uint8 counter=0;
        uint8 lengthOfMathAbove70=0;
        for(uint8 i=0;i<mathMarks.length;i++)
            if(mathMarks[i]>70) counter++; //70점이 넘을 경우 count를 증가시킴 
        lengthOfMathAbove70=counter;
        //move math marks above 70
        int[] memory mathAbove70=new int[](lengthOfMathAbove70); // 크기를 위의 counter에 해당하는 크기만큼으로 정해주어야 함 
        counter=0;
        for(uint i=0;i<mathMarks.length;i++) {
            if(mathMarks[i]>70) {
                mathAbove70[counter]=mathMarks[i]; //그리고는 값 할당 후 반환해야 함 
                counter++;
            }
        }
        return mathAbove70;
    }
    function updateMarks() public returns(uint[3][] memory){
        marks[0][0]=90;
        return marks;
    }
    function getMarksArr() view public returns(uint[3][] memory) { //다차원배열로 반환. 선언과 같은 형태, 크기, 모양으로 data type을 정해서 반환해야 함 
        return marks;
    }
    function getMarksLength() view public returns(uint) {
        return marks.length;
    }
}