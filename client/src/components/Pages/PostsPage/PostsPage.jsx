import React, { Component } from 'react';

import './PostsPage.css';

import ItemCard from '../../ItemCard';

import { PostService } from '../../../services/';

export default class PostsPage extends Component {
  state = {
    data: []
  };

  service = new PostService();

  componentDidMount = () => {
    this.service.getAllPosts().then(({ data: { data } }) => {
      this.setState({
        data
      });
    });
  };

  render() {
    const { data } = this.state;

    const cards = data.map(
      ({ _id, imageHeader: { path }, link, user: { login } }, index) => {
        return <ItemCard key={_id} image={path} link={link} author={login} />;
      }
    );

    return (
      <div className="container post-page">
        <div className="row">{cards}</div>
      </div>
    );
  }
}
