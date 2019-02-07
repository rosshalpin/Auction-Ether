import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Modal from './uploadModal.js';
import GavelIcon from '@material-ui/icons/Gavel';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Sort';

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
    right: 20
  }
};

const green_theme = createMuiTheme({
	palette: {
		primary: {
			main: '#2196f3',
		}
	},
	typography: {
		useNextVariants: true,
	},
});

class ButtonAppBar extends React.Component {
  
	render() {
		const { classes,web3,contract } = this.props;
		return (
			<div className={classes.root}>
				<MuiThemeProvider theme={green_theme}>
					<AppBar position="static">
						<Toolbar>
							<GavelIcon  className={classes.menuButton}/>
							<Modal web3={web3} contract={contract} />
              <IconButton onClick={this.props.sort} className={classes.sortButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
						</Toolbar>
					</AppBar>
				</MuiThemeProvider>
			</div>
		);
	}
}

export default withStyles(styles)(ButtonAppBar);