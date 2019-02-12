import React, {  Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
		position: 'absolute',
		width: theme.spacing.unit * 80,
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
    contract: this.props.data.contract,
    web3: this.props.web3,
    creator: null
	}
  
  componentDidMount = async () => {
    this.handleContract();
  }
  
  handleContract = async() => {
    const {contract, web3} = this.state;
    var auctionSeller = await contract.methods
          .auctionSeller()
          .call({ from: web3.eth.getAccounts[0] })
          .then(result => result);
    console.log(contract.methods);
    this.setState({creator: auctionSeller});
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  
  
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
      
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Creator: {this.state.creator}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </div>
      </Modal>
      </div>
		);
	}
}
export  default withStyles(styles)(AuctionCard);