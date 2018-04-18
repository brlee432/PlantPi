import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../reducers/reducer_login';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    let {email, password} = this.state;
    let {isLoginPending, isLoginSuccess, loginError} = this.props;
    return (
      <form name="loginForm" onSubmit={this.onSubmit}>
        <div className="form-group-collection">
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" onChange={event => this.setState({email: event.target.value})} value={email}/>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" onChange={event => this.setState({password: event.target.value})} value={password}/>
          </div>
        </div>

        <input type="submit" value="Login" />

        { isLoginPending && <div>Please wait...</div> }
        { isLoginSuccess && <div>Success.</div> }
        { loginError && <div>{loginError.message}</div> }
      </form>
    )
  }

  onSubmit(event) {
    event.preventDefault();
    let { email, password } = this.state;
    this.props.login(email, password);
    this.setState({
      email: '',
      password: ''
    });
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);