import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// actions
import { loginWithToken } from "./redux/actions/auth.actions";
// components
import Footer from "./components/Footer";
import DisplayErrors from "./components/DisplayErrors";
// containers
import Leaderboard from "./containers/Leaderboard";
import MyTournaments from "./containers/MyTournaments";
import Lobby from "./containers/Lobby";
import Login from "./containers/Login";
import Tournament from "./containers/Tournament";
import NavBar from "./containers/NavBar";
import CreateTournament from "./containers/CreateTournament";
// MATERIAL UI
import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  base: {
    backgroundColor: theme.palette.primary.light,
  },
  mainContainer: {
    minHeight: "100vh",
    width: "100%",
    height: "100%",
  },
});

class App extends React.Component {
  componentDidMount() {
    this.handleLoginUser();
  }

  handleLoginUser = async () => {
    await this.props.loginWithToken(localStorage.token);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.base}>
        <div className={classes.mainContainer}>
          <DisplayErrors />
          {!this.props.currentUser ? (
            <Login currentUser={this.props.currentUser} />
          ) : (
            <BrowserRouter>
              <NavBar />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(routeProps) => <Lobby {...routeProps} />}
                />
                <Route
                  exact
                  path="/my-tournaments"
                  render={(routeProps) => <MyTournaments {...routeProps} />}
                />
                <Route
                  exact
                  path="/leaderboard"
                  render={(routeProps) => <Leaderboard {...routeProps} />}
                />
                <Route
                  exact
                  path="/create-tournament"
                  render={(routeProps) => <CreateTournament {...routeProps} />}
                />
                <Route
                  exact
                  path="/tournament/:id"
                  render={(routeProps) => (
                    <Tournament
                      {...routeProps}
                      currentUser={this.props.currentUser}
                    />
                  )}
                />
              </Switch>
            </BrowserRouter>
          )}
        </div>
        <Footer className={classes.footer} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps, { loginWithToken })(
  withStyles(useStyles, { withTheme: true })(App)
);
