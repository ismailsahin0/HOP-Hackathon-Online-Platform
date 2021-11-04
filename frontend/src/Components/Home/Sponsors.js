import React, { Component } from "react";
import { Container, Row, Col} from "reactstrap";
import "./Sponsors.css"

export default class Sponsors extends Component {
  render() {
    return (
      <div className="mainDivSponsors">
        <Container className="sponsors">
          <Row style={{textAlign: "center"}}>
            <Col>Platinum Sponsor
            <img style={{height: '40%'}} src="sponsor.png" alt="img"></img>
            </Col>
            <Col>Gold Sponsor
            <img style={{height: '40%'}} src="sponsor.png" alt="img"></img></Col>
            <Col>Gold Sponsor
            <img style={{height: '40%'}} src="sponsor.png" alt="img"></img></Col>
            <Col>Bronze Sponsor
            <img style={{height: '40%'}} src="sponsor.png" alt="img"></img></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
