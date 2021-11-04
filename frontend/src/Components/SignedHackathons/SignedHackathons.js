import React, { Component } from "react";
import { Table, Container, Button } from "reactstrap";
import "./SignedHackathons.css";
import axios from 'axios';

const signedHackathons = require("./test_signedHackathons.json");




export default class SignedHackathons extends Component {

  getSignedHackathons() {
    axios.get('http://144.122.71.114:8082/getSignedHackathons', {
    })
    .then(function (response) {
      console.log(response.data);
      signedHackathons(response.data);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  tableRows = signedHackathons.map((signedHackathon) => {
    return (
      <tr>
        <td>{signedHackathon.title}</td>
        <td>{signedHackathon.date}</td>
        <td>{signedHackathon.status}</td>
        <td>{signedHackathon.group}</td>
      </tr>
    );
  });
  render() {
    return (
      <div className="mainDiv">
        <h4 style={{textAlign: 'center'}}>SIGNED HACKATHONS</h4>
        <br></br>
        <Container>
          <div class="d-flex justify-content-center">      
            <Table striped className="signedHackathonsTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Joined Group</th>
                </tr>
              </thead>
              <tbody>{this.tableRows}</tbody>
            </Table>
          </div>
        </Container>
        </div>
    
    );
  }
}
