/*
pragma solidity ^0.4.25;

contract MyContract {

    uint startTime;
    function tmp() public view returns(uint){
        require(startTime != 0);
        return (now - startTime)/(1 seconds);
    }
    function callThisToStart() external {
        startTime = now;
    }
    function callThisToStop() external {
        startTime = 0;
    }
    function doSomething() external view returns (uint){
        return tmp();
    }

}
*/
pragma solidity ^0.4.25;

contract MyContract {

    uint internal startTime = now;
    string public message;
    uint public timeElapsed;

    function tmp() public {
        require(startTime != 0);
        timeElapsed = (now - startTime)/(1 seconds);
        if(timeElapsed > 100){
            startTime = 0;
            message = 'halloween';
        }
    }


}
