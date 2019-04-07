import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../Spinner';

import './UserProfileHeader.css';

class UserProfileHeader extends Component {
  state = {
    isHeaderImageLoading: false
  };
  
  render() {

    const { username, isOwner, uploadHeaderImage, profileImageHeader: { path } } = this.props;

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
      <div className="container">
        <div className="profile-header">
          <div className="profile-header__background" style={{backgroundImage: `url(/uploads/images/users/${path})`}}>
            {changeImageHeader}
          </div>
          <div className="profile-header__bottom">
            <div className="row">
              <div className="col col-lg-8 col-sm-12">
                <div className="profile-header__user-data">
                  <img
                    src="https://avatars2.githubusercontent.com/u/35522827?s=460&v=4"
                    alt=""
                  />
                  <div className="profile-header__name-nickname-status">
                    <div className="profile-header__name-nickname">
                      <span className="profile-header__fullname">
                        Oleksandr Marushchak {isOwner ? 'OWNER' : null}
                      </span>
                      <span className="profile-header__nickname">{`@${username}`}</span>
                    </div>
                    <span className="profile-header__status">
                      👌 Lorem ipsum dolor sit amet consectetur adipisicing
                      elit.
                    </span>
                  </div>
                </div>
              </div>
              <div className="col col-lg-4 col-sm-12">
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(UserProfileHeader);
