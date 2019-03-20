import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Modal from './UploadModal.js';
import IconButton from '@material-ui/core/IconButton';
import SortIcon from '@material-ui/icons/Sort';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Grid from '@material-ui/core/Grid';

import AuctionCard from "./AuctionCard.js";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
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
          weight: 0.125
        },
        {
          name: 'media.county',
          weight: 0.125
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
  
  SearchModal = () =>{
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={"body"}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogContent>
            <Grid container justify="center" >
              {this.state.result.map((content, x) => 
                <AuctionCard key={content.scanAddress} data={content} ex={this.props.ex} web3={this.props.web3}/>
              )}
            </Grid>
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