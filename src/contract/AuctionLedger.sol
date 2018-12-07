pragma solidity ^0.4.25;

contract AuctionLedger {
    address[] private auctions;
    function addAddress(address auctionAddress) external {
        auctions.push(auctionAddress);
    }
    
    function getAuctions() external view returns(address[]){
        return auctions;
    }
}