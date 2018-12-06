import React from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { AddCircle } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
//import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import InputAdornment from '@material-ui/core/InputAdornment';
import ipfs from './ipfs';

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
		width: theme.spacing.unit * 80,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
	},
	root: {
		flexGrow: 1,
	},
});

const green_theme = createMuiTheme({
	palette: {
		primary: green,
	},
	typography: {
		useNextVariants: true,
	},
});

const beds = [
	{
		value: 'One Bed',
	},
	{
		value: 'Two Bed',
	},
	{
		value: 'Three Bed',
	},
	{
		value: 'Four Bed',
	},
	{
		value: 'Five Bed',
	},
];

const rent_type = [
	{
		value: 'House',
	},
	{
		value: 'Apartment',
	},
	{
		value: 'Studio Apartment',
	},
	{
		value: 'Single Room',
	},
	{
		value: 'Double Room',
	},
	{
		value: 'Twin Room',
	},
];

const baths = [
	{
		value: 'One Bath',
	},
	{
		value: 'Two Bath',
	},
	{
		value: 'Three Bath',
	},
	{
		value: 'Four Bath',
	},
	{
		value: 'Five Bath',
	},
];

const furnished = [
	{
		value: 'Furnished',
	},
	{
		value: 'Unfurnished',
	},
];

class SimpleModal extends React.Component {
	state = {
		open: false,
		chars_left: 180,
		desc: '',
		fileList: [],
		beds: 'One Bed',
		rent_type: 'House',
		amount: '',
		baths: 'One Bath',
		furnished: 'Furnished',
		images: [],
	};
	
	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	
	handleWordCount = (event) => {
		const charCount = event.target.value.length;
		const charLeft = 180 - charCount;
		if(charLeft < 0){
			this.setState({ chars_left: 0});
			event.target.value = event.target.value.slice(0, 180);
		}else{
			this.setState({ chars_left: charLeft});
			//console.log(charLeft)
		}
		this.setState({ desc: event.target.value});
		//console.log(event.target.value)
	};
	
	handleUpload = async (event) => {
		const files = event.target.files;
		var files_64 = []
		try {
			for(var file of files){
				const fileContents = await base_64(file)
				files_64.push(fileContents);
			}
			this.setState({ images: files_64 });
		} catch (e) {
			console.warn(e.message)
		}
		var fileNames = []
		for(var f of files){
			fileNames.push(f.name)
		}
		this.setState({ fileList: fileNames });
		console.log(this.state.fileList);
	};
	
	handleDeploy = async () => {
		var details = {
			desc: this.state.desc,
			beds: this.state.beds,
			baths: this.state.baths,
			rent_type: this.state.rent_type,
			amount: this.state.amount,
			furnished: this.state.furnished,
			images: this.state.images,
		};
		console.log(JSON.stringify(details));
		const fbuffer = await Buffer.from(JSON.stringify(details));
		await ipfs.add(fbuffer, (err, ipfsHash) => {
			console.log(err,ipfsHash);
		})
			
	};

	cardAdder = () => { 
		let cardClassName = "Auction-card";
		return(
			<Tooltip title="Create Auction">
			<Card className={cardClassName} onClick={this.handleOpen} >
				<CardActionArea style={{height: '280px'}} >
						<AddCircle style={{fontSize: '64px', color: '#bcbcbc'}} ></AddCircle>
				</CardActionArea>
			</Card>
			</Tooltip>
		);
	};
	
	TextField_ = (obj, desc, id) => {
		const { classes } = this.props;
		return(
			<TextField
				id = {"outlined-select-"+id}
				select
				className = {classes.textField}
				value = {this.state[id]}
				onChange = {this.handleChange(id)}
				SelectProps = {{
					MenuProps: {
						className: classes.menu,
					},
				}}
				style={{ width: '120px'}}
				helperText={desc}
				margin="normal"
				variant="outlined"
			>
				{obj.map(option => (
					<MenuItem key={option.value} value={option.value}>
						{option.value}
					</MenuItem>
				))}
			</TextField>	
		);
	}
	
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
					 <Grid container className={classes.root} spacing={16}>
						<Grid item xs={12}>
							<Typography variant="h6" id="modal-title">
								Create new Auction
							</Typography>
						</Grid>
						<Grid container justify="center" className={classes.root} spacing={16}>
							<Grid item >
								{this.TextField_(beds, "How many beds", "beds")}
							</Grid>
							<Grid item >
								{this.TextField_(rent_type, "Rental Type", "rent_type")}
							</Grid>
							<Grid item >
								{/* AMOUNT */}
								<TextField
									id="outlined-adornment-amount"
									className={classes.textField}
									variant="outlined"
									placeholder="Amount"
									value={this.state.amount}
									onChange={this.handleChange('amount')}
									margin="normal"
									helperText="Reserve Amount"
									style={{ width: '120px'}}
									InputProps={{
										startAdornment: <InputAdornment position="start">€</InputAdornment>,
									}}
								/>
							</Grid>
							
						</Grid>
						<Grid container justify="center" spacing={16} className={classes.root}>
							<Grid item >
								{this.TextField_(baths, "Bathrooms", "baths")}
							</Grid>
							<Grid item >
								{this.TextField_(furnished, "Furnishing", "furnished")}
							</Grid>
						</Grid>
						<Grid container justify="center" className={classes.root}>
							<div>
								{/* DESCRIPTION */}
								<TextField
									placeholder="Description"
									multiline={true}
									rows={3}
									style = {{width: '620px'}}
									maxLength={140}
									required onChange={this.handleWordCount}
									margin="normal"
									variant="outlined"
									InputProps={{
										endAdornment: <InputAdornment style={{color: 'grey'}} position="end">{this.state.chars_left}</InputAdornment>,
									}}
								/>
							</div>
						</Grid>
						<Grid container className={classes.root}>
							<div style={{marginLeft: '10px'}}>
								{this.state.fileList.map(option => (
									<p style={{display: 'inline', margin: '5px'}} key={option} value={option}>
										{option}
									</p>
								))}
							</div>
						</Grid>
						<Grid style={{margin: '10px'}} container className={classes.root} spacing={16}>
							{/* UPLOAD */}
							<Grid item>
								<div>
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
										<Button variant="contained" component="span" className={classes.button}>
											Select Images
										</Button>
									</label>
								</div>
							</Grid>
							<Grid  item >
								<MuiThemeProvider theme={green_theme}>
									<Button onClick={this.handleDeploy} color="primary" variant="contained" component="span" className={classes.button}>
										Deploy
									</Button>
								</MuiThemeProvider>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</Modal>
		</div>
		);
	}
}

export default withStyles(styles)(SimpleModal);
