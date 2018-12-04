import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { AddCircle } from '@material-ui/icons';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
function getModalStyle() {
	const top = 50;
	const left = 50;
	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const base_64 = (inputFile) => {
	const reader = new FileReader();
	return new Promise((resolve, reject) => {
		reader.onerror = () => {
			reader.abort();
			reject(new DOMException("Problem parsing input file."));
		};
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.readAsDataURL(inputFile);
	});
};

const styles = theme => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
	},
});

class SimpleModal extends React.Component {
	state = {
		open: false,
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	
	handleUpload = async (event) => {
		const files = event.target.files;
		var files_64 = []
		try {
			for(var file of files){
				const fileContents = await base_64(file)
				files_64.push(fileContents);
			}
		} catch (e) {
			console.warn(e.message)
		}
		console.log(files_64)
	}
  
	cardAdder = () => { 
		let cardClassName = "Auction-card";
		return(
			<Card className={cardClassName} onClick={this.handleOpen} >
				<CardActionArea style={{height: '280px'}} >
						<AddCircle style={{fontSize: '64px', color: '#bcbcbc'}} ></AddCircle>
				</CardActionArea>
			</Card>
		);
	};

	render() {
		const { classes } = this.props;
		return (
		<div>
			{this.cardAdder()}
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={this.state.open}
				onClose={this.handleClose}>
				<div style={getModalStyle()} className={classes.paper}>
					<Typography variant="h6" id="modal-title">
						Create new Auction
					</Typography>
					{/* Upload */}
					<input
						accept="image/*"
						className={classes.button}
						id="flat-button-file"
						multiple
						type="file"
						style={{ display: 'none' }}
						onChange={this.handleUpload.bind(this)}
					  />
					  <label htmlFor="flat-button-file">
						<Button component="span" className={classes.button}>
						  Upload
						</Button>
					  </label>
					  
				</div>
			</Modal>
		</div>
		);
	}
}

export default withStyles(styles)(SimpleModal);
