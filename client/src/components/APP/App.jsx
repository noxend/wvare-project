import React, { Component } from 'react';

import { connect } from 'react-redux';

import Navigation from '../Navigation';

// import LoginPage from '../Pages/LoginPage';
import CreateNewPostPage from '../Pages/CreateNewPostPage';
import PostsPage from '../Pages/PostsPage';
import LoginPage from '../Pages/LoginPage';
import UserProfilePage from '../Pages/UserProfilePage';

import { setUserData } from '../../actions/user.action';

import './App.css';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <div className="app">
          <Switch>
            <Route path="/" exact component={PostsPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/profile/:username" exact component={UserProfilePage} />
            <Route path="/post/:id" component={CreateNewPostPage} />
            <Redirect to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return state;
};


export default connect(mapStateToProps, {setUserData})(App);
