import React, { Component, useState } from "react";
import { Table, Container, Button } from "reactstrap";
import "./Matching.css";
import axios from 'axios';
import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Icon } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const teamContent = [];

export default class Matching extends Component {

  constructor() {
    super();
    this.state = { loading: false, isLoading: false, text: true, isTick: false }
  }

  fetchData = () => {
    const username = localStorage.getItem('username');
    if (username === 'emrezinal151@gmail.com') {
      const t2 = require("./test_matching2.json");
      this.setState({ isLoading: false, loading: true, text: false, groups: t2 });
    } else {
      const t = require("./test_matching.json");
      this.setState({ isLoading: false, loading: true, text: false, groups: t });
    }
    setTimeout(() => {
      this.setState({ loading: false, isLoading: true, text: false });
    }, 1200);
  };

  createNotification = (type) => {

    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('SENT!', 'REQUEST');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };

  getAllTeamContents() {
    axios.get('http://144.122.71.114:8082/getAllTeamContents', {
    })
      .then(function (response) {
        console.log(response.data);
        teamContent(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  tableRows = () => {
    return this.state.groups.map((group) => {
      return (
        <tr>
          <td>{group.groupId}</td>
          <td>{group.groupName}</td>
          <td>{group.members}</td>
          <td>
            <div style={{ backgroundColor: 'gray', borderRadius: '0.8em', textAlign: 'center', marginBottom: '0.2em' }}>
              {group.skills[0]}
            </div>
            <div style={{ backgroundColor: 'gray', borderRadius: '0.8em', textAlign: 'center', marginBottom: '0.2em' }}>
              {group.skills[1]}
            </div>
            <div style={{ backgroundColor: 'gray', borderRadius: '0.8em', textAlign: 'center', marginBottom: '0.2em' }}>
              {group.skills[2]}
            </div>
            <div style={{ backgroundColor: 'gray', borderRadius: '0.8em', textAlign: 'center', marginBottom: '0.2em' }}>
              {group.skills[3]}
            </div>
          </td>
          <NotificationContainer />

        </tr>



      );
    });
  }

  render() {
    const { loading, isLoading, text } = this.state;
    return (
      <div className="matching-container">
        <Container>
          <div class="d-flex justify-content-center">
            <Button onClick={this.fetchData} disabled={loading} style={{ backgroundColor: '#30a921', color: 'black' }} size="lg">
              Find Teams
          </Button>
          </div>
          <br></br>
          <div style={{ position: "relative", top: "4rem" }}>
            {text &&

              <h6>PLEASE CLICK BUTTON TO FIND TEAMS</h6>

            }
          </div>
          {loading && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            />
          )}
          {loading && <Loader
            type="Puff"
            color="black"
            height={300}
            width={100}
            timeout={4000} // 4 secs
          />}
          {isLoading &&
            <div>
              <Table striped className="matchingTable">
                <thead>
                  <tr>
                    <th>Team Id</th>
                    <th>Team Name</th>
                    <th>Team Members</th>
                    <th>Technical Skills</th>
                    {!this.state.isTick &&
                      <Button style={{ position: "relative", float: "right" }} onClick={() => {

                        this.createNotification('success')
                        this.setState({ isTick: true });
                      }
                      } style={{ backgroundColor: 'yellow', color: 'black', borderRadius: '0.8em', position: 'relative', top: '1em' }}><Icon name="check" /></Button>
                    }
                      {this.state.isTick &&
                        <Button style={{ position: "relative", float: "right", top: "30%" }} onClick={() => {
                          this.createNotification('success')
                        }
                        } style={{ backgroundColor: 'gray', color: 'black', borderRadius: '0.8em', position: 'relative', top: '1em' }}>SENT!</Button>
                      }
                  </tr>
                </thead>
                <tbody>{this.tableRows()}</tbody>

              </Table>

            </div>
          }
        </Container>
      </div>

    )
  }
}
