//Handles the dispatches for calls to the leagues api calls


import * as types from './actionTypes';
import leagueApi from '../api/LeagueApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadLeaguesSuccess(leagues){
  return { type: types.LOAD_LEAGUES_SUCCESS , leagues: leagues};
}

export function createLeagueSuccess(league) {
  return { type: types.CREATE_LEAGUE_SUCCESS, league};
}

export function updateLeagueSuccess(league) {
  return {type: types.UPDATE_LEAGUE_SUCCESS, league};
}

export function loadLeagues() {
  return function(dispatch){
    dispatch(beginAjaxCall());
    return leagueApi.getAllLeagues().then(leagues => {
      dispatch(loadLeaguesSuccess(leagues));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveLeague(league) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return leagueApi.saveLeague(league).then(savedLeague => {
      league.id ? dispatch(updateLeagueSuccess(savedLeague)):
        dispatch(createLeagueSuccess(savedLeague));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  } ;
}
