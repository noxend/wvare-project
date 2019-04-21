import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserProfilePage.css';
import { UserService, PostService } from '../../../services';

import UserProfileHeader from '../../UserProfileHeader';
import UserPosts from '../../UserPosts';
import LineLoader from '../../LineLoader';

class UserProfilePage extends Component {
  userService = new UserService();
  postService = new PostService();

  state = {
    userData: {},
    imageHeaderData: {},
    posts: [],
    isOwner: false,
    isUserDataLoaded: false,
    isUsersPostsLoaded: false,
  };

  uploadHeaderImage = e => {
    const file = new FormData();
    file.append('file', e.target.files[0]);
    e.target.value = null;

    this.userService
      .uploadHeaderImage(file)
      .then(({ result: { data } }) => {
        this.setState({ imageHeaderData: data.upload }, () => {
          console.log('State has been updated');
        });
      })
      .catch(err => console.log(err));
  };

  componentDidUpdate = (prevProps) => {
    const { username: prevUsername } = prevProps.match.params;
    const { username } = this.props.match.params;

    if (prevUsername !== username) {
      document.title = `@${username}`;
      this.getData();
    }
  };

  getData = () => {
    const { username } = this.props.match.params;

    this.setState({
      isUserDataLoaded: false,
      isUsersPostsLoaded: false
    });

    this.postService
      .getUsersPosts(username)
      .then(({ data: result }) => {

        this.setState({
          posts: result.result,
          isUsersPostsLoaded: true
        });
      })
      .catch(err => console.log(err));

    this.userService
      .getUserByUsername(username)
      .then(({ data: { result } }) => {
        this.setState(
          {
            userData: result,
            imageHeaderData: result.profileImageHeader
              ? result.profileImageHeader
              : { path: 'morrison/1d7sfffkp.jpg' },
            isUserDataLoaded: true
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
  };

  componentDidMount = async () => {
    const { username } = this.props.match.params;
    document.title = `@${username}`;
    this.getData();
  };

  render() {
    const {
      userData: { login, color = '#c62828' },
      isOwner,
      imageHeaderData,
      isUserDataLoaded,
      isUsersPostsLoaded,
      posts
    } = this.state;


    if(!isUserDataLoaded || !isUsersPostsLoaded) {
      return <LineLoader />
    }


    return (
      <React.Fragment>
        {isUserDataLoaded && isUsersPostsLoaded ? (
          <div className="user-profile-page">
            <div className="container">
              <UserProfileHeader
                username={login}
                color={color}
                isOwner={isOwner}
                profileImageHeader={imageHeaderData}
                uploadHeaderImage={this.uploadHeaderImage}
              />
            </div>
            <div className="container">
              <div className="body-profile" style={{ marginTop: '24px' }}>
                <div className="row">
                  <div className="col col-lg-8 col-sm-12">
                    {posts.map(
                      ({
                        _id,
                        likes,
                        user: { login, color },
                        imageHeader: { path }
                      }) => {
                        return (
                          <UserPosts
                            key={_id}
                            id={_id}
                            username={login}
                            color={color}
                            imageUrl={path}
                            likes={likes}
                          />
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(UserProfilePage);
