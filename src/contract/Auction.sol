pragma solidity ^0.4.25;
/// @title Auction Contract
/// @author Ross Halpin
/// @notice This contract is for the creation of an Auction

interface Ledger{
  function addAddress(address auctionAddress) external;
}

contract Auction {
    Ledger public auctionLedger;
    
    address public auctionManager;
    address public auctionSeller;
    
    address public highestBidder;
    uint public highestBid;
    mapping(address => uint) public balanceOf; // Contains the current balance of un-withdrawn bid at address
    
    uint public initialValue;
    uint public minIncrementValue;
    string public ipfsHash;
    uint public auctionEnd;
    uint public auctionBegin;
    
    address[] private bidderLog; // Address at bidderLog[N] will have a corresponding bid value at bidLog[N]
    uint[] private bidLog;
        
    constructor(uint _initialValue, uint _auctionEnd, string _ipfsHash) public payable {
        require(msg.value >= 0.0001 ether, "You must pay the advertisement fee");
        require(_auctionEnd >= now + 1 weeks, "You must pay the advertisement fee");
        auctionLedger = Ledger(0x9d7c1161d3726313627bc4cdfa0c7acbc87efed5);
        auctionLedger.addAddress(this);
        
        auctionManager = 0xe3E36c15027Be15AEaBF2a71F6920a9429aa8937;
        //auctionManager = 0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C;
        
        auctionManager.transfer(msg.value);
        auctionSeller = msg.sender;
        auctionEnd = _auctionEnd;
        auctionBegin = now;
        
        initialValue = _initialValue * 1 ether; // Converting ether base 10 value to wei.
        minIncrementValue =  1 ether;
        ipfsHash = _ipfsHash;
    }
    
    function withdrawBid() external payable {
        require(msg.sender != highestBidder);
        uint amount = balanceOf[msg.sender]; // This is the balance to be withdrawn
        balanceOf[msg.sender] = 0;  // Balance must be set to zero before transfer
        msg.sender.transfer(amount);
    }

    function placeBid() external payable {
        require(balanceOf[msg.sender] == 0, "You must withdraw your previous bid");
        require(msg.value >= initialValue, "Reserve value has not been met");
        require(msg.value >= balanceOf[highestBidder]+minIncrementValue, "Minimum increment not met");
        require(now < auctionEnd, "auction has ended");
        
        balanceOf[msg.sender] += msg.value; // Update balance of msg.sender
        highestBidder = msg.sender; // Set bidder to current highest bidder
        highestBid = msg.value; // Set the current highest bid
        bidderLog.push(highestBidder); // Log bidder and the value below.
        bidLog.push(highestBid);
    }
    
    function withdrawEscrowBid() external {
        require( (now > auctionEnd + 26 weeks && msg.sender == auctionSeller) || msg.sender == auctionManager, "Authorised users must wait 26 weeks to withdraw escrow fee");
        uint amount = balanceOf[highestBidder]; // This is the balance to be withdrawn
        balanceOf[highestBidder] = 0;  // Balance must be set to zero before transfer
        msg.sender.transfer(amount);
    }
    
    function getBidderLog() external view returns(address[]){
        return bidderLog;
    }
  
    function getBidLog() external view returns(uint[]){
        return bidLog;
    }
      
    function destroy() external {
        require(msg.sender == auctionManager);
        selfdestruct(msg.sender);
    }
    
}