import React, { Component } from "react";
import "./App.css";
import Web3 from "web3";
import AuctionCard from "./AuctionCard.js";
import contract from "./contract";
import AppBar from "./AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from '@material-ui/core/Grid';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const request = require("request");
const web3 = new Web3(window.ethereum);
var invert = false;

class App extends Component {
  state = {
    cardArray: [],
    auctions: [],
		addresses: [],
		checked: false,
		ledgerAbi: '',
		ledger: '',
    exchange: 0,
    web3: null
  };

  componentDidMount = async () => {
    this.handleExchangeRate();
    await this.enableWeb3();
		this.setState({ ledgerAbi: contract.ledger }); 
		var ledger = new web3.eth.Contract(
			JSON.parse(this.state.ledgerAbi),
			"0x9d7c1161d3726313627bc4cdfa0c7acbc87efed5"
		);
		this.setState({ledger: ledger});
		setInterval(async()=>{await this.getAddresses();}, 1000);
  }
  
  handleExchangeRate = async() => {
    await request("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR", { json: true }, (err, res, body) => {
      if (err) {
        return console.log(err);
      } else {
        this.setState({exchange: body});
        console.log(body);
      }
    });
  };

  enableWeb3 = async () => {
    if (typeof web3 !== "undefined") {
      try {
        await window.ethereum.enable();
      } catch (e) {
        console.log("You must enable connection to use this app");
        await window.ethereum.enable();
      }
      this.setState({ web3: web3 });
    } else if (window.web3) {
      this.setState({ web3: window.web3 });
    } else {
      console.log("You must use metamask to interact with this website");
      this.setState({ web3: null });
    }
  };
	
	getAddresses = async () => {
			var auctions = await this.state.ledger.methods.getAuctions()
				.call({from: web3.eth.getAccounts[0]})
				.then(result => result);
			var oldAddresses = this.state.addresses.slice(0);
      this.setState({ addresses: auctions });
      var newAddresses = this.state.addresses.slice(0);
      
      let difference = oldAddresses
                 .filter(x => !newAddresses.includes(x))
                 .concat(newAddresses.filter(x => !oldAddresses.includes(x)));  // https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript    
      
      if(oldAddresses.toString() !== this.state.addresses.toString() && this.state.auctions.length !== auctions.length){
        await this.handleContracts(difference);
      }
	}

  handleContracts = async (addresses) => {
    try {
      for (var address of addresses) {
        var auctionAbi = contract.interf;
        var auction = new web3.eth.Contract(JSON.parse(auctionAbi), address);
        var auctionIPFS = await auction.methods
          .ipfsHash()
          .call({ from: web3.eth.getAccounts[0] })
          .then(result => result);
        var auctionMediaURL = "https://gateway.ipfs.io/ipfs/" + auctionIPFS;
        await this.handleGetIPFS(auctionMediaURL, address, auction);
      }
    } catch (e) {
      console.log(e);
    }
  };
	
	handleGetIPFS = async (auctionMediaURL, address, auction) => {
    await request(auctionMediaURL, { json: true }, (err, res, body) => {
      if (err) {
        return console.log(err);
      } else {
        var nAuction = {
          media: body,
          address: address,
          auctionFunc: auction,
          contract: contract,
        };
				this.setState({
					auctions: [...this.state.auctions, nAuction]
				}) 
      }
    });
  };

  handleSort = async () => {

    if(this.state.auctions.length > 1){
      var aucSort = this.state.auctions.slice(0);
      if(invert === false){
        aucSort.sort((a, b) => (parseInt(a.media.amount) > parseInt(b.media.amount)) ? 1 : -1);
      }else{
        aucSort.sort((a, b) => (parseInt(a.media.amount) > parseInt(b.media.amount)) ? -1 : 1);
      }
      await this.setState({ auctions: aucSort });
      invert = !invert;
    }

  }
  
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <AppBar web3={web3} contract={contract} sort={this.handleSort} ex={this.state.exchange} />
          <Grid style={{ marginTop: "60px" }} container justify="center" spacing={16}>
            {this.state.auctions.map((content, x) => <AuctionCard key={content.address} data={content} ex={this.state.exchange} web3={this.state.web3}/>
            )}
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
export default App;

/*
{this.state.cardArray.map((card, x) => {
	return <this.AuctionCard key={"card"+x}/>;
})}
*/
