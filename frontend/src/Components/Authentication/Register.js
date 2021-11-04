import React, { Component } from 'react';
import './Register.css';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.register = this.register.bind(this);
    }

    register(event) {
        event.preventDefault();
        const password1 = document.getElementById('userPassword').value;
        const password2 = document.getElementById('userPassword2').value;
        if(password1 !== password2) {
            return;
        }
        axios.post('http://144.122.71.114:8082/register', {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            password: password1
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        }); 
    }

    render() {
        return (
            <div className="register-container">
                <h2 style={{ marginBottom: '5vh' }}>Register a new account</h2>
                <Form className="form-container">
                    <FormGroup row>
                        <Label for="exampleEmail" sm={3}>Name</Label>
                        <Col sm={9}>
                            <Input type="text" name="name" id="userName" placeholder="Your full name"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={3}>Email</Label>
                        <Col sm={9}>
                            <Input type="email" name="email" id="userEmail" placeholder="abc@example.com" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword" sm={3}>Password</Label>
                        <Col sm={9}>
                            <Input type="password" name="password" id="userPassword" placeholder="******" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword" sm={3}>Password Again</Label>
                        <Col sm={9}>
                            <Input type="password" name="password2" id="userPassword2" placeholder="******" />
                        </Col>
                    </FormGroup>
                    <p><a href="/login">Already have an account? Sign in here</a></p>
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button style={{ backgroundColor: 'dodgerblue' }} onClick={this.register}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default Register;