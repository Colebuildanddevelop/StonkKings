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

class Lobby extends React.Component {

  componentDidMount() {
    this.props.getTournaments()
    this.setCountdown("1995-12-17T09:24:00.000Z", "2020-12-17T09:24:00.000Z")
  }

  setCountdown = (startDateString, endDateString) => {
    let start = new Date(startDateString).getTime();
    let end = new Date(endDateString).getTime();
    const countdown = setInterval(() => {
      let now = new Date().getTime();

      let timeleft = end - now;
        
      // Calculating the days, hours, minutes and seconds left
      let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
        
      // Result is output to the specific element
      console.log(days, hours, minutes, seconds)
      // Display the message when countdown is over
      if (timeleft < 0) {
        clearInterval(countdown);
      }
    }, 1000);
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
            {this.props.tournamentsArr.map((tournament) => {
              return (
                <TableRow key={tournament.id}>
                  <TableCell component="th" scope="row">
                    {tournament.name}
                  </TableCell>
                  <TableCell align="right">{tournament.entryFee}</TableCell>
                  <TableCell align="right">{tournament.entries.length}</TableCell>
                  <TableCell align="right">{tournament.entryFee}</TableCell>
                  <TableCell align="right">{"start"}</TableCell>
                  <TableCell align="right">{"Month"}</TableCell>
                </TableRow>
              )
            })}
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
)(withStyles(useStyles)(Lobby))
