import React, { Component } from 'react';
import './DocumentUpload.css';
import { Col, Table, Button, Form, FormGroup } from 'reactstrap';
// import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class DocumentUpload extends Component {
    render() {
        return (
            <div>
                <h2>Past documents</h2>
                <Table striped className="matchingTable">
                    <thead>
                        <tr>
                            <th>Team Id</th>
                            <th>Team Name</th>
                            <th>File Name</th>
                            <th>File</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>groupId</td>
                            <td>groupName</td>
                            <td>members</td>
                            <td>
                                Project.zip
                            </td>
                            <td>
                                <FontAwesomeIcon className="admin-ops-icon" icon="file-download" size="lg" />
                                <FontAwesomeIcon className="admin-ops-icon" icon="trash-alt" size="lg" />
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Form className="form-container">
                    <FormGroup row className="file-input">
                        <input type="file"></input>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={{ size: 12 }}>
                            <Button style={{ backgroundColor: 'dodgerblue' }} onClick={this.login}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }

}

export default DocumentUpload;