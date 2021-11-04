import React, { useState } from "react";
import { Jumbotron, Container, Table } from "reactstrap";
import axios from 'axios';

const EventDetails = (props) => {

  const initialEventDetail = [''];

  const [eventDetail, setEventDetail] = useState(initialEventDetail);

  function getEventDetails() {
    axios.get('http://144.122.71.114:8082/getEventDetails', {
    })
    .then(function (response) {
      console.log(response.data);
      setEventDetail(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Container style={{ marginTop: "5%" }}>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Event</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Welcome</td>
            <td>09:00</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Coffe Break</td>
            <td>10:15</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Presentation</td>
            <td>15:00</td>
          </tr>
        </tbody>
      </Table>
      <div>
      <Jumbotron fluid style={{marginTop: '5%'}}>
        <Container fluid>
          <h1 className="display-5">Breakfast</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </Container>
      </Jumbotron>
      <Jumbotron fluid style={{marginTop: '5%'}}>
        <Container fluid>
          <h1 className="display-5">Coffe Break</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </Container>
      </Jumbotron>
      <Jumbotron fluid style={{marginTop: '5%'}}>
        <Container fluid>
          <h1 className="display-5">Presentation</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
        </Container>
      </Jumbotron>
      
    </div>
    </Container>
  );
};

export default EventDetails;