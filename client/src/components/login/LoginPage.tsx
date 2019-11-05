import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './LoginPage.css';
import { setLoginInput, setIsAuthenticated, setLoggedUser } from '../../redux/actions/ui.action';

interface LoginProps {
  // setLoginInput: (loginInput: any) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setLoggedUser: (loggedUser: any) => void;
  loggedUser: any;
  isAuthenticated: boolean;
  // loginInput: any;
}

interface LoginState {
  usernameInput: string,
  passwordInput: string,
  isShowPassword: boolean;
}

class LoginPage extends React.Component<LoginProps, LoginState> {
  constructor(props: any) {
    super(props)
    this.state = {
      usernameInput: "",
      passwordInput: "",
      isShowPassword: false
    }
  }

  signIn = () => {
    const params = { username: this.state.usernameInput, password: this.state.passwordInput }
    axios.post("http://localhost:5000/auth/login", params)
    .then(res => {
        this.props.setLoggedUser(res.data.user)
        this.props.setIsAuthenticated(res.data.isAuthenticated)
      })
  }

  setEmailInput = (event) => { this.setState({ usernameInput: event.target.value }) }

  toggleShowPassword = () => { this.setState({ isShowPassword: !this.state.isShowPassword }) }

  getShowOrHide = () => !this.state.isShowPassword ? "show" : "hide"

  inputPassword = (event) => this.setState({ passwordInput: event.target.value })

  setClass = () => this.state.isShowPassword ? "" : "password"

  render() {
    return (
      <div className="loginPage">
        <div className="logo">
          <div className="projectory">
            Projectory
          </div>
        </div>
        <div className="content">
          <div className="sign_in">
            Sign In
          </div>
          <label className="details_lbl login_label">Enter your details below</label>
          <label className="email_lbl login_label">Email Address</label>
          <div>
            <input type="text" className="emailInput input_class" placeholder="Type your email here" onChange={(e) => this.setEmailInput(e)} />
          </div>
          <div className="password_content">
            <label className="password_lbl login_label">Password</label>
            <label className="forgot_password_lbl login_label">Forgot your password?</label>
          </div>
          <div className="password_wrapper">
            <input type={this.setClass()} className="passwordInput input_class" placeholder="Type your password here" onChange={(e) => this.inputPassword(e)} />
            <div className={"password_icon_" + this.getShowOrHide()}><img src={"images/assets/shared/" + this.getShowOrHide() + "_password.svg"} onClick={this.toggleShowPassword} /> </div>
          </div>
          <div className="button_fill">
            <div className="sign_in_rectangle control" onClick={this.signIn}>
              <div className="control_text">Sign in</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {

  return {
    // loginInput: state.ui.loginInput,
    loggedUser: state.ui.loggedUser
  }
}

const loginActions = (dispatch: any) => {
  return {
    // setLoginInput: (payload: any) => setLoginInput(dispatch, payload),
    setLoggedUser: (payload: any) => setLoggedUser(dispatch, payload),
    setIsAuthenticated: (payload: any) => setIsAuthenticated(dispatch, payload)
  };
}

export default connect(
  mapStateToProps,
  loginActions,
)(LoginPage)