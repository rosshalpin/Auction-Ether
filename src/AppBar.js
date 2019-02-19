import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Modal from './uploadModal.js';
import IconButton from '@material-ui/core/IconButton';
import SortIcon from '@material-ui/icons/Sort';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
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
  }
};

const green_theme = createMuiTheme({
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
  
  click = () => {
    this.props.sort();
  }
  
	render() {
		const { classes,web3} = this.props;
		return (
			<div className={classes.root}>
				<MuiThemeProvider theme={green_theme}>
					<AppBar style={{boxShadow: "none"}} position="absolute">
						<Toolbar>
              <Typography style={{fontWeight: 'bold', fontColor: '#424242'}} className={classes.title} variant="h4" color="inherit">
                Renther
              </Typography>
							<Modal ex={this.props.ex.EUR} web3={web3}/>
              <Tooltip placement="bottom" title="Sort Price">
                <IconButton onClick={this.click} className={classes.sortButton} color="inherit" aria-label="Menu">
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