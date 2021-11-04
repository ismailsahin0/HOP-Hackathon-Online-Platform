import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Form, Button, Nav, FormControl } from 'react-bootstrap';

const url = "https://reqres.in/api/login"

class Navigation extends Component {

  state = {
    user: undefined,
  }

  handleLogin = (e) => {
    e.preventDefault()
    if (e.target.email.value && e.target.password.value) {

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accepts: 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value
        })
      })
        .then(res => res.json())
        .then(res => {
          localStorage.setItem("token", res)
          this.setState({
            user: { name: "tun" },
          })
        })
        .then(e.target.reset())
    }
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand> {' '}NavBar</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            {(this.state.user ?
              (<div>
                <Button className="button" type="submit">You've Logged In!</Button>
              </div>)
              :
              (<Form inline onSubmit={(e) => this.handleLogin(e)}>
                <Form.Group controlId="formLogin">
                  <Form.Label></Form.Label>
                  <FormControl required={true} name="email" type="email" placeholder="Enter Email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label></Form.Label>
                  <Form.Control required={true} name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Button className="loginButton" type="submit">LOGIN</Button>
              </Form>)
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Navigation;