import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  table: {
    height: 200,
  },
  tableWrapper: {
    overflowY: 'auto',
    height: 200
  },
});

class SimpleTable extends React.Component {
  
  state = {
    data: this.props.data
  }
  
  componentDidMount = () => {
    console.log(this.props);
  }
  
  EmptyLog = () => {
    return(
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={this.displayEmpty()}
      >
        <Typography variant="button" style={{color: '#C9C9C9'}}>
          NO BIDS YET...
        </Typography>
      </Grid>
    );
  }
  
  displayEmpty = () => {
    if(this.state.data.length !== 0){
      return {
        display: 'none',
        width: 398, 
        height: 200
      }
    }else{
      return {
        width: 398, 
        height: 200
      }
    }
  }
 
  render () {
    const { classes } = this.props;
    return (
      <div className={classes.tableWrapper}>
        <Table padding="dense" className={classes.table}>
          <TableBody>
            {this.state.data.map( (row,x) => (
              <TableRow key={"t"+x}>
                <TableCell  component="th" scope="row">
                  {"Ξ " + row[1] + " (€" + (row[1] * this.props.ex).toFixed(2)+")"}
                  <br/>
                  {row[0]}
                </TableCell>
              </TableRow>
            ))}
            
          </TableBody>
        </Table>
        {this.EmptyLog()}
      </div>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);