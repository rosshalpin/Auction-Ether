import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from './uploadModal.js';
//const message = require('./deploy');

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const ledgerAbi = '[{"constant":false,"inputs":[{"name":"auctionAddress","type":"address"}],"name":"addAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAuctions","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"}]';

function AuctionCard() {
    let cardClassName = "Auction-card";
    return(
        <Card className={cardClassName}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className="media"
                    height="140"
                    image="images/house.png"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" >
                        House
                    </Typography>
                    <Typography >
                        House details
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

const web3 = new Web3(window.ethereum);

class App extends Component {
	
	state = {
        cardArray: [],
        web3: null,
		auctions: [],
	};
	
	async componentDidMount() {
		this.enableWeb3();
    }
	
	handleContracts = async () => {
		try{
			var web3_ = this.state.web3;
			var ledger = new web3_.eth.Contract(JSON.parse(ledgerAbi), '0x78cDF669DE8fF8b72e6B1843bE8637dE1aCc9bc9');
			var auctions = await ledger.methods.getAuctions().call({from: web3_.eth.getAccounts[0]})
			.then(function(result){
				return  result;
			});
			this.setState({auctions: auctions});
			console.log(this.state.auctions);
		}catch(e){
			console.log(e)
		}
    }
    
	enableWeb3 = async () => {
		if (typeof web3 !== 'undefined') {
			try{
				await window.ethereum.enable();
			}catch(e){
				console.log('You must enable connection to use this app')
				await window.ethereum.enable();
            }
            this.setState({web3: web3});
            this.handleContracts();
		} else if (window.web3) {
            this.setState({web3: window.web3});
            this.handleContracts();
		}else {
			console.log('You must use metamask to interact with this website')
			this.setState({web3: null});
		}
    };
	
	addNewCard = () => {
		var nCard = new AuctionCard();
		let newArray = this.state.cardArray.concat([nCard]);
		this.setState({cardArray: newArray});
	};
    
    render() {
        return (
            <div className="App">
                {this.state.cardArray.map((card, x) => {
                    return <AuctionCard key={"card"+x}/>;
                })}
				<Modal web3={this.state.web3}/>
            </div>
        );  
    }
}
export default App;