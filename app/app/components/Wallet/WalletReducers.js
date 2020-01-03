const initialState = {
  isLoading: false,
  error: false,
  message: '',
  balance: null,
};

export default function WalletReducers(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_BALANCE_PENDING':
      return {...state, isLoading: true, error: false, message: ''};
    case 'FETCH_BALANCE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: false,
        message: '',
        balance: action.balance,
      };
    case 'FETCH_BALANCE_FAILURE':
      return {...state, isLoading: false, error: true, message: action.message};
    default:
      return {...state};
  }
}
