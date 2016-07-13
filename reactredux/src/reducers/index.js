import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import games from './gameReducer';
import users from './userReducer';
import leagues from './leagueReducer';
import lives from './liveReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses,
  games,
  authors,
  users,
  leagues,
  lives,
  ajaxCallsInProgress
});

export default rootReducer;
