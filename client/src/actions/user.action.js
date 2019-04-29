import { UserService } from '../services';


export const setUserData = result => dispatch => {
  if(result.userData) {
    dispatch({
      type: 'SET_USER_DATA',
      payload: result.userData
    });
  }
};
