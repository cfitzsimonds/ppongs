import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';
import GamesPage from './components/game/GamesPage';
import ManageGamePage from './components/game/ManageGamePage';
import UserProfile from './components/users/UserProfile';
import UserPage from './components/users/UserPage';
import LeaguePage from './components/league/LeaguesPage'
import JoinLeaguePage from './components/league/JoinLeague'
import HeadToHeadPage from './components/h2h/HeadToHead'
import LeagueDisplay from './components/league/LeagueDisplay';
import LeagueCreate from './components/league/LeagueCreate';
import ConfirmationDirectory from './components/confirmation/ConfirmDir';
import LivePage from './components/live/LivePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="course" component={ManageCoursePage} />
    <Route path="course/:id" component={ManageCoursePage} />
    <Route path="courses" component={CoursesPage} />
    <Route path="games" component={GamesPage} />
    <Route path="game" component={ManageGamePage} />
    <Route path="game/:id" component={ManageGamePage} />
    <Route path="users" component={UserPage} />
    <Route path="profile/:id" component={UserProfile} />
    <Route path="leagues" component={LeaguePage} />
    <Route path="league" component={JoinLeaguePage} />
    <Route path="league/:id" component={LeagueDisplay} />
    <Route path="h2h" component={HeadToHeadPage} />
    <Route path="leagueCreate" component={LeagueCreate} />
    <Route path="confirm" component={ConfirmationDirectory} />
    <Route path="live/:id" component={LivePage} />
  </Route>
);
