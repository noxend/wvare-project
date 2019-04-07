
import isEmpty from '../utils/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGGED':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload)
      };

    case 'USER_LOGOUT':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload)
      };
      
    default:
      return state;
  }
}

export default reducer;
