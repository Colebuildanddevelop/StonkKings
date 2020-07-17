import React from 'react'; 
import { connect } from "react-redux";
import { auth } from "../redux/actions/authActions";

class Login extends React.Component {

  handleField = (e) => {
    this.setState({
      [e.target.name]: e.target.value 
    })
  }

  render() {
    return (
      <div>
        <input onChange={this.handleField} type="text" name="username" placeholder="username" />
        <input onChange={this.handleField} type="text" name="password" placeholder="password" />
        <input onChange={this.handleField} type="text" name="email" placeholder="email" />

        <button onClick={() => this.props.auth({username: this.state.username, password: this.state.password}, "signIn")}>Login</button>
        <button onClick={() => this.props.auth({username: this.state.username, password: this.state.password, email: this.state.email}, "signUp")}>signUP</button>
      </div>
    )
  }
}

export default connect(
  null,
  { auth }
)(Login)