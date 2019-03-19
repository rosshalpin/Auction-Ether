import React, { Component } from "react";
import "./App.css";
import web3API from "./api/web3API.js";
import AuctionCard from "./components/AuctionCard.js";
import contract from "./contract";
import AppBar from "./components/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from '@material-ui/core/Grid';
import ipfs from './api/ipfsAPI';

var web3 = web3API.enable();

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

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
  
  constructor(props){
    super(props);
    this.handleExchange(this.props.exchangeAPI);
    //setInterval(async()=>{await this.getAddresses(this.props.auctions)}, 1000);
    setInterval(async()=>{await this.handleContracts(this.getAddresses,this.props.auctions)}, 1000);
  }
  
  handleExchange = async(exchangeAPI) =>{
    var rate = await exchangeAPI;
    this.setState({exchange: rate})
  }
  
	getAddresses = async (auctionArray) => {
      var auctions = await auctionArray;
			var oldAddresses = this.state.addresses.slice(0);
      this.setState({ addresses: auctions });
      var newAddresses = this.state.addresses.slice(0);
      let difference = oldAddresses
       .filter(x => !newAddresses.includes(x))
       .concat(newAddresses.filter(x => !oldAddresses.includes(x)));      
      if(oldAddresses.toString() !== this.state.addresses.toString() && this.state.auctions.length !== auctions.length){
        return difference;
      }else{
        return null;
      }
	}

  handleContracts = async (getAddresses,auctions) => {
    let addresses = await getAddresses(auctions);
    if(addresses != null){
      try {
        for (let address of addresses) {
          let auctionAbi = contract.interf;
          let auction = new web3.eth.Contract(JSON.parse(auctionAbi), address);
          
          //web3.js call
          var auctionIPFS = await web3API.getIPFS(auction);

          let nAuction = await ipfs.get(auctionIPFS, address, auction, contract);
          await this.setState({
            auctions: [...this.state.auctions, nAuction]
          }) 
        }
      } catch (e) {
        console.log(e);
      }
    }
    
  };
  
  handleSort = async () => {
    //console.log(this.state.auctions);
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
          <AppBar web3={web3} searchables={this.state.auctions} contract={contract}  sort={this.handleSort} ex={this.state.exchange} />
          <Grid style={{ marginTop: "85px"}} container justify="center" >
            {this.state.auctions.map((content, x) => <AuctionCard key={content.address} data={content} ex={this.state.exchange} web3={web3}/>
            )}
          </Grid>         
        </div>
      </React.Fragment>
    );
  }
}
export default App;