import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import games from './gameReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses,
  games,
  authors,
  ajaxCallsInProgress
});

export default rootReducer;
