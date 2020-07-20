import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// actions
import { loginWithToken } from "./redux/actions/auth.actions";

// containers 
import Lobby from "./containers/Lobby";
import Login from "./containers/Login";
import Tournament from "./containers/Tournament";
import NavBar from "./containers/NavBar";


class App extends React.Component {

  componentDidMount() {
    if (localStorage.token) {
      this.props.loginWithToken(localStorage.token)
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <BrowserRouter>
        <NavBar />
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
            path="/tournament/:tournamentName"
            render={(routeProps) => (
              <Tournament {...routeProps} />
            )}
          />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})

export default connect(
  mapStateToProps,
  { loginWithToken }
)(App);
