import React, { Component } from "react";
import "./App.css";
import Web3 from "web3";
import AuctionCard from "./AuctionCard.js";
import contract from "./contract";
import AppBar from "./AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";

const request = require("request");

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const web3 = new Web3(window.ethereum);

class App extends Component {
  state = {
    cardArray: [],
    web3: null,
    auctions: []
  };

  async componentDidMount() {
    await this.enableWeb3();
    await this.handleContracts();
  }

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

  handleGetIPFS = async (auctionMediaURL, address) => {
    await request(auctionMediaURL, { json: true }, (err, res, body) => {
      if (err) {
        return console.log(err);
      } else {
        var nAuction = {
          media: body,
          address: address
        };
        var newArray = this.state.auctions;
        newArray.push(nAuction);
        this.setState({ auctions: newArray });
      }
    });
  };

  handleContracts = async () => {
    try {
      var web3_ = this.state.web3;
      var ledgerAbi = contract.ledger;
      var ledger = new web3_.eth.Contract(
        JSON.parse(ledgerAbi),
        "0x78cDF669DE8fF8b72e6B1843bE8637dE1aCc9bc9"
      );
      var auctions = await ledger.methods
        .getAuctions()
        .call({ from: web3_.eth.getAccounts[0] })
        .then(function(result) {
          return result;
        });
      for (var address of auctions) {
        var auctionAbi = contract.interf;
        var auction = new web3_.eth.Contract(JSON.parse(auctionAbi), address);
        var auctionIPFS = await auction.methods
          .ipfsHash()
          .call({ from: web3_.eth.getAccounts[0] })
          .then(function(result) {
            return result;
          });
        var auctionMediaURL = "https://gateway.ipfs.io/ipfs/" + auctionIPFS;
        await this.handleGetIPFS(auctionMediaURL, address);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <AppBar web3={this.state.web3} contract={contract} />
          <div style={{ padding: "15px" }}>
            {this.state.auctions.map((content, x) => {
              return <AuctionCard data={content} key={"card" + x} />;
            })}
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
