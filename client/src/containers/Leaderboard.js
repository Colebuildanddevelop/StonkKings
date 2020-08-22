import React from 'react';
import LeaderboardTable from '../components/LeaderboardTable';
import URL from '../config';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  mainContainer: {
    [theme.breakpoints.up('lg')]:{
      padding: 100
    }
  }
});

class Leaderboard extends React.Component {

  state = {
    users: []
  }

  componentDidMount() {
    fetch(`${URL}/api/users`)
      .then(res => res.json())
      .then(users => {
        this.setState({
          users: users
        })
      })
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <LeaderboardTable users={this.state.users} />
      </div>
    )
  }
}

export default withStyles(useStyles, {withTheme: true})(Leaderboard);