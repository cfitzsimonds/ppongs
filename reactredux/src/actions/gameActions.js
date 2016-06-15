import * as types from './actionTypes';
import gameApi from '../api/ppongApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadGamesSuccess(games){
  return { type: types.LOAD_GAMES_SUCCESS , games: games};
}

export function createGameSuccess(game) {
  return { type: types.CREATE_GAME_SUCCESS, game};
}

export function updateGameSuccess(game) {
  return {type: types.UPDATE_GAME_SUCCESS, game};
}

export function loadGames() {
  return function(dispatch){
    dispatch(beginAjaxCall());
    return gameApi.getAllGames().then(games => {
      dispatch(loadGamesSuccess(games));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveGame(game) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return gameApi.saveGame(game).then(savedGame => {
      game.id ? dispatch(updateGameSuccess(savedGame)):
        dispatch(createGameSuccess(savedGame));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  } ;
}
