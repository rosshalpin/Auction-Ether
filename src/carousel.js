import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const tutorialSteps = [
  {
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

const white_theme = createMuiTheme({
	palette: {
		primary: {
       main: 'rgb(255,255,255)',
    }
	},
	typography: {
		useNextVariants: true,
	},
});

const black_theme = createMuiTheme({
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

class TextMobileStepper extends React.Component {
  state = {
    activeStep: 0,
    images: this.props.images
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
    const maxSteps = this.state.images.length;

    return (
      <div className={classes.root}>
        <img
          className={classes.img}
          src={this.state.images[activeStep]}
          alt={tutorialSteps[activeStep].label}
        />
        <MuiThemeProvider theme={white_theme}>
        <MobileStepper
          steps={maxSteps}
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button color="primary" size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button color="primary" size="small" onClick={this.handleBack} disabled={activeStep === 0}>
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

TextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TextMobileStepper);