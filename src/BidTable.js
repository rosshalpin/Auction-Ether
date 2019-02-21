import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ListItemText from '@material-ui/core/ListItemText';


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
  
  componentDidMount = () => {
    console.log(this.props);
  }
  
  state = {
    data: this.props.data
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
      </div>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);