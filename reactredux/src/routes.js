import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';
import GamesPage from './components/game/GamesPage';
import ManageGamePage from './components/game/ManageGamePage';
import UserPage from './components/users/UserPage';

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
  </Route>
);
