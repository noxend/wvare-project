import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserThumbnail from '../UserThumbnail';

import { PostService } from '../../services';

import './UserPosts.css';

class UserPosts extends Component {
  state = {
    isLike: false,
    countLikes: 0,
    whoLiked: []
  };

  postService = new PostService();

  componentDidMount = () => {
    const { userId } = this.props.authReducer.user;
    this.setState({
      countLikes: this.props.likes.length,
      whoLiked: this.props.likes
    });
    this.props.likes.forEach(({ _id }) => {
      if (_id === userId) {
        this.setState({
          isLike: true,
          countLikes: this.props.likes.length
        });
      }
    });
  };

  putLike = () => {
    const { id: postId } = this.props;
    const { userId } = this.props.authReducer.user;

    this.postService
      .putLike(postId, userId)
      .then(({ data }) => {
        this.setState({
          whoLiked: data.whoLiked,
          isLike: !this.state.isLike,
          countLikes: data.whoLiked.length
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { isLike, countLikes, whoLiked } = this.state;
    const { username, color, imageUrl } = this.props;
    const { imageSrc: authorImage } = this.props.owner;

    return (
      <div className="body-profile__post">
        <div className="body-profile__header-post">
          <div className="body-profile__image-wrapper">
            {authorImage ? (
              <img src={`/uploads/images/users/${authorImage.path}`} alt="" />
            ) : (
              <UserThumbnail
                size="100%"
                later={username[0]}
                color={color}
                fontSize="1.5rem"
              />
            )}
          </div>
          <div className="body-profile__meta-post">
            <div className="body-profile__post-author">
              Oleksandr Marushchak
            </div>
            <div className="body-profile__post-date">2 minutes ago</div>
          </div>
        </div>
        <div className="body-profile__body-post">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
            soluta. Asperiores, debitis! Aut magni voluptatibus ab explicabo
            fuga possimus mollitia cupiditate amet dolores necessitatibus ea,
            ipsa blanditiis veritatis repudiandae at.
          </p>
          <div className="body-profile__post-image">
            <img
              src={`/uploads/images/posts/${imageUrl}`}
              width="100%"
              alt=""
            />
          </div>
        </div>
        <div className="body-profile__bottom-post">
          <div className="body-profile__statistics">
            <div className="post__left-side">
              <button className="post__like" onClick={this.putLike}>
                <i
                  className={`${isLike ? 'fas' : 'far'} fa-heart`}
                  style={{ color: `${isLike ? '#e53935' : null}` }}
                />
              </button>
              {countLikes === 0 ? null : countLikes}
              <ul className="post__likes_friends">
                {whoLiked.map(({ _id, color, login, imageSrc }) => {
                  return (
                    <li key={_id}>
                      <Link to={`/profile/${login}`}>
                        {imageSrc ? (
                          <img
                            src={`/uploads/images/users/${imageSrc.path}`}
                            width="100%"
                            height="100%"
                            alt=""
                          />
                        ) : (
                          <UserThumbnail
                            size="100%"
                            later={login[0]}
                            color={color}
                            fontSize=".7rem"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="post__right-side">
              <button className="post__retweet">
                <i className="fas fa-retweet" />
              </button>
              <button className="post__comments">
                <i className="far fa-comment-dots" />
              </button>
            </div>
          </div>
          <div className="body-profile__comments" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(UserPosts);
