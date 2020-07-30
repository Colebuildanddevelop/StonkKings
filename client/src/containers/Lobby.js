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
    tableHeader: "LOBBY",
    modalOpen: false,
    entered: false,
    tournamentClickedInfo: {}
  }

  componentDidMount() {
    this.props.getTournaments();
    
  }

  handleEnter = async (tournamentId) => {
    await this.props.createEntry(tournamentId, localStorage.token)
    await this.props.getTournaments()
    await this.props.loginWithToken(localStorage.token)
    const updatedTournament = this.props.tournamentsArr.find(t => t.id === this.state.tournamentClickedInfo.id);
    console.log("updated", updatedTournament);
    this.handleClickTournamentRow(updatedTournament);
  }

  handleClickTournamentRow = (tournamentInfo) => {
    let entered = false;
    tournamentInfo.entries.forEach(entry => {
      this.props.currentUser.entries.forEach(userEntry => {
        if (entry._id === userEntry) {
          entered = true
        }
      });
    });
    this.setState({
      tournamentClickedInfo: tournamentInfo,
      entered: entered,
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
    return (
      <div className={classes.mainContainer}>
        <TournamentModal
          entered={this.state.entered}
          handleModal={this.handleModal}
          open={this.state.modalOpen}
          tournamentInfo={this.state.tournamentClickedInfo}
          handleEnter={this.handleEnter}
          currentUser={this.props.currentUser}
        />
        <LobbyTable 
          tableHeader={this.props.mainTableHeader}
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
