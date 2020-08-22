import React from 'react';
import LeaderboardTable from '../components/LeaderboardTable';
import URL from '../config';

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
    return (
      <div style={{padding: 100}}>
        <LeaderboardTable users={this.state.users} />
      </div>
    )
  }
}

export default Leaderboard;