import React, {  Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const green_theme = createMuiTheme({
	palette: {
		primary: green,
	},
	typography: {
		useNextVariants: true,
	},
});

const styles = theme => ({
  paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		borderRadius: 5,
		outline: 'none',
  },
});

class BidListItem extends Component {
  componentDidMount = async () => {
    console.log(this.props);
  }
  render () {
    const {web3} = this.props;
    return (
      <div>
        <ListItem style={{marginLeft:"-20px"}}>
          <ListItemText
            primary={"Ξ " + web3.utils.fromWei(this.props.data[1])}
            secondary={this.props.data[0]}
          />
        </ListItem>
        <Divider />
      </div>
    );
  }
}

class AuctionCard extends  Component {
  
	state = {
		images: this.props.data.media.images,
		desc: this.props.data.media.desc,
		rent_type: this.props.data.media.rent_type,
		beds: this.props.data.media.beds,
		baths: this.props.data.media.baths,
		furnished: this.props.data.media.furnished,
		amount: this.props.data.media.amount,
    open: false,
    auctionFunc: this.props.data.auctionFunc,
    web3: this.props.web3,
    creator: null,
    bidAmount: null,
    biddingLog: [],
	}
  
  componentDidMount = async () => {
    this.handleContract();
    this.handleBidderLog();
  }
  
  handleContract = async() => {
    const {auctionFunc, web3} = this.state;
    const accounts = await web3.eth.getAccounts();
    var auctionSeller = await auctionFunc.methods
          .auctionSeller()
          .call({ from: accounts[0] })
          .then(result => result);
    console.log(auctionFunc.methods);
    this.setState({creator: auctionSeller});
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleBid = async () => {
    const {auctionFunc, web3} = this.state;
    const accounts = await web3.eth.getAccounts();
    const bid = await auctionFunc.methods
          .placeBid()
          .send({ from: accounts[0], value: web3.utils.toWei(this.state.bidAmount, 'ether') })
          .then(result => result); 
    console.log(bid);
  }
  
  handleBidderLog = async () => {
    const {auctionFunc, web3} = this.state;
    const accounts = await web3.eth.getAccounts();
    var bidderLog = await auctionFunc.methods
      .getBidderLog()
      .call({ from: accounts[0] })
      .then(result => result);
    var bidLog = await auctionFunc.methods
      .getBidLog()
      .call({ from: accounts[0] })
      .then(result => result);
    
    
    var biddingLog = bidderLog.map(function(v,i) {
        return [v, bidLog[i]];
    });
    
    await this.setState({biddingLog: biddingLog});
  }
  
  handleBidAmount = async (event) => {
    await this.setState({ bidAmount: event.target.value });
  }
  
  AuctionModal = () => {
    const { classes } = this.props;
    return(
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={16}
            >
              <Grid item>
                <TextField
                  id="outlined-helperText"
                  label="Amount"
                  margin="dense"
                  variant="outlined"
                  style={{width: "110px"}}
                  required onChange={this.handleBidAmount}
                />
              </Grid>
              <Grid item>
                <MuiThemeProvider theme={green_theme}>
                  <Button onClick={this.handleBid} variant="contained" color="primary" className={classes.button} >
                    Bid
                  </Button>
                </MuiThemeProvider>
              </Grid>
            </Grid>
            <Grid 
            container
            justify="flex-start"
            >
              <Grid item>
                  <List dense={true}>
                    {this.state.biddingLog.map((content, x) => <BidListItem numb={x} key={"li"+x} data={content} web3={this.state.web3}/>
                    )}
                  </List>
              </Grid>
            </Grid>
          </div>
      </Modal>
    );
  }
  
	render() {
    let headerStyle = {
      color: 'white',
      position: 'absolute', 
      zIndex: 1, 
      pointerEvents: 'none',
      top: '10px',
      left: '10px',
      textShadow: '0px 0px 5px rgba(0,0,0,0.8)',
    }
    
    let priceStyle = {
      color: 'white',
      position: 'absolute', 
      zIndex: 1, 

      top: '10px',
      right: '10px',
      textShadow: '0px 0px 5px rgba(0,0,0,0.8)',
    }

		return(
    <div>
			<Card style={{position: 'relative'}} className="Auction-card">
        <Typography style={headerStyle}>
          {this.state.rent_type}  
        </Typography>
        <Tooltip title="Ether (Euro)">
        <Typography style={priceStyle}>
          Ξ{this.state.amount} (€{(this.state.amount * this.props.ex.EUR).toFixed(2)})
        </Typography>
        </Tooltip>
				<CardActionArea onClick={this.handleOpen}>
          <CardMedia
						component="img"
						className="media"
						src={this.state.images[0]}
					/>
				</CardActionArea>
			</Card>
      {this.AuctionModal()}
      </div>
		);
	}
}
export default withStyles(styles)(AuctionCard);