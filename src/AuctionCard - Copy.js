import React, {  Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AuctionCard extends  Component {
  
	state = {
		images: this.props.data.media.images,
		desc: this.props.data.media.desc,
		rent_type: this.props.data.media.rent_type,
		beds: this.props.data.media.beds,
		baths: this.props.data.media.baths,
		furnished: this.props.data.media.furnished,
		amount: this.props.data.media.amount,
	}
  
  componentDidMount(){
    //console.log(this.props.nkey)
  }
  
  
	render() {
    
    let styles = {
      width: "40px",
      marginBottom: "-12px",
      marginRight: "-10px",
      marginLeft: "-22px"
    };
    
		return(
			<div>
			<Card className="Auction-card">
				<CardActionArea>					
					<CardContent>
						<Typography  variant="h5" >
							{this.state.rent_type}
						</Typography>
						<Typography >
							{this.state.beds}{", "}
							{this.state.baths}{", "}
							{this.state.furnished}
						</Typography>
						<Typography variant="h6">
							<img style={styles} src="https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black_small.png"/>{this.state.amount}
						</Typography>
            <Typography variant="subtitle1">
              € {(this.state.amount * this.props.ex.EUR).toFixed(2)}
						</Typography>
					</CardContent>
          <CardMedia
						component="img"
						className="media"
						height="140"
						src={this.state.images[0]}
					/>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">
						Share
					</Button>
				</CardActions>
			</Card>
			</div>
		);
	}
}
export default AuctionCard;