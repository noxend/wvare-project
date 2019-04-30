import React from 'react';
import { Link } from 'react-router-dom';

import './UserFriends.css';

export default function UserFriends({ friends, curentUser }) {
  return (
    <div className="user-friends">
      <div className="user-friends__header">
        {friends.length === 1 ? 'Friend' : `Friends ${friends.length}`}
      </div>
      <div className="user-friends__body">
        <ul>
          {friends.map(({ secondUser, firstUser, _id }) => {
            if (firstUser.login === curentUser) {
              return (
                <li key={_id}>
                  <Link to={`/profile/${secondUser.login}`}>
                    <div className="user-friends__image-wrapper">
                      <img
                        src={`/uploads/images/users/${
                          secondUser.imageSrc.path
                        }`}
                        alt=""
                      />
                    </div>
                    <div className="user-friends__data">
                      <span>{secondUser.login}</span>
                      <span>@{secondUser.login}</span>
                    </div>
                  </Link>
                </li>
              );
            } else {
              return (
                <li key={_id}>
                  <Link to={`/profile/${firstUser.login}`}>
                    <div className="user-friends__image-wrapper">
                      <img
                        src={`/uploads/images/users/${
                          firstUser.imageSrc.path
                        }`}
                        alt=""
                      />
                    </div>
                    <div className="user-friends__data">
                      <span>{firstUser.login}</span>
                      <span>@{firstUser.login}</span>
                    </div>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}
