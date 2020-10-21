import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// actions
import { loginWithToken } from "./redux/actions/auth.actions";
// components
import Footer from "./components/Footer";
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
  mainContainer: {
    backgroundColor: theme.palette.primary.light,
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
    if (!this.props.currentUser) console.log("error user");
  };

  render() {
    const { classes } = this.props;
    if (!this.props.currentUser) {
      return <Login currentUser={this.props.currentUser} />;
    }
    return (
      <div className={classes.mainContainer}>
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
          <Footer className={classes.footer} />
        </BrowserRouter>
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
