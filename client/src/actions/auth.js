import WebApiService from '../services/api.service';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

const service = new WebApiService();

export const setCurrentUser = payload => {
  return {
    type: 'USER_LOGGED',
    payload
  };
};

export const delCurrentUser = payload => {
  return {
    type: 'USER_LOGGED',
    payload
  };
};

export const loginUser = (token) => dispatch => {
  if (token) {
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch(setCurrentUser(jwtDecode(token)));
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(delCurrentUser({}));
};
