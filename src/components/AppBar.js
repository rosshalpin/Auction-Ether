import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Modal from './UploadModal.js';
import IconButton from '@material-ui/core/IconButton';
import SortIcon from '@material-ui/icons/Sort';
import HelpIcon from '@material-ui/icons/PriorityHigh';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';

import AuctionCard from "./AuctionCard.js";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fuse from 'fuse.js';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 20,
  },
  title:{
	  marginRight: 20,
  },
  sortButton: {
    position: 'absolute',
    right: 30
  },
  helpButton: {
    position: 'absolute',
    right: 100
  },
  search: {
    
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.05),
    },
    border: '1px solid #B1B1B1',
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
    transform: 'scale(1)',
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  searchContainer: {
    position: 'relative',
  },
  paper: {
    width: "fit-content",
    maxWidth: "700px" 
  }
});

const appBar_theme = createMuiTheme({
	palette: {
		primary: {
			main: '#fafafa',
		}
	},
	typography: {
		useNextVariants: true,
	},
});

class ButtonAppBar extends React.Component {
  
  state = {
    result: [],
    open: false,
    empty: null,
    openHelp: false,
  }
  
  searchInit = () => {
    let options = {
      shouldSort: true,
      tokenize: true,
      maxPatternLength: 50,
      minMatchCharLength: 1,
      keys: [
        {
          name: 'scanAddress',
          weight: 0.125
        },          
        {
          name: 'media.town',
          weight: 0.125
        },         
        {
          name: 'media.beds',
          weight: 0.125
        }, 
        {
          name: 'media.baths',
          weight: 0.125
        }, 
        {
          name: 'media.rent_type',
          weight: 0.125
        }, 
        {
          name: 'media.desc',
          weight: 0.125
        },
        {
          name: 'media.furnished',
          weight: 0.12
        },
        {
          name: 'media.county',
          weight: 0.4
        },
      ]
    };
   
    let fuse = new Fuse(this.props.searchables, options);
    
    return fuse;
  }
  
  handleSearch = (event) => {

    if(event.target.value !== '' && event.key === 'Enter'){
      let fuse = this.searchInit();
      let result = fuse.search(event.target.value);
      console.log(result);
      if(result.length < 1){
        this.setState({empty: true})
      }else{
        this.setState({empty: false})
      }
      this.setState({result: result})
      this.handleClickOpen();
    }

  }
  
  click = () => {
    this.props.sort();
  }
  
  handleClickOpen = () => {
    this.setState({ open: true});
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  EmptySearch = () => {
    if(this.state.empty){
      return(<div>{"No Results"}</div>);
    }else{
      return null;
    }
  }
  
  SearchModal = () =>{
    const { classes} = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={"body"}
          aria-labelledby="scroll-dialog-title"
          
          classes={{
              paper: classes.paper,
            }}
        >
          <DialogContent >
            
            <Grid container  justify="center" >
              {this.EmptySearch()}
              {this.state.result.map((content, x) => 
                <AuctionCard key={content.scanAddress} data={content} ex={this.props.ex} web3={this.props.web3}/>
              )}
            </Grid>
          </DialogContent>

        </Dialog>
      </div>
    );
  }
  
  handleHelpOpen = () => {
    this.setState({ openHelp: true});
  };
  handleHelpClose = () => {
    this.setState({ openHelp: false });
  };
  
  HelpModal = () => {
    return (
      <div>
        <Dialog
          open={this.state.openHelp}
          onClose={this.handleHelpClose}
          scroll="body"
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Installing Metamask and creating an Ether Wallet</DialogTitle>
          <DialogContent>
            <DialogContentText>
            This platform requires <a href="https://metamask.io/">Metamask</a>. Acquiring an ether wallet 
            is as simple as installing Metamask within your browser. This will generate a wallet for you. 
            You can then select the "Rinkeby Test Network" from the drop down at the top of the viewer.
            </DialogContentText>
          </DialogContent>
          <DialogTitle id="scroll-dialog-title">Acquiring testnet Ether from an Etherem Faucet</DialogTitle>
          <DialogContent>
            <DialogContentText>
            You can request some testnet ether through the <a href="https://www.rinkeby.io/#faucet">Rinkeby Authenticated Faucet</a>. 
            Simply follow the instructions, select "18.75/3 days" from the "Give me Ether" dropdown, then using the social media platform
            of your choice from the list, post the address of your first account within Metamask. Share this link to the faucet and you will
            recieve 18.75 ether for use within the Rinkeby testnet. Ensure you have the correct address as you may not be able to request 
            more ether for a period of 3 days. 
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  
	render() {
		const { classes,web3} = this.props;
		return (
			<div className={classes.root}>
      {this.SearchModal()}
      {this.HelpModal()}
				<MuiThemeProvider theme={appBar_theme}>
					<AppBar style={{boxShadow: "none"}} position="absolute">
						<Toolbar>
              <Typography style={{pointerEvents: 'none',fontWeight: 'bold', fontColor: '#1E1E1E'}} className={classes.title} variant="h4" color="inherit">
                Renther
              </Typography>
							<Modal ex={this.props.ex} web3={web3}/>
              <div className={classes.searchContainer}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}                   
                    onKeyUp={this.handleSearch}
                  />
                </div>
              </div>
              <Tooltip placement="bottom" title="Help">
                <IconButton style={{border: '1px solid #B1B1B1'}} onClick={this.handleHelpOpen} className={classes.helpButton} color="inherit" aria-label="Menu">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
              <Tooltip placement="bottom" title="Sort Price">
                <IconButton style={{border: '1px solid #B1B1B1'}} onClick={this.click} className={classes.sortButton} color="inherit" aria-label="Menu">
                  <SortIcon />
                </IconButton>
              </Tooltip>
						</Toolbar>
					</AppBar>
				</MuiThemeProvider>
			</div>
		);
	}
}

export default withStyles(styles)(ButtonAppBar);