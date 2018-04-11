import React from "react";
import { withStyles } from "material-ui/styles";
import Item from "./Item";
import Team from "../models/Team";
import { CircularProgress } from "material-ui/Progress";
import Button from "material-ui/Button";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500
  },
  progress: {
    margin: theme.spacing.unit * 2,
    textAlign: "center"
  },
  scoreResult: {
    width: 20,
    margin: 5
  }
});

const Info = () => (
  <div>
    <p>
      This App uses JSON-server API. Please, run json-server on localhost:3000.
    </p>
    <ul>
      <li>npm install json-server</li>
      <li>Create a db.json file</li>

      <li>copy content from public/db.json.</li>
      <li>json-server --watch db.json</li>
    </ul>
    <p>You can find more info here: https://github.com/typicode/json-server</p>
  </div>
);

class Teams extends React.Component {
  state = {
    teams: [],
    count: 0,
    // games: [{ id: 1, team1: "TeamA", team2: "TeamB" }],
    games: [],
    loading: true
  };

  getOpponents = () => {
    let { teams } = this.state;
    let opponents = [];
    if (teams.length >= 1) {
      teams.forEach(team => {
        opponents.push({
          name: team.name,
          opponentId: team.id
        });
      });

      return opponents;
    }
    return opponents;
  };

  addNewTeamToOpponents = newTeam => {
    this.setState(prevState => {
      prevState.teams.forEach(team => {
        team.id !== newTeam.id &&
          team.opponents.push({
            name: newTeam.name,
            opponentId: newTeam.id
          });
      });

      return {
        ...prevState,
        teams: [...prevState.teams]
      };
    });

    this.state.teams.forEach(team => {
      let url = `http://localhost:3000/teams/${team.id}`;
      fetch(url, {
        method: "PUT",
        body: JSON.stringify(team), // data can be `string` or {object}!
        headers: new Headers({
          "Content-Type": "application/json"
        })
      });
    });
  };

  addNew = e => {
    e.preventDefault();
    let url = "http://localhost:3000/teams";
    let team = new Team({
      name: `Team ${this.state.count + 1}`,
      opponents: this.getOpponents()
    });

    fetch(url, {
      method: "POST",
      body: JSON.stringify(team), // data can be `string` or {object}!
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .then(newTeamjson => {
        this.setState(prevState => ({
          teams: [...prevState.teams, newTeamjson],
          count: prevState.count + 1
        }));
        this.addNewTeamToOpponents(newTeamjson);

        this.state.count > 1 && this.createSchedule();
      });
  };

  createSchedule = () => {
    let { teams } = this.state;
    let matches = [];

    // game + revange
    // teams.forEach(team => {
    //   team.opponents.forEach(o => {
    //     matches.push({
    //       id: matches.length + 1,
    //       team1: team.name,
    //       team2: o.name
    //     });
    //   });
    // });

    teams.forEach(team => {
      team.opponents.forEach(o => {
        var obj = matches.find(function(obj) {
          return (
            (obj.team1 === o.name || obj.team1 === team.name) &&
            (obj.team2 === o.name || obj.team2 === team.name)
          );
        });

        if (!obj) {
          matches.push({
            id: matches.length + 1,
            team1: team.name,
            team2: o.name,
            team1Score: "",
            team2Score: "",
            resultIsSet: false
          });
        }
      });
    });

    this.setState({
      games: matches
    });
  };

  deleteItem = data => {
    let url = `http://localhost:3000/teams/${data.id}`;

    fetch(url, {
      method: "DELETE"
    }).then(() => {
      this.setState(prevState => ({
        teams: prevState.teams.filter(el => el.id !== data.id),
        count: prevState.count - 1
      }));
    });
  };

  setScore = (gameId, event) => {
    let value = event.target.value;
    let name = event.target.name;
    console.log(name);

    this.setState(prevState => {
      prevState.games.find(g => g.id === gameId)[name] = value;
      return {
        ...prevState
      };
    });
    console.log(this.state.games.find(g => g.id === gameId));
  };

  setResult = game => {
    let win = null,
      draw;
    console.log(game);
    switch (true) {
      case game.team1Score > game.team2Score:
        win = game.team1;
        break;
      case game.team1Score < game.team2Score:
        win = game.team2;
        break;
      default:
        draw = true;
        break;
    }

    this.setState(prevState => {
      prevState.games.find(g => g.id === game.id).resultIsSet = true;
      if (win) {
        prevState.teams.find(t => t.name === win).totalPoints += 3;
      } else {
        prevState.teams.find(t => t.name === game.team1).totalPoints += 1;
        prevState.teams.find(t => t.name === game.team2).totalPoints += 1;
      }

      prevState.teams.find(t => t.name === game.team1).matches += 1;
      prevState.teams.find(t => t.name === game.team2).matches += 1;

      return {
        ...prevState
      };
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/teams")
      .then(response => response.json())
      .catch(e => {
        this.setState({
          loading: false
        });
      })
      .then(json => {
        this.setState({
          teams: json,
          count: json.length,
          loading: false
        });
        this.createSchedule();
      });
  }

  render() {
    const { classes } = this.props;
    const { teams, loading, games } = this.state;

    return (
      <div>
        {loading ? (
          <div className={classes.root}>
            <CircularProgress className={classes.progress} />
          </div>
        ) : teams ? (
          Object.keys(teams).length === 0 && teams.constructor === Object ? (
            <p>
              Please check if have you created "teams" object in your local
              db.json
            </p>
          ) : teams.length === 0 ? (
            <p> There are no elements, please add new item.</p>
          ) : (
            <ul>
              {teams.map(e => (
                <li onClick={this.deleteItem.bind(this, e)} key={e.id}>
                  {e.name}
                </li>
              ))}
            </ul>
          )
        ) : (
          <Info />
        )}
        <Button onClick={this.addNew}>Add new team</Button>
        <h3>Schedule</h3>
        <ul>
          {games.map(e => (
            <li key={e.id}>
              game {e.id}: {e.team1} vs {e.team2}{" "}
              <input
                disabled={e.resultIsSet}
                name="team1Score"
                onChange={this.setScore.bind(this, e.id)}
                value={e.team1Score}
                className={classes.scoreResult}
              />
              :{""}
              <input
                disabled={e.resultIsSet}
                name="team2Score"
                onChange={this.setScore.bind(this, e.id)}
                value={e.team2Score}
                className={classes.scoreResult}
              />
              {!e.resultIsSet && (
                <Button
                  disabled={e.team1Score === "" || e.team2Score === ""}
                  onClick={this.setResult.bind(this, e)}
                >
                  set
                </Button>
              )}
            </li>
          ))}
        </ul>
        <h3>Table</h3>
        <ol>
          {teams.sort((a, b) => a.totalPoints < b.totalPoints).map(t => (
            <li key={t.id}>
              {t.name} M: {t.matches} PKT: {t.totalPoints}{" "}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default withStyles(styles)(Teams);
