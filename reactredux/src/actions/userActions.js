import * as types from './actionTypes';
import gameApi from '../api/ppongApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadUsersSuccess(users){
  return { type: types.LOAD_USERS_SUCCESS , users: users};
}

export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user};
}

export function updateUserSuccess(user) {
  return {type: types.UPDATE_USER_SUCCESS, user};
}

export function loadUsers() {
  return function(dispatch){
    dispatch(beginAjaxCall());
    return gameApi.getAllGames().then(users => {
      dispatch(loadUsersSuccess(users));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveUser(user) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return gameApi.saveGame(user).then(savedUser => {
      user.id ? dispatch(updateUserSuccess(savedUser)):
        dispatch(createUserSuccess(savedUser));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  } ;
}
