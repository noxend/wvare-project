import React, { Component } from 'react';

import uuid from 'uuid/v4';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/auth';
import './UserWidget.css';

class UserWidget extends Component {
  componentDidMount() {
    document
      .getElementsByClassName('user-widget')[0]
      .addEventListener('click', e => {
        // e.stopPropagation();
      });
  }

  render() {

    const { authReducer: { user: { role, login } }, logoutUser } = this.props;

    const imageWrapper = {
      backgroundImage:
        'URL(https://images.wallpaperscraft.ru/image/gory_vid_sverhu_zasnezhennyj_137215_1280x720.jpg)'
    };

    const dashboard =
    role === 'ADMIN' ? (
        <li className="user-widget__item">
          <Link to="/login">
            <i className="fas fa-chart-line" /> Dashboard
          </Link>
        </li>
      ) : null;

    return (
      <div className="user-widget">
        <div className="user-widget__header">
          <div className="user-widget__image-wrapper" style={imageWrapper} />
          <div className="user-widget__gradient" />
          <div className="user-widget__header-content">
            <img
              src="https://avatars2.githubusercontent.com/u/35522827?s=460&v=4"
              alt="user_image"
            />
            <span>Oleksandr Marushchak</span>
            <span>@{login}</span>
          </div>
        </div>
        <div className="user-widget__body">
          <ul>
            {dashboard}
            <li className="user-widget__item">
              <Link to={`/profile/${login}`}>
                <i className="fas fa-user" /> Profile
              </Link>
            </li>
            <li className="user-widget__item">
              <Link to={`/post/${uuid()}`}>
                <i className="fas fa-sign-out-alt" />
                Write a new post
              </Link>
            </li>
            <li>
              <button onClick={logoutUser}>sasds</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(UserWidget);
