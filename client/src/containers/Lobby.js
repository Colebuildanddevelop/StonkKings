import React from 'react';
import { connect } from "react-redux";
import { getTournaments } from "../redux/actions/tournament.actions";
// MATERIAL UI 
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = () => ({
  table: {
    minWidth: 650,
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class SimpleTable extends React.Component {

  componentDidMount() {
    this.props.getTournaments()
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.tournamentsArr)
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tournament</TableCell>
              <TableCell align="right">Entry Fee</TableCell>
              <TableCell align="right">Entries</TableCell>
              <TableCell align="right">Total Prize</TableCell>
              <TableCell align="right">Start</TableCell>
              <TableCell align="right">Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.tournamentsArr.map((tournament) => (
              <TableRow key={tournament._id}>
                <TableCell component="th" scope="row">
                  {tournament.name}
                </TableCell>
                <TableCell align="right">{tournament.entryFee}</TableCell>
                <TableCell align="right">{tournament.entries.length}</TableCell>
                <TableCell align="right">{tournament.entryFee}</TableCell>
                <TableCell align="right">{tournament.startTime}</TableCell>
                <TableCell align="right">{"Month"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

const mapStateToProps = state => ({
  tournamentsArr: state.tournament.tournamentsArr
});

export default connect(
  mapStateToProps,
  { getTournaments }
)(withStyles(useStyles)(SimpleTable))
