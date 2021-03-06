import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserWidget from '../UserWidget';

import { Link } from 'react-router-dom';

import logo from './wvare.png';
import './Navigation.css';

class Navigation extends Component {
 
  timer = null;
  element = null;

  state = {
    isOpen: false
  };


  openUserWidget = () => {
    this.setState({ isOpen: true }, () => {
      document.addEventListener('click', this.closeUserWidget);
    });
  };

  closeUserWidget = () => {

    const { isAuthenticated } = this.props.authReducer;

    if (this.state.isOpen && isAuthenticated) {
      const el = document.getElementsByClassName('user-widget')[0];
      el.classList.add('hide');
      this.timer = setTimeout(() => {
        this.setState({ isOpen: false }, () => {
          document.removeEventListener('click', this.closeUserWidget);
        });
      }, 200);
    }
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {

    const { isOpen } = this.state;

    const userWidget = isOpen ? <UserWidget /> : null;

    const { isAuthenticated, user: { login } } = this.props.authReducer;
    
    return (
      <nav className="navigation">
        <div className="container">
          <div className="navigation__content">
            <div className="navigation__left-side">
              <Link to="/">
                <img src={logo} alt="logo" height="16" />
              </Link>
            </div>
            <div className="navigation__rigth-side">
              {!isAuthenticated ? (
                <div className="navigation__tabs--lg">
                  <ul>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <React.Fragment>
                  <div className="navigation__vertical-line" />
                  <div className="navigation__user-widget">
                    <div
                      className="navigation__nav-icon"
                      onClick={this.openUserWidget}>
                      <div className="navigation__user-image">
                        <img
                          src="https://avatars2.githubusercontent.com/u/35522827?s=460&v=4"
                          alt="user_image"
                          height="42"
                        />
                      </div>
                      <i
                        className={`fas fa-angle-down ml-1 ${
                          isOpen ? 'active' : null
                        }`}
                      />
                      <div className="navigation__user-name">
                        <span>Oleksadnr Marushchak</span>
                        <span>@{login}</span>
                      </div>
                    </div>
                    {userWidget}
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Navigation);
