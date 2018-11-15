import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';

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


const web3 = new Web3(window.web3.currentProvider);

class App extends Component {
    constructor(props){
        super(props);
        var config = {
            apiKey: "AIzaSyAPB2SsaCcDPXUKL3_zslSMf7S0mW2zxH0",
            authDomain: "auctionether.firebaseapp.com",
            databaseURL: "https://auctionether.firebaseio.com",
            projectId: "auctionether",
            storageBucket: "auctionether.appspot.com",
            messagingSenderId: "285598191042"
        };
        firebase.initializeApp(config);
		this.state = {
		  cardArray: []
		}
    }
	
	payForAuction = async () => {
		if (typeof web3 !== 'undefined') {
			const accounts = await web3.eth.getAccounts();
			console.log(accounts[0])
			
			this.addNewCard();
			
		}else {
			console.log('You must use metamask to interact with this website')
		}
		
		
		
	};
	
	addNewCard = () => {
		this.setState( (state) => {
			var nCard = new AuctionCard();
			this.state.cardArray = this.state.cardArray.concat([nCard]);
			return state;
		});
		//console.log(this.state.cardArray)
	};
	
	cardAdder  = () => { 
		let cardClassName = "Auction-card";
		return(
			<Card className={cardClassName} onClick={() => {this.payForAuction()}} >
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