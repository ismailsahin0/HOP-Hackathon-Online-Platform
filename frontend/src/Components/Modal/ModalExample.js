/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ResultChart from '../ResultChart/ResultChart';

const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (

    <div>
      <Button color="success" onClick={toggle}>Team Scores</Button>
      <Modal style={{width: "850px !important"}} isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>RESULT CHART</ModalHeader>
        <ModalBody>
           <ResultChart></ResultChart>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;