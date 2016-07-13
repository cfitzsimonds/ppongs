import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function liveReducer(state = initialState.lives , action) {
  switch(action.type){
    case types.LOAD_LIVES_SUCCESS:
      return action.lives;
    case types.CREATE_LIVE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.live)
      ];
    case types.UPDATE_LIVE_SUCCESS:
      return [
        ...state.filter(live => live.name !== action.live.name),
        Object.assign({}, action.live)
      ];

    default:
      return state;
  }
}
