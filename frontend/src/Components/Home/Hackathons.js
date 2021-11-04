import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Col,
  Row,
} from "reactstrap";
import "./Hackathons.css";
import axios from 'axios';

const current_hackathons = require("./test_current_hackathons.json");
const incoming_hackathons = require("./test_incoming_hackathons.json");


const Hackathons = (props) => {
  /*const card = {
    title: 'Hack Title',
    date: 'Hack Date',
    details: 'Hack Details'
  };
  */

  const initialHackathonState = { title: "", date: "", details: "" };
  const [hackathon, setHackathon] = useState(initialHackathonState);

  function createHackathon() {
    axios
      .post('http://localhost:3001/createHackathon', hackathon)
      .then(() => console.log('Hackathon Created'))
      .catch(err => {
        console.error(err);
      });
  };


  function hello(title) {
   console.log('You are registered the' + {title});
  };


  function hackathon_card(card_data) {
    return (
      <div className="hackathon-card">
        <Card className="cardItem" style={{color: "black"}}>
          <CardImg top style={{ height: '35%', width: "100%" }} src={card_data.image} alt="image" />
          <CardBody className="hackathon-card-body">
            <CardTitle tag="h5">{card_data.title}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {card_data.date}
            </CardSubtitle>
            <CardText>{card_data.details}</CardText>
            <div style={{ height: "100%" }}>
              <a href="/eventMain">
                <Button onClick={
                  () =>this.hello(card_data.title)
                } style={{ marginBottom: "0 !important", paddingTop: "auto !important" }}
                  className="card-op-button">
                  {card_data.butonText}
                </Button>
              </a>

            </div>
          </CardBody>
        </Card>
      </div>
    );
  }




  return (
    <Container style={{
      paddingBottom: "10px",
      paddingTop: "10px",
      border: "1px solid #ececec",
      borderRadius: "1em",
    }}>
      <Row className="rows-class">
        {current_hackathons.map(hack => {
          return (<Col xs="6" sm="4">{hackathon_card(hack)}</Col>)
        })}
      </Row>
      <br></br>
      <br></br>
      <h3 style={{ textAlign: "center" }}>UPCOMING HACKATHONS</h3>
      <br></br>
      <div>
        <Row className="rows-class">
          {incoming_hackathons.map(hack => {
            return (<Col xs="6" sm="4">{hackathon_card(hack)}</Col>)
          })}
        </Row>
      </div>
    </Container>
  );

}

export default Hackathons;
