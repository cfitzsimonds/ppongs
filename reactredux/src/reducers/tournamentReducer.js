import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tournamentReducer(state = initialState.tournaments , action) {
  switch(action.type){
    case types.LOAD_TOURNAMENTS_SUCCESS:
      return action.tournaments;
    case types.CREATE_TOURNAMENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.tournament)
      ];
    case types.UPDATE_TOURNAMENT_SUCCESS:
      return [
        ...state.filter(tournament => tournament.uid !== action.tournament.uid),
        Object.assign({}, action.tournament)
      ];

    default:
      return state;
  }
}
