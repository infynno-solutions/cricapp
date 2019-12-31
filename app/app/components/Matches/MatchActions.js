// import axios from 'axios';
import matches from './matches.json';

export const fetchMatches = () => {
  return dispatch => {
    dispatch({type: 'MATCHS_FETCH_PENDING'});

    // axios
    //   .get('matches.json')
    //   .then(res => {
    //     console.log(res);
    dispatch({type: 'MATCHS_FETCH_SUCCESS', payload: matches.matches});
    // })
    // .catch(err => {
    //   console.log(err);
    // dispatch({
    //   type: 'MATCHS_FETCH_FAILURE',
    //   payload: err.response.data.message,
    // });
    // });
  };
};
