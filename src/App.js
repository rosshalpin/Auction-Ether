import React, { Component } from "react";
import "./App.css";
import Web3 from "web3";
import AuctionCard from "./AuctionCard.js";
import contract from "./contract";
import AppBar from "./AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from '@material-ui/core/Button';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const request = require("request");
const web3 = new Web3(window.ethereum);

class App extends Component {
  state = {
    cardArray: [],
    auctions: [],
		addresses: [],
		checked: false,
		ledgerAbi: '',
		ledger: '',
    exchange: 0
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
			var oldState = this.state.addresses;
			this.setState({ addresses: auctions });
			if(oldState.toString() !== this.state.addresses.toString()){
				this.setState({ auctions: [] });
				await this.handleContracts();
			}
	}

  handleContracts = async () => {
    try {
      for (var address of this.state.addresses) {
        var auctionAbi = contract.interf;
        var auction = new web3.eth.Contract(JSON.parse(auctionAbi), address);
        var auctionIPFS = await auction.methods
          .ipfsHash()
          .call({ from: web3.eth.getAccounts[0] })
          .then(result => result);
        var auctionMediaURL = "https://gateway.ipfs.io/ipfs/" + auctionIPFS;
        await this.handleGetIPFS(auctionMediaURL, address);
      }
    } catch (e) {
      console.log(e);
    }
  };
	
	handleGetIPFS = async (auctionMediaURL, address) => {
    await request(auctionMediaURL, { json: true }, (err, res, body) => {
      if (err) {
        return console.log(err);
      } else {
        var nAuction = {
          media: body,
          address: address
        };
				this.setState({
					auctions: [...this.state.auctions, nAuction]
				})
      }
    });
  };
  
  handleSort = () => {
    if(this.state.auctions.length > 1){
      let aucSort = this.state.auctions;
      aucSort.sort((a, b) => (parseInt(a.media.amount) > parseInt(b.media.amount)) ? 1 : -1)
      this.setState({ auctions: [] });
      this.setState({ auctions: aucSort });
    }
  }
  
  render() {
		const {web3, auctions} = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <AppBar web3={web3} contract={contract} sort={this.handleSort} />
          <div style={{ padding: "15px" }}>
            {auctions.map((content, x) => <AuctionCard key={"card" + x} data={content} ex={this.state.exchange} />
            )}
          </div>
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
