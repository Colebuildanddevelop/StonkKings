import React from 'react';
import { connect } from "react-redux";
import { getTournaments } from "../redux/actions/tournament.actions";
import Countdown from "../components/Countdown";
import { Link } from "react-router-dom";
// MATERIAL UI 
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
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
  }


  render() {
    const { classes } = this.props;
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
              <TableCell align="right"></TableCell>
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
                  <Countdown countDownEnd={new Date(tournament.startTime).getTime()} overMsg={"Started!"}/>
                  <Countdown countDownEnd={new Date(tournament.endTime).getTime()} overMsg={"Ended!"} />
                  <TableCell align="right">
                    <Button component={Link} to={"/login"} color="inherit">Enter</Button>
                  </TableCell>
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
