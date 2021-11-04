import React, { Component } from 'react';
import './Login.css';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.login = this.login.bind(this);
    }

    login(event) {
        event.preventDefault();
        // axios.post('http://144.122.71.114:8082/login', {
        //     email: document.getElementById('userEmail').value,
        //     password: document.getElementById('userPassword').value
        // })
        // .then(function (response) {
        //   console.log(response.data);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // }); 
        localStorage.setItem('username', document.getElementById('userEmail').value);
        window.location.href = "http://localhost:8080/";
    }

    render() {
        return (
            <div className="login-container">
                <h2 style={{marginBottom: '5vh'}}>Login to your account</h2>
                <Form className="form-container">
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
                    <p><a href="/register">Don't have an account yet? Register here</a></p>
                    <FormGroup row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button style={{backgroundColor: 'dodgerblue'}} onClick={this.login}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default Login;