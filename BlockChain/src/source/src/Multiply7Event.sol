
pragma solidity ^0.5.0;

contract Multiply7Event{
        event Print(
        address indexed param1,//param1, who paged?
        uint param2,//uint256 timestamp,//param2, when print?
        uint param3//param3, operate result
    );
    function multiply (uint param4) public{ //param4, and multi7
        emit Print(msg.sender, now, 7*param4);
        //return (input*7);
    }
}
