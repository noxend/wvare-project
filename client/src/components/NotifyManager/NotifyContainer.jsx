import React, { Component } from 'react';

import NotifyItem from './NotifyItem';
import { notifyManager } from './'

import './NotifyManager.css';

export default class NotificationContainer extends Component {

  state = {
    notifications: []
  };

  handleStoreChange = notifications => {
    this.setState({
      notifications
    });
  };

  handleRequestHide = id => {
    notifyManager.remove(id);
  };

  componentDidMount = () => {
    notifyManager.addChangeListener(this.handleStoreChange);
  };

  componentWillUnmount = () => {
    notifyManager.removeChangeListener(this.handleStoreChange);
  };

  render() {
    const { notifications } = this.state;

    const isEmpty =
      notifications.length !== 0 ? (
        <div className="notification-container">
          {notifications.map(({ id, message, type, timeOut, title }) => {
            return (
              <NotifyItem
                key={id}
                id={id}
                msg={message}
                title={title}
                type={type}
                timeOut={timeOut}
                onRequestHide={this.handleRequestHide}
              />
            );
          })}
        </div>
      ) : null;

    return isEmpty;
  }
}
