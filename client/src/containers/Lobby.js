import React from 'react';
import { connect } from "react-redux";
import { getTournaments } from "../redux/actions/tournament.actions";
import { createEntry } from "../redux/actions/entry.actions";
import { loginWithToken } from "../redux/actions/auth.actions";
import Countdown from "../components/Countdown";
import { Link } from "react-router-dom";
import TournamentModal from "../components/TournamentModal";
import LobbyTable from '../components/LobbyTable';
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

const useStyles = (theme) => ({
  mainContainer: {
    padding: 100
  }, 
  table: {
    backgroundColor: theme.palette.text.secondary,
    minWidth: 650,
  },
  createButton: {
    marginBottom: 20
  },
  tableHead: {
    backgroundColor: theme.palette.primary.dark
  },
  tableCellHeader: {
    color: theme.palette.text.secondary
  },
  tableCell: {
    color: theme.palette.primary.dark
  },
  row: {
    textDecoration: 'none'
  }
});

class Lobby extends React.Component {
  
  state = {
    modalOpen: false,
    tournamentClickedInfo: {}
  }

  componentDidMount() {
    this.props.getTournaments();
    console.log("mount")
    
  }

  handleEnter = async (tournamentId) => {
    await this.props.createEntry(tournamentId, localStorage.token)
    await this.props.getTournaments()
    await this.props.loginWithToken(localStorage.token)
  }

  handleClickTournamentRow = (tournamentInfo) => {
    this.setState({
      tournamentClickedInfo: tournamentInfo,
      modalOpen: true
    })
  }

  handleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  render() {
    const { classes } = this.props;
    console.log(this.state)
    return (
      <div className={classes.mainContainer}>
        <TournamentModal
          handleModal={this.handleModal}
          open={this.state.modalOpen}
          tournamentInfo={this.state.tournamentClickedInfo}
          handleEnter={this.handleEnter}
          currentUser={this.props.currentUser}
        />
        <LobbyTable 
          tournamentsArr={this.props.tournamentsArr}
          handleClickTournamentRow={this.handleClickTournamentRow}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tournamentsArr: state.tournament.tournamentsArr,
  entryData: state.entry,
  currentUser: state.auth.currentUser
});

export default connect(
  mapStateToProps,
  { getTournaments, createEntry, loginWithToken }
)(withStyles(useStyles, {withTheme: true})(Lobby))
