import React, { useEffect, useState } from "react";
import Hackathons from "./Components/Home/Hackathons";
import RightSide from "./Components/Home/RightSide";
import Sponsors from "./Components/Home/Sponsors";
import Footer from "./Components/Home/Footer";
import "./App.css";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFileDownload, faTrashAlt, faUserEdit, faUserSlash, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
//import { StreamChat } from 'stream-chat';
// import {
//   Attachment,
//   Chat,
//   Channel,
//   ChannelHeader,
//   ChannelList,
//   LoadingIndicator,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window,
//   MessageInputSmall,
//   VirtualizedMessageList,
// } from 'stream-chat-react';

// import 'stream-chat-react/dist/css/index.css';

//const chatClient = StreamChat.getInstance('dz5f4d5kzrue');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiY29sZC1zZWEtNSIsImV4cCI6MTYyMTM4NTUyN30.I8kIKKvMuORXT4EIE-qwsMbJWQRykO6KePbjDgKrlPk';

const filters = { type: 'messaging', members: { $in: ['cold-sea-5'] } };
const sort = { last_message_at: -1 };

// const attachments = [
//   {
//     image: 'https://images-na.ssl-images-amazon.com/images/I/71k0cry-ceL._SL1500_.jpg',
//     name: 'iPhone',
//     type: 'product',
//     url: 'https://goo.gl/ppFmcR',
//   },
// ];

// const CustomAttachment = (props) => {
//   const { attachments } = props;
//   const [attachment] = attachments || [];

//   if (attachment?.type === 'product') {
//     return (
//       <div>
//         Product:
//         <a href={attachment.url} rel='noreferrer'>
//           <img alt='custom-attachment' height='100px' src={attachment.image} />
//           <br />
//           {attachment.name}
//         </a>
//       </div>
//     );
//   }

//   return <Attachment {...props} />;
// };
function mapStateToProps(state) {
  return {
    currentHackathon: state.currentHackathon,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setHackathon: (hackathonObj) => {
      dispatch({ type: "SET_HACKATHON", payload: hackathonObj });
    },
  };
}

/*
chatClient.connectUser(
  {
    id: 'cold-sea-5',
    name: 'cold',
    image: 'https://getstream.io/random_png/?id=cold-sea-5&name=cold',
  },
  userToken,
);




const channel = chatClient.channel('livestream', 'spacex', {
  image: 'https://goo.gl/Zefkbx',
  name: 'SpaceX launch discussion',
});
*/

const App = (props) => {

  useEffect(() => {
    addResponseMessage("Akbank Hackathon will start at 1 pm");
    addResponseMessage("Garanti Camp program changed please read it again!");
    addResponseMessage("Fundamentals of CyberSecurity hackathon rules changed. ");

  });

  const [chatClient, setChatClient] = useState(null);

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   addResponseMessage("Welcome to this awesome chat!");
  //   const initChat = async () => {
  //     const client = StreamChat.getInstance('dz5f4d5kzrue');

  //     await client.connectUser(
  //       {
  //         id: 'cold-sea-5',
  //         name: 'cold',
  //         image: 'https://getstream.io/random_png/?id=cold-sea-5&name=cold',
  //       },
  //       userToken,
  //     );

  //     const [channelResponse] = await client.queryChannels(filters, sort);

  //     await channelResponse.sendMessage({
  //       text: 'Your selected product is out of stock, would you like to select one of these alternatives?',
  //       attachments,
  //     });

  //     setChatClient(client);
  //   };

  //   initChat();
  // }, []);

  // if (!chatClient) {
  //   return <LoadingIndicator />;
  // }



  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  }

  return (

    <div className="mainDiv">
      <div className="mainLayout">
        <Container className="containerHome">
          <Row className="hackathonsRow">
            <h3 style={{ position: 'relative', left: '10em', color: 'black', lineHeight: '2' }}>CURRENT HACKATHONS</h3>
            <Col xs="9">
              <br></br>
              <Hackathons></Hackathons>
            </Col>
            <Col xs="3" className="rightSideCol">
              <br></br>
              <RightSide></RightSide>
            </Col>
          </Row>
          <br></br>
          <Widget
            handleNewUserMessage={handleNewUserMessage}
            title="Welcome to Hackathon"
            subtitle=""
          />
          {/*
 <Row className="footerRow">
 <Col xs="12">
   <br></br>
   <div className="App">
     {/* <Chat client={chatClient} theme='livestream dark'>
       <Channel channel={channel}>
         <Window>
           <ChannelHeader live />
           <VirtualizedMessageList />
           <MessageInput Input={MessageInputSmall} focus />
         </Window>
       </Channel>
     </Chat> }
   </div>
   <br></br>
 </Col>
          </Row> */}
         
        </Container>
        <Row className="footerRow">
            <Col xs="12">
              <br></br>
              <Footer></Footer>
            </Col>
          </Row>
      </div>
    </div>
  );
};

export default connect()(App);
