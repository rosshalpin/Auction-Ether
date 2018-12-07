import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AuctionCard extends Component {
	state = {
		images: this.props.data.media.images,
		desc: this.props.data.media.desc,
		rent_type: this.props.data.media.rent_type,
	}
	componentDidMount = () => {
		//console.log(this.props.data.media.images[0]);
    }
	render() {
		return(
			<Card className="Auction-card">
				<CardActionArea>
					<CardMedia
						component="img"
						className="media"
						height="140"
						src={this.state.images[0]}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" >
							{this.state.rent_type}
						</Typography>
						<Typography >
							{this.state.desc}
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
	}
}
export default AuctionCard;