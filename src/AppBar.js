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
  
  click = () => {
    this.props.sort();
  }
  
	render() {
		const { classes,web3,contract } = this.props;
		return (
			<div className={classes.root}>
				<MuiThemeProvider theme={green_theme}>
					<AppBar position="fixed">
						<Toolbar>
              <Typography className={classes.title} variant="h6" color="inherit">
                Renther
              </Typography>
							<Modal ex={this.props.ex.EUR} web3={web3} contract={contract} />
              <Tooltip title="Sort Price">
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