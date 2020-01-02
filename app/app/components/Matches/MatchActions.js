import axios from 'axios';
import {Config} from '../../common';
import {Alert} from 'react-native';

export const fetchMatches = () => {
  const startDate = new Date().toJSON().slice(0, 10);
  const oneWeek = new Date(startDate).getDate() + 7;
  const endOn = new Date().setDate(oneWeek);
  const endDate = new Date(endOn).toJSON().slice(0, 10);

  return dispatch => {
    dispatch({type: 'MATCHS_FETCH_PENDING'});

    axios
      .get(
        `https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=${
          Config.apiKey
        }&filter[starts_between]=${startDate},${endDate}&include=localteam,visitorteam,league&sort=starting_at`,
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

export const placeBet = bet => {
  return dispatch => {
    dispatch({type: 'PLACE_BET_PENDING'});
    axios
      .post(`${Config.apiUrl}/bet`, bet)
      .then(res => {
        // console.log(res);
        if (res.data.success === true) {
          dispatch({type: 'PLACE_BET_SUCCESS'});
          dispatch(getBetsByMatch(bet.match_id));
          Alert.alert('Success', res.data.message);
        } else {
          Alert.alert('Error', res.data.message);
          dispatch({type: 'PLACE_BET_FAILURE'});
        }
      })
      .catch(err => {
        dispatch({
          type: 'PLACE_BET_FAILURE',
          message: err.response.data.message,
        });
      });
  };
};

export const getLiveScore = match_id => {
  return dispatch => {
    dispatch({type: 'LIVESCORE_FETCH_PENDING'});
    axios
      .get(
        `https://cricket.sportmonks.com/api/v2.0/livescores/${match_id}?api_token=ArAX5LcbCkLst7I0uqZRiypcFYnXUHbc8JfVefHkqZlAs3vw3TaMx5MP74nW&include=batting.batsman,batting.catchstump,batting.bowler,bowling.bowler,runs,odds,scoreboards,localteam,visitorteam`,
      )
      .then(res => {
        if (res.data.status === 'error') {
          dispatch({
            type: 'LIVESCORE_FETCH_FAILURE',
            message: res.data.message.message,
          });
        }
        dispatch({type: 'LIVESCORE_FETCH_SUCCESS', livescore: res.data.data});
      })
      .catch(err => {
        dispatch({
          type: 'LIVESCORE_FETCH_FAILURE',
          message: err.response.data.message.message,
        });
      });
  };
};
