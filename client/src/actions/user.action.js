import { UserService } from '../services';

const userService = new UserService();

export const setUserData = userId => dispatch => {
  userService
    .getUserById(userId)
    .then(({data: {result}}) => {
      dispatch({
        type: 'SET_USER_DATA',
        payload: result
      });
    })
    .catch(err => console.log(err));
};
