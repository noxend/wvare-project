import React, { Component } from 'react';
import validator from 'validator';

import { connect } from 'react-redux';
import { loginUser } from '../../../actions/auth';

import WCheckbox from '../../w-checkbox';
import { notifyManager } from '../../NotifyManager';

import { AuthService } from '../../../services';

import { Redirect } from 'react-router-dom';

import './LoginPage.css';

class LoginPage extends Component {
  state = {
    data: {},
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    wrongUserData: false,
    loading: false
  };

  authService = new AuthService();

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    const { username, password } = this.state;

    this.setState({
      usernameError: '',
      passwordError: '',
      wrongUserData: false
    });

    // username
    if (validator.isEmpty(username)) {
      this.setState({ usernameError: 'Field is empty!' });
      notifyManager.danger({
        title: 'username field',
        message: 'Field is empty!'
      });
    }

    if (!validator.isAlpha(username, 'en-US') && !validator.isEmpty(username)) {
      this.setState({ usernameError: 'Only latin laters!' });
      notifyManager.warning({
        title: 'username field',
        message: 'Only latin laters!'
      });
    }

    // password
    if (validator.isEmpty(password)) {
      this.setState({ passwordError: 'Field is empty!' });
      notifyManager.danger({
        title: 'password field',
        message: 'Field is empty!'
      });
    }
  };

  submitFormHandler = async e => {
    e.preventDefault();
    await this.validate();
    const { password, username, usernameError, passwordError } = this.state;
    const { loginUser } = this.props;

    const isOk = usernameError || passwordError ? false : true;

    if (isOk) {
      this.setState({ loading: true });
      this.authService
        .login(username, password)
        .then(res => {
          const data = res.data;
          loginUser(data.token);
          notifyManager.success({ title: 'success', message: 'Hello!' });
        })
        .catch(({ response }) => {
          this.setState({ wrongUserData: true, loading: false });
          notifyManager.danger({
            title: `wrong user data`,
            message: 'Wrong password or username'
          });
        });
    }
  };
 
  componentDidMount = () => {
    document.title = 'Login';
  };

  render() {
    if (this.props.authReducer.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { usernameError, passwordError, wrongUserData, loading } = this.state;

    return (
      <div className="container w-container-login-p">
        <div className="login-page">
          <div className="row">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12">
              <div className="login-page__image-wrapper" />
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12">
              <div className="login-panel__form">
                <form onSubmit={this.submitFormHandler}>
                  <div className="login-page__header">
                    <h4>Sign in to your account</h4>
                  </div>
                  <div className="login-page__body">
                    <div
                      className={`input-form-item ${
                        usernameError || wrongUserData ? 'err' : null
                      }`}
                    >
                      <label htmlFor="email_login">
                        Your email address or login
                      </label>
                      <input
                        type="text"
                        id="email_login"
                        name="username"
                        onChange={this.handleChange}
                      />
                      {usernameError ? (
                        <label htmlFor="email_login" className="">
                          {usernameError}
                        </label>
                      ) : null}
                    </div>
                    <div
                      className={`input-form-item ${
                        passwordError || wrongUserData ? 'err' : null
                      }`}
                    >
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={this.handleChange}
                      />
                      {passwordError ? (
                        <label htmlFor="email_login" className="">
                          {passwordError}
                        </label>
                      ) : null}
                      {wrongUserData ? (
                        <label htmlFor="email_login" className="">
                          Wrong password or username
                        </label>
                      ) : null}
                    </div>
                    <div className="login-page__row">
                      <WCheckbox label="Remeber me" />
                      <a href="/">Forgot your password?</a>
                    </div>
                    <div className="input-form-item">
                      <button
                        type="submit"
                        className="w-btn w-btn-dark-blue"
                        disabled={loading ? true : false}
                      >
                        {loading ? 'Please wait...' : 'Log in'}
                      </button>
                    </div>
                  </div>
                  <div className="login-page__footer">
                    <div className="w-h-line" />
                    <div className="login-page__row">
                      <div>
                        Don't have an account? <a href="/">Sign Up</a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginPage);
