const initialState = {
  isLoading: false,
  error: false,
  message: '',
  matches: null,
  getBetsByMatch: {
    loading: false,
    bets: null,
    error: false,
    message: '',
  },
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
    case 'BETS_BY_MATCH_FETCH_PENDING':
      return {
        ...state,
        getBetsByMatch: {loading: false, error: false, message: ''},
      };
    case 'BETS_BY_MATCH_FETCH_SUCCESS':
      return {
        ...state,
        getBetsByMatch: {
          loading: false,
          error: false,
          message: '',
          bets: action.bets,
        },
      };
    case 'BETS_BY_MATCH_FETCH_FAILURE':
      return {
        ...state,
        getBetsByMatch: {loading: false, error: true, message: action.message},
      };
    default:
      return {...state};
  }
}
