import React, { useState } from "react";
import { Jumbotron, Container, Table } from "reactstrap";

const GroupInfo = (props) => {

  const initialEventDetail = [''];

  const [eventDetail, setEventDetail] = useState(initialEventDetail);

  return (
    <Container style={{ marginTop: "32px" }}>
      <h2 style={{ marginBottom: "32px" }}>Group Info</h2>
      <Table hover>
        <tbody>
        <tr>
            <th scope="row">Event Name</th>
            <td>QUANTUM TURKEY</td>
          </tr>
          <tr>
            <th scope="row">Group Name</th>
            <td>Hoppa</td>
          </tr>
          <tr>
            <th scope="row">Slogan / Motto</th>
            <td>We are here for the free snacks!</td>
          </tr>
          <tr>
            <th scope="row">Members</th>
            <td>Emre, Nazlı, Kübra</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default GroupInfo;