import React, { Component } from 'react';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';
import UserThumbnail from '../UserThumbnail';
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
    const {
      userImage,
      color,
      role,
      username,
      userHeaderImage
    } = this.props;

    const imageWrapper = {
      backgroundImage:
        `URL(${`/uploads/images/users/${userHeaderImage.path}`})`
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
            {userImage ? (
              <img
                src={`/uploads/images/users/${userImage.path}`}
                alt=""
                width="88"
                height="88"
              />
            ) : (
              <UserThumbnail
                later={username[0]}
                size="88px"
                fontSize="3rem"
                color={color}
              />
            )}
            <span>Oleksandr Marushchak</span>
            <span>@{username}</span>
          </div>
        </div>
        <div className="user-widget__body">
          <ul>
            {dashboard}
            <li className="user-widget__item">
              <Link to={`/profile/${username}`}>
                <i className="fas fa-user" /> Profile
              </Link>
            </li>
            <li className="user-widget__item">
              <Link to={`/post/${uuid()}`}>
                <i className="fas fa-sign-out-alt" />
                Write a new post
              </Link>
            </li>
            <li className="user-widget__item">
              <Link to="/logout">
                <i className="fas fa-sign-out-alt" />
                Log out
              </Link>
            </li>
          </ul>
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
  { logoutUser }
)(UserWidget);
