import React from 'react';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <h4>Instructions:</h4>
        <p>If not logged in, click either login or users <br />
            If this is your first time, click on leagues then select your league and enter your league's pin <br />
            To view the game history of all of your leagues, press them games tab <br />
            To view your own statistics and game history, click on My Profile <br />
            To view the rankings of a league you are in, click Leagues, then on the name of the league.  <br />
            To add a game to the record, click on games, then the add game button.  Fill out the names of the players,
            which league the game belongs to, the type of game, and each side's scores.  <br />
            To view any individual's record, anytime you see their name in a game or league table, click on it and you will
            see their profile page.  <br />
            To view the history between any two players have leagues in common with you, click HeadToHead, and select the
            names of the players you would like to see.
        </p>
      </div>
    );
  }
}

export default AboutPage;
