import React from "react";
import { connect } from "react-redux";

// containers 
import Login from "./containers/Login";


class App extends React.Component {


  render() {
    console.log(this.props)
    return (
      <div className="App">
        <h1>hi</h1>
        <Login />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state
})



export default connect(
  mapStateToProps
)(App);
