import React, { Component } from 'react';

import { connect } from 'react-redux';

import Navigation from '../Navigation';

// import LoginPage from '../Pages/LoginPage';
import CreateNewPostPage from '../Pages/CreateNewPostPage';
import PostsPage from '../Pages/PostsPage';
import LoginPage from '../Pages/LoginPage';
import UserProfilePage from '../Pages/UserProfilePage';

import { UserService } from '../../services';

import { NotifyContainer } from '../NotifyManager';
import LogOut from '../LogOut';
import { setUserData } from '../../actions/user.action';

import './App.css';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {

  userService = new UserService;
  
  componentDidMount = () => {
    const { authReducer } = this.props;
    const { setUserData } = this.props;
    this.userService.getUserById(authReducer.user.userId).then(({ data }) => {
      setUserData({
        userData: data.result
      });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <div className="app">
          <Switch>
            <Route path="/" exact component={PostsPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route
              path="/profile/:username"
              exact
              component={UserProfilePage}
            />
            <Route path="/post/:id" exact component={CreateNewPostPage} />
            <Route path="/logout" exact component={LogOut} />
            <Redirect to="/" />
          </Switch>
        </div>
        <NotifyContainer />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { setUserData }
)(App);
