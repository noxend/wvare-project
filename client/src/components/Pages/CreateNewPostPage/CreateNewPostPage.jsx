import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PostService } from '../../../services';
import { notifyManager } from '../../NotifyManager';

import './CreateNewPostPage.css';

import Spinner from '../../Spinner';

class CreateNewPostPage extends Component {
  postService = new PostService();

  state = {
    title: '',
    text: '',
    imagePreview: [],
    headerImageData: {},
    isHeaderImageLoading: false,
    loading: false,
    postid: '',
    status: ''
  };

  fileUpload = e => {
    const file = new FormData();
    file.append('file', e.target.files[0]);

    this.setState({ loading: true });
    this.postService
      .uploadImage(file)
      .then(({ data }) => {
        console.log(data);
        const newArr = this.state.imagePreview;
        newArr.push(data[2].w560q50);
        this.setState({ imagePreview: newArr, loading: false });
      })
      .catch(err => console.log(err));
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      id: this.state.postid,
      title: this.state.title,
      text: this.state.text,
      headerImageData: this.state.headerImageData,
    };

    console.log(data);

    this.postService
      .create(data)
      .then(({ data }) => {
        this.setState({ status: data.status });
        notifyManager.success({title: 'success', message: 'The article was published'});
      })
      .catch(err => console.log(err));
  };

  uploadHeaderImage = e => {
    this.setState({ isHeaderImageLoading: true });
    
    const file = new FormData();
    file.append('file', e.target.files[0]);
    e.target.value = null;

    this.postService
      .uploadHeaderImage(file)
      .then(({ result }) => {
        this.setState({ headerImageData: result.data.upload, isHeaderImageLoading: false });
      })
      .catch(err => console.log(err));
  };

  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  onChangeText = e => {
    this.setState({ text: e.target.value });
  };

  removePost = e => {
    // TODO:
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.postService.initPost(id).then(({ data }) => {
      this.setState({
        postid: data._id
      });
    });
  };

  render() {
    const {
      title,
      headerImageData: { path },
      isHeaderImageLoading
    } = this.state;

    const imagePreview = this.state.imagePreview.map((item, index) => {
      return (
        <img
          key={index}
          src={`/uploads/images/${item}`}
          width="120"
          height="80"
          alt=""
        />
      );
    });

    const status =
      this.state.status !== 'draft' ? (
        <div className="create-post__status">Draft</div>
      ) : null;

    return (
      <React.Fragment>
        <div className="container-fluid header-post">
          <div
            className="header-image"
            style={{ backgroundImage: `url(/uploads/images/posts/${path})` }}
          />
          <div className="image-filter" />
          <div className="container header-content">
            <label
              htmlFor="imageHeader"
              className="header-content__image-upload">
              {this.state.isHeaderImageLoading ? <Spinner /> : <i className="far fa-images" />}
              <input
                type="file"
                name="file"
                id="imageHeader"
                onChange={this.uploadHeaderImage}
                disabled={this.state.isHeaderImageLoading ? true : false}
              />
            </label>
            <div className="header-content__bottom">
              <h1 className="title-post">
                {title ? title : 'Your title here'}
              </h1>
              <div className="post-meta-data">
                <img
                  src="https://avatars2.githubusercontent.com/u/35522827?s=460&v=4"
                  width="30px"
                  alt=""
                />
                <a href="">Noxend</a>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="create-post">
            <form onSubmit={this.onSubmit}>
              <div className="create-post-header">
                <h4>Create a new post</h4>
                {status}
              </div>
              <div className="create-post-body">
                <div className="w-form-item">
                  <label htmlFor="email_login">Enter title</label>
                  <input
                    type="text"
                    id="email_login"
                    name="title"
                    onChange={this.onChangeTitle}
                    value={title}
                  />
                </div>
                <div className="w-form-item">
                  <label htmlFor="text">Text</label>
                  <textarea
                    name="text"
                    id="text"
                    cols="30"
                    rows="10"
                    onChange={this.onChangeText}
                  />
                </div>
                <div className="create-post-file-info">
                  {imagePreview}
                  <label className="w-file-upload btn-grey" htmlFor="file">
                    {this.state.loading ? (
                      <Spinner />
                    ) : (
                      <i className="fas fa-plus" />
                    )}
                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={this.fileUpload}
                      disabled={this.state.loading ? true : false}
                    />
                  </label>
                </div>
                <button type="submit" className="w-btn w-btn-grey" disabled={isHeaderImageLoading ? true : false} >
                  Save as draft
                </button>
                <button type="submit" className="w-btn w-btn-green" disabled={isHeaderImageLoading ? true : false} >
                  Post
                </button>
              </div>
              <div className="create-post-bottom" />
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(CreateNewPostPage);
