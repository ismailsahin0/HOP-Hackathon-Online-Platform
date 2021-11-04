/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import {
  Container,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  CardText,
  Button,
} from "reactstrap";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";

class EventDetails extends Component {
  render() {
    return (
      <Container>
        <div>
          <h4
            style={{ textAlign: "center", marginTop: "4%", marginBottom: "3%" }}
          >
            HACKATHON TITLE
          </h4>
          <Progress percent={88} status="success" />
          <img
            top
            style={{ height: "20em", width: "100%", marginTop: "5%" }}
            src={"h6.jpg"}
            alt="image"
          />

          <Row style={{ marginTop: "3%" }}>
            <Col>
              <h4>Hackathon Description</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <h4>Hackathon Managers</h4>
            </Col>
            </Row>
            <Row className="rows-class">
            <Col xs="6" sm="4">
              <Card>
                <CardImg
                  top
                  width="100%"
                  src="/assets/318x180.svg"
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle tag="h5">Managers Name</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    Managers Title
                  </CardSubtitle>
                  <CardText>
                    Links
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            </Row>         
        </div>
      </Container>
    );
  }
}

export default EventDetails;
