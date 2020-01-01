import axios from 'axios';
import {Config} from '../../common';

export const fetchMatches = () => {
  return dispatch => {
    dispatch({type: 'MATCHS_FETCH_PENDING'});

    axios
      .get(
        `https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=${
          Config.apiKey
        }&filter[status]=NS&include=localteam,visitorteam,league&sort=starting_at`,
      )
      .then(res => {
        // console.log();
        dispatch({type: 'MATCHS_FETCH_SUCCESS', payload: res.data.data});
      })
      .catch(err => {
        dispatch({
          type: 'MATCHS_FETCH_FAILURE',
          message: err.response,
        });
      });
  };
};

export const getBets = () => {
  return dispatch => {
    dispatch({type: 'BETS_FETCH_PENDING'});
    axios
      .get(`${Config.apiUrl}/bets`)
      .then(res => {
        if (res.data.success === true) {
          dispatch({type: 'BETS_FETCH_SUCCESS', payload: res.data.bets});
        } else {
          dispatch({type: 'BETS_FETCH_FAILURE'});
        }
      })
      .catch(err => {
        dispatch({type: 'BETS_FETCH_FAILURE', payload: err.response.data});
      });
  };
};

export const getBetsByMatch = id => {
  return dispatch => {
    dispatch({type: 'BETS_BY_MATCH_FETCH_PENDING'});
    axios
      .get(`${Config.apiUrl}/bet/match/${id}`)
      .then(res => {
        // console.log(res);
        if (res.data.success === true) {
          dispatch({
            type: 'BETS_BY_MATCH_FETCH_SUCCESS',
            bets: res.data.bets,
          });
        } else {
          dispatch({type: 'BETS_BY_MATCH_FETCH_FAILURE'});
        }
      })
      .catch(err => {
        dispatch({
          type: 'BETS_BY_MATCH_FETCH_FAILURE',
          payload: err.response.data,
        });
      });
  };
};
