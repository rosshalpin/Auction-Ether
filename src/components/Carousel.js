import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const white_theme = createMuiTheme({
	palette: {
		primary: {
       main: '#fafafa',
    }
	},
	typography: {
		useNextVariants: true,
	},
});

const styles = theme => ({
  root: {
    maxHeight: 400,
    flexGrow: 1,
    position: 'relative',
  },
  img: {
    height: 300,
    width: 400,
    objectFit: 'cover',
    overflow: 'hidden',
    display: 'block',

    borderRadius: '4px 0px 0px 4px',
  },
  mobileStepper: {
    borderRadius: '0px 0px 0px 4px',
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    width: 400,
  }
});

class Carousel extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = this.props.images.length;

    return (
      <div className={classes.root}>
        <img
          className={classes.img}
          src={this.props.images[activeStep]}
          alt={[activeStep]}
        />
        <MuiThemeProvider theme={white_theme}>
        <MobileStepper
          steps={maxSteps}
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button color="primary" variant="outlined" size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button color="primary" variant="outlined" size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
        </MuiThemeProvider>
      </div>
    );
  }
}

Carousel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Carousel);