import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logoutUser } from '../../actions/auth';

class LogOut extends Component {
  componentDidMount = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };

  render() {
    return <Redirect to="/login" />;
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(LogOut);
