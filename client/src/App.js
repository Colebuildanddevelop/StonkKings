import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// actions
import { loginWithToken } from "./redux/actions/authActions";

// containers 
import Login from "./containers/Login";
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
            path="/login"
            render={(routeProps) => (
              <Login {...routeProps} />
            )}
          />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state
})



export default connect(
  mapStateToProps,
  { loginWithToken }
)(App);
