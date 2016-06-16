import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import games from './gameReducer';
import users from './userReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses,
  games,
  authors,
  users,
  ajaxCallsInProgress
});

export default rootReducer;
