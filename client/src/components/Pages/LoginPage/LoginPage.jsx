import React, { Component } from 'react';

import { connect } from 'react-redux';
import { loginUser } from '../../../actions/auth';

import JWTDecode from 'jwt-decode';

import WCheckbox from '../../w-checkbox';
import ApiService from '../../../services/api.service';

import { Redirect } from 'react-router-dom';

import './LoginPage.css';

class LoginPage extends Component {
  state = {
    data: {}
  };

  apiService = new ApiService();

  submitFormHandler = e => {
    e.preventDefault();

    const password = e.target.password.value;
    const login = e.target.emailLogin.value;

    const { loginUser } = this.props;

    loginUser(login, password);
  };

  componentDidMount() {
    document.title = 'Login';
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

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
                    <div className="input-form-item">
                      <label htmlFor="email_login">
                        Your email address or login
                      </label>
                      <input type="text" id="email_login" name="emailLogin" />
                    </div>
                    <div className="input-form-item err">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" />
                    </div>
                    <div className="login-page__row">
                      <WCheckbox label="Remeber me" />
                      <a href="/">Forgot your password?</a>
                    </div>
                    <div className="input-form-item">
                      <button type="submit" className="button button-dark-blue">
                        Sing In
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

const mapStateToProps = ({ isAuthenticated }) => {
  return { isAuthenticated };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(LoginPage);
