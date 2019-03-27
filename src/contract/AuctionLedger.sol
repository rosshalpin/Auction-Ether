pragma solidity ^0.4.25;

contract AuctionLedger {
	address[] private auctions;
	address private creator;
	
	constructor() public{
			creator = msg.sender;
	}
	function addAddress(address auctionAddress) external {
	auctions.push(auctionAddress);
	}
	
	function getAuctions() external view returns(address[]){
	return auctions;
	}
		
	function reset() external { // for testing purposes
	    require(msg.sender == creator);
	    delete auctions;
	}
}