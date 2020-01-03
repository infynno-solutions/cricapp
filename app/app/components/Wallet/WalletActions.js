import axios from 'axios';
import {Config} from '../../common';

export const fetchBalance = () => {
  return dispatch => {
    dispatch({type: 'FETCH_BALANCE_PENDING'});

    axios
      .get(`${Config.apiUrl}/wallet/balance`)
      .then(res => {
        dispatch({type: 'FETCH_BALANCE_SUCCESS', balance: res.data.balance});
      })
      .catch(err => {
        dispatch({
          type: 'FETCH_BALANCE_FAILURE',
          message: err.response.data.message,
        });
      });
  };
};
