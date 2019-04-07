import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.css';

import { ProviderApi } from './context';
import { Provider as ProviderRedux } from 'react-redux';
import store from './store';
import service from './services/api.service';

import App from './components/APP';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/auth';
import jwtDecode from 'jwt-decode';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
  <ProviderRedux store={store}>
    <ProviderApi value={service}>
      <App />
    </ProviderApi>
  </ProviderRedux>,
  document.getElementById('root')
);
