import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function leagueReducer(state = initialState.leagues , action) {
  switch(action.type){
    case types.LOAD_LEAGUES_SUCCESS:
      return action.leagues;
    case types.CREATE_LEAGUE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.league)
      ];
    case types.UPDATE_LEAGUE_SUCCESS:
      return [
        ...state.filter(league => league.uid !== action.league.uid),
        Object.assign({}, action.league)
      ];

    default:
      return state;
  }
}
