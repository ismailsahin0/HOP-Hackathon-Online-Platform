import React from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

const NewGroup = (props) => {
  return (
    <Container>
      <br></br>
      <br></br>
      <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Create a Group</h3>
      <hr />
      <h4 style={{ textAlign: 'center' }}>Enter your group details below</h4>
      <Form>
        <FormGroup>
          <Label for="name">For Event</Label>
          <Input type="text" disabled="true" name="text" id="name" placeholder="Event Name" value="Metu Coding Competition"/>
        </FormGroup>
        <FormGroup>
          <Label for="name">Group Name</Label>
          <Input type="text" name="text" id="name" placeholder="Group Name" />
        </FormGroup>
        <FormGroup>
          <Label for="date">Slogan / Motto</Label>
          <Input type="text" name="text" id="date" placeholder="Slogan / Motto" />
        </FormGroup>
        <Button href="/">Submit</Button>
      </Form>
    </Container>
  );
};

export default NewGroup;
