import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactStars from "react-rating-stars-component";

export default class VotingPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { starIndex: null };
        this.toggle = this.toggle.bind(this);
        this.ratingChanged = this.ratingChanged.bind(this);
    }
    ratingChanged = (newRating) => {
        console.log(newRating);
    };
    toggle() {
        this.setState({ modal: !this.state.modal });
    };
    render() {
        return (
            <Modal isOpen={true} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <ReactStars
                        count={5}
                        onChange={this.ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}