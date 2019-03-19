import React from 'react';
//import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class PositionedSnackbar extends React.Component {
  state = {
    open: false,
  };
	
	componentDidMount = () => {
		console.log(this.props);
    this.setState({ open: true,});
	}

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical:'bottom',horizontal: 'left' }}
          open={open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'snack-id',
          }}
          message={<span id="snack-id"><a href = {'https://rinkeby.etherscan.io/address/' + this.props.data}>Contract created</a></span>}
        />
      </div>
    );
  }
}

export default PositionedSnackbar;