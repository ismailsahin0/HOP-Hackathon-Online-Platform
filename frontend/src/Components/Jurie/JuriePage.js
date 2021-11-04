import React, { Component, useState } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Container,
  Table
} from "reactstrap";
import './JuriePage.css';
import axios from 'axios';
import VotingModal from '../VotingModal/VotingModal.js';

const initalSchedule = [
  {
    "id": 0,
    "name": "Introduction",
    "start": "8.40",
    "end": "9.30"
  }
];
const users = require("./test_users.json");
const schedule = require("./test_schedule.json");
const groups = require("./test_groups.json");

export default class JuriePage extends Component {

  getEventSchedule() {
    axios.get('http://144.122.71.114:8082/getEventSchedule', {
    })
    .then(function (response) {
      console.log(response.data);
      schedule(response.data);
    })
    .catch(function (error) {
      console.log(error);
    }); 
}

  getGroupsInfo() {
    axios.get('http://144.122.71.114:8082/getGroupsInfo', {
    })
    .then(function (response) {
      console.log(response.data);
      groups(response.data);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
    this.detailsClick = this.detailsClick.bind(this);
  }


  eventScheduleTable(schedule, currentEventIndex) {
    return schedule.map(eventPart => {
      let row_class = '';
      if (eventPart.id < currentEventIndex) {
        row_class = 'disabled-table-row';
      } else if (eventPart.id === currentEventIndex) {
        row_class = 'active-table-row';
      } else {
        row_class = 'default-table-row';
      }
      return (
        <tr className={row_class} key={eventPart.id}>
          <th scope="row">{eventPart.id}</th>
          <td>{eventPart.name}</td>
          <td>{eventPart.start}</td>
          <td>{eventPart.end}</td>
        </tr>
      )
    });
  }

  detailsClick = () => {
    window.location.href = '/groupInfo';
  }

  // testGroup1 = [users[0], users[1]];
  // testGroup2 = [users[2], users[3]];
  // testGroups = [this.testGroup1, this.testGroup2];
  groupInfoCard(groupData) {
    return groups.map((group) => {
      return <div className="group-info-card">
        <Card className="jurie-page-card-item">
          <CardImg
            top
            width="100%"
            src="/group-people-icon.jpg"
            alt="image"
          />
          <CardBody className="group-info-card-body">
            <CardTitle tag="h5"><b>{group.name}</b></CardTitle>
            <hr></hr>
            <CardText>{group.member1} </CardText>
            <CardText>{group.member2} </CardText>
            <CardText>{group.member3} </CardText>
            <hr></hr>
            <div className="group-operations">
              <Button onClick={() => {this.detailsClick()}}>Details</Button>
              <VotingModal ></VotingModal>
            </div>
          </CardBody>
        </Card>
      </div>
    });
  }

  render() {
    return (
      <Container>
        <br></br>
        {/* <span className="jurie-page-header">
          <h2>Event Schedule</h2>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {this.eventScheduleTable(schedule, 2)}
            </tbody>
          </Table>
        </span> */}
        <br></br>
        <h3 style={{ textAlign: 'center' }}>Groups In This Event</h3>
        <hr />
        <div className="group-cards-row">
          {this.groupInfoCard(users)}
        </div>
      </Container>

    );
  }
}
