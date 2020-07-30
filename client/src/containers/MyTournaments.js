import React from 'react';
import { connect } from 'react-redux';
import { getTournaments } from "../redux/actions/tournament.actions";
import MyTournamentsTable from "../components/MyTournamentsTable";
import { isThursday } from 'date-fns';

class MyTournaments extends React.Component {

  state = {
    userTournaments: []
  }

  componentDidMount() {
    this.props.getTournaments();
  }

  getUserTournaments = () => {
    if (localStorage.userId) {
      const userTournaments = [];
      this.props.tournamentsArr.forEach(tournament => {
        tournament.entries.forEach(entry => {
          if (entry.user === localStorage.userId) {
            console.log("found")
            userTournaments.push(tournament);
          }
        })  
      });
      return userTournaments;
    }
  }

  render() {
    console.log(this.getUserTournaments())
    console.log(this.props.tournamentsArr)
    return (
      <div style={{padding: 100}}>
        <MyTournamentsTable tournamentsArr={this.getUserTournaments()} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tournamentsArr: state.tournament.tournamentsArr
})

export default connect(
  mapStateToProps,
  { getTournaments }
)(MyTournaments);