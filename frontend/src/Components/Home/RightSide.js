import React, { useState } from "react";
import Calendar from "react-calendar";
import { Table, Container, Col, Row } from "reactstrap";
import "react-calendar/dist/Calendar.css";
import "./RightSide.css";
import axios from 'axios'

function RightSide() {
  const [value, onChange] = useState(new Date());

  const initialAllContent = ['']

  const [allContents, setAllContents] = useState(initialAllContent);

  const contents = [
  "Case Study Competition Hackathon will be held on March 10th.", 
  "Fundamentals of CyberSecurity Hackathon date is tentative.",
  "Genetic Algorithms Workshop Hackathon will be held on April 4th. ",
  "Lets Discover Programming 2 Hackathon will be held on February 4th. ",
  "Q-Turkey Workshop Hackathon will be held on February 8th. ",
  "Akbank Hackathon will be held on May 3th. ",
  "BBVA Beyond Barriers Hackathon will be held on June 5th. ",
  "PolyHACK 2021 date is tentative.",
  "Hackathon Mercedes-Benz and ESIC will be held on April 7th. "
];
  const text = "Update"

  function getAllContents() {
    axios.get('http://144.122.71.114:8082/rightSideContent', {
    })
    .then(function (response) {
      console.log(response.data);
      setAllContents(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div>
      <Col style={{border: '1px solid #ececec', borderRadius: "1em"}}> 
        <Row style={{padding: '5%'}}>
          <Calendar className="calender" onChange={onChange} value={value} />
        </Row>
        <br></br>
        <br></br>
        <br></br> 
        <Row style={{padding: '5%'}}>
          <Table striped bordered className="recentUpdates">
            <thead>
              <tr>
                <th style={{textAlign: 'center'}}>Recent Updates</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((content) => (
                <tr>
                  <th className="tableRow" scope="row">{content}</th>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Col>
    </div>
  );
}

export default RightSide;
