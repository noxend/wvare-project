
const initialState = {
  userData: {},
  isLoaded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        isLoaded: true,
        userData: action.payload
      };

    default:
      return state;
  }
}

export default reducer;