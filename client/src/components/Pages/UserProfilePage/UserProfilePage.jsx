import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserProfilePage.css';
import { UserService } from '../../../services';
import UserProfileHeader from '../../UserProfileHeader';

class UserProfilePage extends Component {
  userService = new UserService();

  state = {
    userData: {},
    imageHeaderData: {},
    isOwner: false,
    dataIsLoaded: false
  };

  uploadHeaderImage = e => {
    const file = new FormData();
    file.append('file', e.target.files[0]);
    e.target.value = null;

    this.userService
      .uploadHeaderImage(file)
      .then(({result: { data }}) => {
        this.setState({ imageHeaderData: data.upload }, () => {
          console.log('State has been updated');
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    const { username } = this.props.match.params;
    document.title = `@${username}`;
    this.userService
    .getUserByUsername(username)
    .then(({ data: { result } }) => {
      this.setState(
        {
          userData: result,
          imageHeaderData: result.profileImageHeader ? result.profileImageHeader : { path: 'morrison/1d7sfffkp.jpg' },
          dataIsLoaded: true
        },
        () => {
          const { login } = this.props.authReducer.user;
          if (username === login) {
            this.setState({ isOwner: true });
          }
        }
      );
    })
    .catch(err => console.log(err));
  }

  render() {
    const {
      userData: { login },
      isOwner,
      imageHeaderData,
      dataIsLoaded
    } = this.state;

    return (
      <div className="user-profile-page">
        {dataIsLoaded ? (
          <UserProfileHeader
            username={login}
            isOwner={isOwner}
            profileImageHeader={imageHeaderData}
            uploadHeaderImage={this.uploadHeaderImage}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(UserProfilePage);
