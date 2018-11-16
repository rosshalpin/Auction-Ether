pragma solidity ^0.4.25;
/// @title Auction Contract
/// @author Ross Halpin
/// @notice This contract is for the creation of an Auction
contract Auction {
    address public auctionManager;
    address public auctionSeller;
    address public highestBidder;
    uint public highestBid;
    mapping(address => uint) internal balanceOf; // Contains the current balance of un-withdrawn bid at address
    uint public reserveValue;
    uint public minIncrementValue;
    uint public auctionBegin;
    uint public auctionEnd;
    bool public auctionHasEnded;
    string public ipfsHash;
    address[] public bidderLog; // Address at bidderLog[N] will have a corresponding bid value at bidLog[N]
    uint[] public bidLog; // Solidity doesnt support multiple data types in arrays, must use two separate arrays to log bids
    /// @notice This constructor initialises the parameters of the auction as set by the manager
    /// @param _reserveValue This is the reserve value of the auction
    /// @param _minIncrementValue This is the minimum value that bids can be incremented
    /// @param _auctionDuration Duration of auction in seconds(Unix time)
    /// @param _auctionSeller Address of auction seller
    constructor(uint _reserveValue, uint _minIncrementValue, uint _auctionDuration, address _auctionSeller, string _ipfsHash) public payable {
        require(msg.value > 0.001 ether, "You must pay the advertisement fee");
        reserveValue = _reserveValue * 1 ether; // Converting ether base 10 value to wei.
        minIncrementValue = _minIncrementValue * 1 ether;
        auctionBegin = now; // 'now' is an alias for block.timestamp(Block time or Time when mined)
        auctionEnd = auctionBegin + _auctionDuration;
        auctionManager = 0x7657bC53995C2B55104E389a06d28f1Bf1237AA0;
        auctionSeller = _auctionSeller;
        auctionHasEnded = false;
        ipfsHash = _ipfsHash;
    }
    /// @notice To withdraw funds when outbid
    /// @dev Withdrawal pattern(balance set to zero before withdrawal) used here to prevent re-entrency attack
    /// 'external' saves gas over using public, function is only ever called externally
    function withdrawBid() external {
        assert(msg.sender != highestBidder);
        uint amount = balanceOf[msg.sender]; // This is the balance to be withdrawn
        balanceOf[msg.sender] = 0;  // Balance must be set to zero before transfer
        msg.sender.transfer(amount);
    }
    /// @notice To bid on auction, requires ether payment
    /// @dev 'payable' Function requires ether payment
    function placeBid() external payable {
        require(auctionHasEnded == false, "Auction has ended"); // Check if Auction has ended
        require(balanceOf[msg.sender] == 0, "You must withdraw your previous bid");
        require(msg.value >= reserveValue, "Reserve value has not been met");
        require(msg.value >= balanceOf[highestBidder]+minIncrementValue, "Minimum increment not met");
        balanceOf[msg.sender] += msg.value; // Update balance of msg.sender
        highestBidder = msg.sender; // Set bidder to current highest bidder
        highestBid = msg.value; // Set the current highest bid
        bidderLog.push(highestBidder); // Log bidder and the value below.
        bidLog.push(highestBid);
    }
    /// @notice For manager to end the auction
    /// @dev Note, the 'now' in the constructor was the blocktime of the transaction containing the contract.
    /// The 'now' in endAuction() is the blocktime of the transaction containing this function call.
    /// Therefore we can then use the two blocktimes to check how much time has passed.
    function endAuction() external {
        assert(msg.sender == auctionManager);
        uint timeElapsed = (now - auctionBegin)/(1 seconds);
        if ((auctionBegin + timeElapsed) > auctionEnd ) {
            auctionHasEnded = true;
        }
        require(auctionHasEnded == true, "Auction has not ended");
		/// beneficiary.send(balanceOf[highestBidder]);
    }
}
