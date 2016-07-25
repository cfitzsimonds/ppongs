import * as types from './actionTypes';
import tournamentApi from '../api/tournamentApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadTournamentsSuccess(tournaments){
  return { type: types.LOAD_TOURNAMENTS_SUCCESS , tournaments: tournaments};
}

export function createTournamentSuccess(tournament) {
  return { type: types.CREATE_TOURNAMENT_SUCCESS, tournament};
}

export function updateTournamentSuccess(tournament) {
  return {type: types.UPDATE_TOURNAMENT_SUCCESS, tournament};
}

export function loadTournaments() {
  return function(dispatch){
    dispatch(beginAjaxCall());
    return tournamentApi.getAllTournaments().then(tournaments => {
      dispatch(loadTournamentsSuccess(tournaments));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveTournament(tournament) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return tournamentApi.saveTournament(tournament).then(savedTournament => {
      tournament.id ? dispatch(updateTournamentSuccess(savedTournament)):
        dispatch(createTournamentSuccess(savedTournament));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  } ;
}
