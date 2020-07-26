import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// actions
import { loginWithToken } from "./redux/actions/auth.actions";
// components 
import AlertDisplay from "./components/AlertDisplay";
// containers 
import Lobby from "./containers/Lobby";
import Login from "./containers/Login";
import Tournament from "./containers/Tournament";
import NavBar from "./containers/NavBar";
import CreateTournament from "./containers/CreateTournament";



class App extends React.Component {

  componentDidMount() {
    if (localStorage.token) {
      this.props.loginWithToken(localStorage.token)
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <AlertDisplay />
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
)(App);
