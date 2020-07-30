import React from 'react';
import LeaderboardTable from '../components/LeaderboardTable';

class Leaderboard extends React.Component {

  state = {
    users: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(users => {
        this.setState({
          users: users
        })
      })
  }


  render() {
    console.log(this.state)
    return (
      <div style={{padding: 100}}>
        <LeaderboardTable users={this.state.users} />
      </div>
    )
  }
}

export default Leaderboard;