/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactStars from "react-rating-stars-component";

const VotingModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const ratingChanged = () => {
  };

  // toggle() {
  //   this.setState({ modal: !this.state.modal });
  // };

  return (

    <div>
      <Button color="primary" onClick={toggle}>Change Vote&nbsp;&#10003;</Button>
      <Modal style={{ width: "850px !important" }} isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Vote Group</ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center">
              <span>Applicability:&nbsp;</span>
              <ReactStars
                count={5}
                // onChange={this.ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>
            <div className="d-flex flex-row align-items-center">
              <span>Innovation:&nbsp;</span>
              <ReactStars
                count={5}
                // onChange={this.ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>
            <div className="d-flex flex-row align-items-center">
              <span>Performance:&nbsp;</span>
              <ReactStars
                count={5}
                // onChange={this.ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>
          </div>

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
          <Button color="success" onClick={toggle}>Save</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default VotingModal;