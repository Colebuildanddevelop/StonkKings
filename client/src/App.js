import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// actions
import { loginWithToken } from "./redux/actions/auth.actions";
// components 
// containers 
import MyTournaments from './containers/MyTournaments';
import Lobby from "./containers/Lobby";
import Login from "./containers/Login";
import Tournament from "./containers/Tournament";
import NavBar from "./containers/NavBar";
import CreateTournament from "./containers/CreateTournament";
// MATERIAL UI 
import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  app: {
    backgroundColor: theme.palette.primary.light,
    height: '100vh'
  }
});

class App extends React.Component {

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
          <NavBar  />
          <Switch>
            <Route
              exact
              path="/"
              render={(routeProps) => (
                <Lobby {...routeProps} />
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
              path="/login"
              render={(routeProps) => (
                <Login {...routeProps} />
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
