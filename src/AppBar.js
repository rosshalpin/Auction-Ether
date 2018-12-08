import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Modal from './uploadModal.js';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
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
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<MuiThemeProvider theme={green_theme}>
					<AppBar position="static">
						<Toolbar>
							<Modal web3={this.props.web3} contract={this.props.contract} />
						</Toolbar>
					</AppBar>
				</MuiThemeProvider>
			</div>
		);
	}
}

export default withStyles(styles)(ButtonAppBar);