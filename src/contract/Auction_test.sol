pragma solidity ^0.4.25;

import "remix_tests.sol"; // this import is automatically injected by Remix.
import "./auction.sol";

contract auction_test {
    Auction auctionToTest;
    uint public initialValue = 1;
    uint public auctionEnd = 1554076800;
    string public ipfsHash = "HelloWorld";
    
    /*
    function beforeAll () public payable {
        auctionToTest = (new Auction).value(msg.value)(initialValue,auctionEnd,ipfsHash);
    }*/
    
    function beforeAll () public {
        auctionToTest = new Auction(initialValue,auctionEnd,ipfsHash);
    }
    
    function check_1_InitialValues() public {
        Assert.equal(uint(auctionToTest.initialValue()), uint(1 ether),"initialValue set in constructor should return set value");
        Assert.equal(uint(auctionToTest.auctionEnd()), uint(auctionEnd),"auctionEnd set in constructor should return set value");
        Assert.equal(string(auctionToTest.ipfsHash()), string(ipfsHash),"ipfsHash set in constructor should return set value");
    }
    
    mapping(address => uint) public balanceOf;
    
    function check_2_PlaceBid() public payable {
        (auctionToTest.placeBid).value(msg.value)();
        balanceOf[msg.sender] = msg.value;
    }
    
    function check_3_Balance_Logs() public {
        Assert.equal(uint(auctionToTest.getBalance()), balanceOf[msg.sender], "balance of msg.sender should be equal to msg.value");
        uint N = auctionToTest.getBidderLog().length;
        Assert.equal(address[](auctionToTest.getBidderLog())[N-1], address(this), "check bidderLog has been updated");
        Assert.equal(uint[](auctionToTest.getBidLog())[N-1] , balanceOf[msg.sender], "check bidLog has been updated");
    }
    
    function check_4_HighestBidder()  public {
        Assert.equal(address(auctionToTest.highestBidder()), address(this), "check bidder is highest bidder");
        Assert.equal(uint(auctionToTest.highestBid()), balanceOf[msg.sender], "check bid is highest bid");
    }
    
    
    
    
    
}