import React, { Component } from 'react';
import { Button, InputGroup, InputGroupAddon, Input, Container, Col, Row, Table } from 'reactstrap';
import './ProfileInfo.css';


export default class ProfileInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skills: ['Angular2', 'VueJS', 'ReactJS', 'C', 'C++'],
            colors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#6b705c'],
            profileInfo: ['Betül', 'Gokbel', 'gokbel.betul@metu.edu.tr'],
        };
        this.addSkill = this.addSkill.bind(this);
        this.skillCards = this.skillCards.bind(this);
        this.getRandomColor = this.getRandomColor.bind(this);
        this.makePascal = this.makePascal.bind(this);
        this.getRecentHackathon = this.getRecentHackathon.bind(this);
    }

    componentDidMount() {
        const username = localStorage.getItem('username');
        if (username === 'emrezinal151@gmail.com') {
            this.setState({ skills: ['NodeJS', 'MySql', 'C#'], profileInfo: ['Emre', 'Zinal', 'emrezinal151@gmail.com'] });
        } else if(username === 'mahir.bastas@metu.edu.tr') {
            this.setState({ skills: ['Python', 'NoSql', 'C++'], profileInfo: ['Mahir', 'Bastas', 'mahir.bastas@metu.edu.tr'] });
        }
        else if(username === 'admin@asd.com') {
            this.setState({ skills: [], profileInfo: ['Admin', 'Admin', 'admin@asd.com'] });
        }
    }

    addSkill() {
        const inputField = document.getElementById('skillInput');
        const skillsCopy = [...this.state.skills];
        if (inputField.value !== '') {
            skillsCopy.push(inputField.value);
        }
        inputField.value = '';
        this.setState({ skills: skillsCopy });
    }

    deleteSkill(skill) {
        console.log('skill : ', skill);
        let newSkills = this.state.skills.filter(todo => todo !== skill)
        this.setState({ skills: newSkills })
    }

    makePascal(str) {
        return str.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
    }

    getRandomColor() {
        let rand = Math.random() * this.state.colors.length;
        rand = Math.floor(rand);
        return this.state.colors[rand];
    }

    skillCards() {
        return this.state.skills.map((skill) => {
            const styleObj = { backgroundColor: this.getRandomColor() };
            skill = this.makePascal(skill);
            return (
                <div className="chip d-flex flex-row align-items-center justify-content-end" style={styleObj}>{skill}
                    <Button id='deleteButton' style={{
                        marginLeft: '1em',
                        position: 'relative', float: 'right',
                        backgroundColor: '#ff000000', border: 'none'
                    }} onClick={() => { this.deleteSkill(skill) }}>X</Button>
                </div>

            )
        })
    }

    getProfileInfo() {
        const profileInfo = [...this.state.profileInfo];
        return profileInfo;
    }

    getRecentHackathon() {
        const username = localStorage.getItem('username');
        if (username === 'emrezinal151@gmail.com') {
            return (
                <tr>
                    <th scope="row">1</th>
                    <td>Fundamentals of CyberSecurity</td>
                    <td>02/02/2021</td>
                    <td>CyberGroup 2021</td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <th scope="row">1</th>
                    <td>AKBANK HACKATHON</td>
                    <td>01/02/2021</td>
                    <td>Akbank Development</td>
                </tr>
            );
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs="6"><div className="profileForm">
                        <br></br>
                        <h5 style={{ textAlign: 'center' }} className="sectionTitle">ENTER YOUR SKILLS</h5>
                        <div className="chips-container">
                            {this.skillCards()}

                        </div>
                        <div className="input-field">
                            <InputGroup className="add-skill">
                                <Input id='skillInput' placeholder="Enter a skill" />
                                <InputGroupAddon addonType="append">
                                    <Button onClick={this.addSkill} color="primary">&#43;</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </div></Col>
                    <Col xs="6">
                        <Table>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.getProfileInfo()[0]}</td>
                                    <td>{this.getProfileInfo()[1]}</td>
                                    <td>{this.getProfileInfo()[2]}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <br></br>
                <br></br>
                <div style={{ marginTop: '2rem' }}>
                    <h5>YOUR UPCOMING HACKATHONS</h5>
                    <Table dark>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>HACKATHON NAME</th>
                                <th>DATE</th>
                                <th>ORGANIZER</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getRecentHackathon()}
                        </tbody>
                    </Table>
                </div>

            </Container>

        );
    }
}