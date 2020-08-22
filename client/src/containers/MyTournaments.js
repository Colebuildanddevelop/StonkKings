import React from 'react';
import { connect } from 'react-redux';
import { getTournaments } from "../redux/actions/tournament.actions";
import MyTournamentsTable from "../components/MyTournamentsTable";
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  mainContainer: {
    [theme.breakpoints.up('lg')]:{
      padding: 100
    }
  }
});

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
            userTournaments.push(tournament);
          }
        })  
      });
      return userTournaments;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
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
)(withStyles(useStyles, {withTheme: true})(MyTournaments));