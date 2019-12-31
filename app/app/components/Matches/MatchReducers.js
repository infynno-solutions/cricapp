const initialState = {
  isLoading: false,
  error: false,
  message: '',
  matches: null,
};

export default function MatchReducers(state = initialState, action) {
  switch (action.type) {
    case 'MATCHS_FETCH_PENDING':
      return {...state, isLoading: true, error: false, message: ''};
    case 'MATCHS_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: false,
        message: '',
        matches: action.payload,
      };
    case 'MATCHS_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.message,
        matches: null,
      };
    default:
      return {...state};
  }
}
