//Handles the dispatches for calls to the live gmaes api calls

import * as types from './actionTypes';
import liveApi from '../api/liveApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadLivesSuccess(lives){
  return { type: types.LOAD_LIVES_SUCCESS , lives: lives};
}

export function createLiveSuccess(lives) {
  return { type: types.CREATE_LIVE_SUCCESS, lives};
}

export function updateLivesSuccess(live) {
  return {type: types.UPDATE_LIVE_SUCCESS, live};
}

export function loadLives() {
  return function(dispatch){
    dispatch(beginAjaxCall());
    return liveApi.getAllLives().then(lives => {
      dispatch(loadLivesSuccess(lives));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveLive(live) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return liveApi.saveLive(live).then(savedLive => {
      live.name ? dispatch(updateLivesSuccess(savedLive)):
        dispatch(createLiveSuccess(savedLive));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  } ;
}
