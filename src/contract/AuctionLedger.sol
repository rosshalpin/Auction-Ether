pragma solidity ^0.4.25;

contract AuctionLedger {
    address[] public auctions;
    address public thisHash = this;
    function addAddress(address auctionAddress) external {
        auctions.push(auctionAddress);
    }
}