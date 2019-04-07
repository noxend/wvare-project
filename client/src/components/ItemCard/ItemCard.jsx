import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ItemCard.css';

export default class ItemCard extends Component {
  render() {

    const { image, link, author } = this.props;

    return (
      <div className="col-lg-4 col-md-6 col-sm-12">
        <div className="item-card">
          <div className="item-card__header">
            <div className="item-card__image-wrapper">
              <img
                src={`/uploads/images/posts/${image}`}
                alt=""
              />
            </div>
            <div className="item-card__image-filter" />
          </div>
          <div className="item-card__body p-3">
            <Link to="/" className="item-card__title">
              {link}
            </Link>
            <p>
              Miller's daughter and Artyom’s wife, Anna is your advisor and will
              also provide support on missions away from The Aurora. She is
              regarded as the best sniper amongst the Spartan Rangers, so you
              can feel at ease with her watching your back. Anna is known for
              her indomitable attitude, but she still believes in kindness,
              compromise, and forgiveness, and will advocate for finding a
              peaceful solution where possible.
            </p>
            <button className="w-btn w-btn-dark-blue">asfasf</button>
          </div>
          <div className="item-card__blur" />
          <div className="item-card__bottom px-3">
            <div>
              <div className="item-card__author">
                BY <Link to="/">{author}</Link> - 12 HOURS AGO
              </div>
              <div className="item-card__vl" />
              <div className="item-card__comments">
                <i className="far fa-comment-dots" />
                <span>7</span>
              </div>
              <div className="item-card__vl" />
              <div className="item-card__likes">
                <div className="item-card__like">
                  <i className="fas fa-thumbs-up" />
                  <span>13</span>
                </div>
                <div className="item-card__deslike">
                  <i className="far fa-thumbs-down deslike" />
                  <span>2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
