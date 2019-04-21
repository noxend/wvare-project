import React, { Component } from 'react';

export default class NotificationItem extends Component {
  nativeSetTimeout = setTimeout;

  state = {
    progresBar: 100
  };

  componentDidMount = () => {
    const { timeOut } = this.props;
    this.timer = setTimeout(() => {
      this.close();
    }, timeOut);
    this.interval = setInterval(() => {
      if (this.state.progresBar >= 0) {
        this.setState({
          progresBar: this.state.progresBar - 1
        });
      }
    }, timeOut / 100);
  };

  close = () => {
    const { onRequestHide, id } = this.props;
    this.refs.notification.classList.add('notification--close');
    this.timerAnim = setTimeout(() => {
      onRequestHide(id);
    }, 200);
  };

  componentWillUnmount = () => {
    clearTimeout(this.timer);
    clearTimeout(this.timerAnim);
    clearInterval(this.interval);
  };

  onMouseOver = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  onMouseLeave = () => {
    const { timeOut, onRequestHide, id } = this.props;
    this.timer = setTimeout(() => onRequestHide(id), timeOut);
    console.log('Timeout is working');
  };

  render() {
    const { title, msg, type } = this.props;
    let icon = null;

    switch (type) {
      case 'success':
        icon = <i className="fas fa-check-circle icon" />;
        break;
      case 'info':
        icon = <i className="fas fa-info-circle icon" />;
        break;
      case 'danger':
        icon = <i className="fas fa-fire icon" />;
        break;
      case 'warning':
        icon = <i className="fas fa-exclamation-triangle icon" />;
        break;
      case 'custom':
        icon = (
          <span role="img" aria-label="emoji" className="icon">
            🤨
          </span>
        );
        break;
      default:
        icon = null;
        break;
    }

    return (
      <div className={`notification notification-${type}`} ref="notification">
        <div className="notification__body">
          {icon}
          <div className="notification__description">
            <div className="notification__title">{title}</div>
            <div className="notification__text">{msg}</div>
          </div>
          <button className="close-notification" onClick={this.close}>
            <i className="fas fa-times" />
          </button>
        </div>
        <div
          className="notification__progres-bar"
          style={{ width: `${Math.floor(this.state.progresBar)}%` }}
        />
      </div>
    );
  }
}
