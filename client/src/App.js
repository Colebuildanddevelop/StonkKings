import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// actions
import { loginWithToken } from "./redux/actions/auth.actions";
// components 
import Footer from './components/Footer';
// containers 
import Leaderboard from './containers/Leaderboard';
import MyTournaments from './containers/MyTournaments';
import Lobby from "./containers/Lobby";
import Login from "./containers/Login";
import Tournament from "./containers/Tournament";
import NavBar from "./containers/NavBar";
import CreateTournament from "./containers/CreateTournament";
// MATERIAL UI 
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = (theme) => ({
  app: {
    backgroundColor: theme.palette.primary.light
  },
  mainContainer: {
    minHeight: '100vh',
    width: '100%',
    height: '100%'
  }
});

class App extends React.Component {

  state = {
    loggedIn: false,
  }

  logIn = () => {
    this.setState({
      loggedIn: true
    })
  }

  componentDidMount() {
    if (localStorage.token) {
      this.props.loginWithToken(localStorage.token)
    } 
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.app}>
        <BrowserRouter>
          {this.state.loggedIn || localStorage.token ? (
            <NavBar />
          ) : null}
          <div className={classes.mainContainer}>
            <Switch>
              <Route
                exact
                path="/lobby"
                render={(routeProps) => (
                  <Lobby {...routeProps} />
                )}
              />
              <Route
                exact
                path="/login"
                render={(routeProps) => (
                  <Login logIn={this.logIn} {...routeProps} />
                )}
              />
              <Route
                exact
                path="/my-tournaments"
                render={(routeProps) => (
                  <MyTournaments {...routeProps} />
                )}
              />
              <Route
                exact
                path="/leaderboard"
                render={(routeProps) => (
                  <Leaderboard {...routeProps} />
                )}
              />
              <Route
                exact
                path="/create-tournament"
                render={(routeProps) => (
                  <CreateTournament {...routeProps} />
                )}
              />
              <Route
                exact
                path="/tournament/:id"
                render={(routeProps) => (
                  <Tournament {...routeProps} currentUser={this.props.currentUser} />
                )}
              />
            </Switch>

          </div>
          {this.state.loggedIn || localStorage.token ? (
            <Footer className={classes.footer}/>
          ) : null}
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

export default connect(
  mapStateToProps,
  { loginWithToken }
)(withStyles(useStyles, {withTheme: true})(App));
