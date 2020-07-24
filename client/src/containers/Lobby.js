import React from 'react';
import { connect } from "react-redux";
import { getTournaments } from "../redux/actions/tournament.actions";
import { createEntry } from "../redux/actions/entry.actions";
import { loginWithToken } from "../redux/actions/auth.actions";
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
  },
  row: {
    textDecoration: 'none'
  }
});

class Lobby extends React.Component {

  componentDidMount() {
    this.props.getTournaments()
  }

  handleEnter = async (tournamentId) => {
    await this.props.createEntry(tournamentId, localStorage.token)
    await this.props.getTournaments()
    await this.props.loginWithToken(localStorage.token)
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button 
          variant="contained" 
          color="secondary"
          component={Link}
          to={`/create-tournament`}
        >
          Create Tournament
        </Button> 
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Tournament</TableCell>
                <TableCell align="right">Entry Fee</TableCell>
                <TableCell align="right">Entries</TableCell>
                <TableCell align="right">Total Prize</TableCell>
                <TableCell align="right">Start</TableCell>
                <TableCell align="right">End</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.tournamentsArr.map((tournament) => {
                return (
                  <TableRow className={classes.row} key={tournament.id}   >
                    <TableCell scope="row" component={Link} to={`/tournament/${tournament.id}`} >
                      {tournament.name}
                    </TableCell>
                    <TableCell align="right">{tournament.entryFee}</TableCell>
                    <TableCell align="right">{tournament.entries.length + " / " + tournament.entryLimit}</TableCell>
                    <TableCell align="right">{tournament.entryFee * tournament.entries.length}</TableCell>
                    <Countdown countDownEnd={new Date(tournament.startTime).getTime()} overMsg={"Started!"}/>
                    <Countdown countDownEnd={new Date(tournament.endTime).getTime()} overMsg={"Ended!"} />
                    <TableCell align="right">
                      <Button
                        variant="contained" 
                        color="secondary" 
                        onClick={() => this.handleEnter(tournament.id)}
                      >
                        Enter
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournamentsArr: state.tournament.tournamentsArr,
  entryData: state.entry
});

export default connect(
  mapStateToProps,
  { getTournaments, createEntry, loginWithToken }
)(withStyles(useStyles)(Lobby))
