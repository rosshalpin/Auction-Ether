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
import { AddCircle } from '@material-ui/icons';
//const message = require('./deploy');
const fs = require('fs');

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
                    <Typography gutterBottom variant="h5" component="h2">
                        House
                    </Typography>
                    <Typography component="p">
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
	};
	
	async componentDidMount() {
		
	}
	
	payForAuction = async () => {
		if (typeof web3 !== 'undefined') {
			await window.ethereum.enable();
			
			const accounts = await web3.eth.getAccounts();
			console.log(accounts[0])
			
			web3.eth.sendTransaction({
				from: accounts[0],
				to: '0x7657bC53995C2B55104E389a06d28f1Bf1237AA0',
				//value: '1000000000000000'
				value: web3.utils.toWei('0.0001', 'ether')
			})
			.on('transactionHash', function(hash){
				
			})
			.on('receipt', function(receipt){
				
			})
			.on('confirmation', function(confirmationNumber, receipt){
				console.log(confirmationNumber, receipt)
				this.addNewCard();
			})
			.on('error', console.error); // If a out of gas error, the second parameter is the receipt.
			
			web3.eth.getTransaction('0x70bc6d1483bc85db08be633c4d3a6e7e94354f5546033ed91e17e1eb485a6083')
			.then(console.log);
			
		}else {
			console.log('You must use metamask to interact with this website')
		}
		
	};
	
	addNewCard = () => {
		var nCard = new AuctionCard();
		let newArray = this.state.cardArray.concat([nCard]);
		this.setState({cardArray: newArray});
	};
	
	cardAdder  = () => { 
		let cardClassName = "Auction-card";
		return(
			<Card className={cardClassName} onClick={() => {this.addNewCard()}} >
				<CardActionArea style={{height: '280px'}} >
						<AddCircle style={{fontSize: '64px', color: '#bcbcbc'}} ></AddCircle>
				</CardActionArea>
			</Card>
		);
	};
    
    render() {
        return (
            <div className="App">
                {this.cardAdder()}
                {this.state.cardArray.map((card, x) => {
                    return <AuctionCard key={"card"+x}/>;
                })}
            </div>
        );  
    }
}
export default App;