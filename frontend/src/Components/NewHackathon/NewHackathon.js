import React from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

const NewHackathon = (props) => {
  return (
    <Container>
      <br></br>
      <br></br>
      <h3 style={{textAlign: 'center', fontWeight: 'bold'}}>New Hackathon</h3>
      <hr />
      <Form>
        <FormGroup>
          <Label for="name">Hackathon Name</Label>
          <Input type="text" name="text" id="name" placeholder="Name" />
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input type="text" name="text" id="date" placeholder="Date" />
        </FormGroup>
        <FormGroup>
          <Label for="detail">Detail</Label>
          <Input type="text" name="text" id="detail" placeholder="Detail" />
        </FormGroup>
        <FormGroup>
          <Label for="manager">Manager Name</Label>
          <Input type="text" name="text" id="manager" placeholder="Manager Name" />
        </FormGroup>
        <Button href="/admin/">Submit</Button>
      </Form>
    </Container>
  );
};

export default NewHackathon;
