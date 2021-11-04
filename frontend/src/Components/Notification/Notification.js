import React, { Component } from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Button,
    Container,
    Table
} from "reactstrap";

import './Notification.css';

const users = require("./test_users.json");
const schedule = require("./test_schedule.json");
const groups = require("./test_groups.json");
export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = { allNotifications: {} };

        const allNotifications = () => {
            axios.get("http://localhost:8080/user/notifications/")
            .then(response => {
                console.log("Response data : ", response.data);
                this.setState({allNotifications:response.data});
            })
            .catch(e => {
                console.log(e);
            });
        };
        allNotifications();
    }
    render() {
        return (
            <Container>
                <br></br>
                <span className="jurie-page-header">
                    <h2>Notifications</h2>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Start</th>
                                <th>End</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.eventScheduleTable(schedule, 2)}
                        </tbody>
                    </Table>
                </span>
                <br></br>
                <h3 style={{ textAlign: 'center' }}>Groups</h3>
                <div className="group-cards-row">
                    {this.groupInfoCard(users)}
                </div>
            </Container>

        );
    }
}