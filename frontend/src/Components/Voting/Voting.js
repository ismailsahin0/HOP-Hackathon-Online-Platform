import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import axios from "axios";
import "./Voting.css";

class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [
        { name: "Team1", votes: 0 },
        { name: "Team2", votes: 0 },
        { name: "Team3", votes: 0 },
        { name: "Team4", votes: 0 },
      ],
    };
  }
  

  vote(i) {
    let newteams = [...this.state.teams];
    newteams[i].votes++;
    function swap(array, i, j) {
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    this.setState({ teams: newteams });
  }

  //backend bağlantısı için örnek request yazılmıştır
  getVotings() {
    axios.get('http://144.122.71.114:8082/voting', {
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <Container>
        <h1>Vote Your Language!</h1>
        <div className="languages">
          {this.state.teams.map((lang, i) => (
            <div key={i} className="language">
              <div className="voteCount">{lang.votes}</div>
              <div className="languageName">{lang.name}</div>
              <Button color="warning" onClick={this.vote.bind(this, i)}>
                Click Here
              </Button>
              <Button color="warning" onClick={this.getVotings.bind(this)}>
                getVotings
              </Button>
            </div>
          ))}
        </div>
      </Container>
    );
  }
}
export default Voting;
