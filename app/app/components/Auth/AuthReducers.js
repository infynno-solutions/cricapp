const initialState = {
  isInprogress: false,
  isError: false,
  message: '',
  isLoggedIn: false,
  user: null,
};

export default function AuthReducers(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_INPROGRESS':
      return {...state, isInprogress: true, isError: false, message: ''};
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isInprogress: false,
        isError: false,
        isLoggedIn: true,
        user: action.payload,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isInprogress: false,
        isError: true,
        isLoggedIn: false,
        message: action.payload,
        user: null,
      };
    default:
      return {...state};
  }
}
