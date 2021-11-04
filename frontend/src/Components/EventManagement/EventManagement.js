import React, { Component } from 'react';
import './EventManagement.css';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class EventManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.login = this.login.bind(this);
    }

    render() {
        return (<div>
            <h2>Assign user role</h2>
            <Form>
                <FormGroup>
                    <Label for="userId">User Id</Label>
                    <Input type="number" name="number" id="userId" placeholder="Enter user id" />
                </FormGroup>
                <FormGroup row>
                    <Label for="roleSelect" sm={2}>Select user role</Label>
                    <Col sm={10}>
                        <Input type="select" name="select" id="roleSelect">
                            <option>Participant</option>
                            <option>Jurie</option>
                            <option>Organizer</option>
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button>Submit</Button>
                    </Col>
                </FormGroup>
            </Form>
        </div>)
    }

}

export default EventManagement;