import React from "react";
import { connect } from "react-redux";
import { getEntriesByTournamentId } from "../redux/actions/entry.actions";
// MATERIAL UI  
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";

class AllEntrants extends React.Component {

  componentDidMount() {
    // get entrants by tournament
    this.props.getEntriesByTournamentId(`${this.props.tournamentId}`)
  }

  render() {
    console.log(this.props.entrants)
    return (
      <TableContainer component={Paper} >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Tournament Balance</TableCell>
              <TableCell># of Trades</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.entrants.map((entry, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>{entry.user.username}</TableCell>
                  <TableCell>{entry.tournamentBalance.toFixed(2)}</TableCell>
                  <TableCell>{entry.trades.length}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>    
    )
  }
}

const mapStateToProps = state => ({
  entrants: state.entry.tournamentEntries
});

export default connect(
  mapStateToProps,
  { getEntriesByTournamentId }
)(AllEntrants);