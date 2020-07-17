import React from 'react'; 
import { connect } from "react-redux";
import { signIn, signUp } from "../redux/actions/userActions";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  }

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
        <button onClick={() => this.props.signIn({username: this.state.username, password: this.state.password})}>Login</button>
      </div>
    )
  }
}

export default connect(
  null,
  { signIn, signUp }
)(Login)