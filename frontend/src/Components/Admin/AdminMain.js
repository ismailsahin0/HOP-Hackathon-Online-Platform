import React, { Component } from 'react';
import { Table, Container, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './AdminMain.css'
import axios from 'axios';

const users = require("./test_users.json")

export default class AdminMain extends Component {

  getUsers() {
    axios.get('http://144.122.71.114:8082/getUsers', {
    })
    .then(function (response) {
      console.log(response.data);
      users(response.data);
    })
    .catch(function (error) {
      console.log(error);
    }); 
}

  tableRows = users.map(user => {
    return (
      <tr className="user-table-row" key={user.userId}>
        <th scope="row">{user.userId}</th>
        <td>{user.fullname}</td>
        {/* <td>{user.city}</td> */}
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.account_status}</td>
        <td>{user.role}</td>
        <td>{user.account_creation_date}</td>
        <td>
          <Button color="warning">Edit</Button>
          <Button color="danger">Remove</Button>
        </td>
      </tr>
    )
  });
  render() {
    return (
      <Container>
        <br></br>
        <Button type="active" style={{float: 'right',backgroundColor: 'green'}} href="/newHackathon">
          &#43;&nbsp;Create New Hackathon
          </Button>
        <br></br>
        <br></br>
      <Table className="users-table" responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Fullname</th>
            {/* <th>City</th> */}
            <th>Email</th>
            <th>Phone</th>
            <th>Account Status</th>
            <th>Latest Role</th>
            <th>Creation Date</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {this.tableRows}
        </tbody>
      </Table>
      </Container>
    );
  }
}
