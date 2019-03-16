import React, { Component } from "react";
import "./App.css";
import {web3} from "./api/web3Provider.js";
import AuctionCard from "./components/AuctionCard.js";
import contract from "./contract";
import AppBar from "./components/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from '@material-ui/core/Grid';
import exchangeAPI from './api/exchangeAPI';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const request = require("request");

var invert = false;

export class App extends Component {
  state = {
    cardArray: [],
    auctions: [],
		addresses: [],
		checked: false,
		ledger: contract.ledger,
    exchange: 0,
    web3: null,
  };

  componentDidMount = async () => {
    var rate = await exchangeAPI();
    this.setState({exchange: rate})

		setInterval(async()=>{await this.getAddresses();}, 1000);
  }
  
	getAddresses = async () => {
      //web3.js call
			var auctions = await this.state.ledger.methods.getAuctions()
				.call({from: web3.eth.getAccounts[0]})
				.then(result => result);
        
        
			var oldAddresses = this.state.addresses.slice(0);
      this.setState({ addresses: auctions });
      var newAddresses = this.state.addresses.slice(0);
      let difference = oldAddresses
       .filter(x => !newAddresses.includes(x))
       .concat(newAddresses.filter(x => !oldAddresses.includes(x)));      
      if(oldAddresses.toString() !== this.state.addresses.toString() && this.state.auctions.length !== auctions.length){
        await this.handleContracts(difference);
      }
	}

  handleContracts = async (addresses) => {
    try {
      for (var address of addresses) {
        var auctionAbi = contract.interf;
        var auction = new web3.eth.Contract(JSON.parse(auctionAbi), address);
        
        //web3.js call
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
    
    //http request
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
        //console.log(body);
				this.setState({
					auctions: [...this.state.auctions, nAuction]
				}) 
      }
    });
  };

  handleSort = async () => {
    console.log(this.state.auctions);
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
          <Grid style={{ marginTop: "85px"}} container justify="center" spacing={16}>
            {this.state.auctions.map((content, x) => <AuctionCard key={content.address} data={content} ex={this.state.exchange} web3={web3}/>
            )}
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
export default App;