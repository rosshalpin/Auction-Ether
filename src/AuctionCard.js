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
	}
  
  componentDidMount = async () => {
    this.handleContract();

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
    console.log(accounts)

    const bid = await auctionFunc.methods
          .placeBid()
          .send({ from: accounts[0], value: web3.utils.toWei('1', 'ether') })
          .then(result => result); 
    console.log(bid);

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
          </div>
      </Modal>
    );
  }
  
	render() {
    const { classes } = this.props;
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
export  default withStyles(styles)(AuctionCard);