import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserThumbnail from '../UserThumbnail';

import Spinner from '../Spinner';

import './UserProfileHeader.css';

class UserProfileHeader extends Component {
  state = {
    isHeaderImageLoading: false
  };

  render() {
    const {
      username,
      isOwner,
      uploadUserImage,
      uploadHeaderImage,
      profileImageHeader: { path },
      color,
      userImage
    } = this.props;

    const changeImageHeader = isOwner ? (
      <label htmlFor="imageHeader" className="profile-header__image-upload">
        {this.state.isHeaderImageLoading ? (
          <Spinner />
        ) : (
          <i className="far fa-images" />
        )}
        <input
          type="file"
          name="file"
          id="imageHeader"
          onChange={uploadHeaderImage}
          disabled={this.state.isHeaderImageLoading ? true : false}
        />
      </label>
    ) : null;

    return (
      <div className="profile-header">
        <div
          className="profile-header__background"
          style={{ backgroundImage: `url(/uploads/images/users/${path})` }}
        >
          <div className="profile-header__user_img">
            <label htmlFor="userImage">
              <i className="fas fa-cloud-download-alt" />
              <input
                type="file"
                name="file"
                id="userImage"
                onChange={uploadUserImage}
              />
            </label>
            {userImage ? (
              <img
                src={`/uploads/images/users/${userImage.path}`}
                alt=""
                width="100%"
                height="100%"
              />
            ) : (
              <UserThumbnail
                later={username[0]}
                size="100%"
                fontSize="5rem"
                color={color}
              />
            )}
          </div>
          {changeImageHeader}
        </div>
        <div className="profile-header__bottom">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="profile-header__user-data">
                <div className="profile-header__name-nickname-status">
                  <div className="profile-header__name-nickname">
                    <span className="profile-header__fullname">
                      Oleksandr Marushchak {isOwner ? 'OWNER' : null}
                    </span>
                    <span className="profile-header__nickname">{`@${username}`}</span>
                  </div>
                  <span className="profile-header__status">
                    👌 Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="profile-header__rigth-side">
                <button className="w-btn w-btn-green">
                  <i className="fas fa-user" /> Follow
                </button>
                <button className="w-btn w-btn-grey">
                  <i className="far fa-comment" /> Message
                </button>
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

export default connect(mapStateToProps)(UserProfileHeader);
