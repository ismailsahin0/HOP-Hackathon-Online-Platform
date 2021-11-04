import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers/reducer";
import AdminMain from "./Components/Admin/AdminMain.js";
import Matching from "./Components/Matching/Matching.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navi from "./Components/Home/Navi.js";
import SignedHackathons from "./Components/SignedHackathons/SignedHackathons";
import ResultChart from "./Components/ResultChart/ResultChart";

import "bootstrap/dist/css/bootstrap.min.css";
import JuriePage from "./Components/Jurie/JuriePage";
import NewHackathon from "./Components/NewHackathon/NewHackathon";
import EventDetails from "./Components/EventDetails/EventDetails";
import Livestream from "./Components/Livestream/Livestream";
import EventSchedule from "./Components/EventSchedule/EventDetails"
import Voting from "./Components/Voting/Voting";
import ProfileInfo from "./Components/ProfileInfo/ProfileInfo";
import Messages from "./Components/Messages/Messages"
import PrivateChat from "./Components/PrivateChat/PrivateChat";
import Login from "./Components/Authentication/Login"
import Register from "./Components/Authentication/Register";
import DocumentUpload from "./Components/DocumentUpload/DocumentUpload";
import EventManagement from "./Components/EventManagement/EventManagement";
import EventMain from "./Components/EventHome/eventMain";
import GroupInfo from "./Components/GroupInfo/GroupInfo";
import NewGroup from "./Components/NewGroup/NewGroup";
import AltMatching from "./Components/Matching/AltMatching";

const store = createStore(reducer);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Navi></Navi>
      <Switch>
        <Route authorize={['user', 'admin']} exact path="/admin">
          <AdminMain />
        </Route>
        <Route authorize={['user', 'admin']} exact path="/matching">
         <Matching></Matching>
        </Route>
        <Route authorize={['user', 'admin']} exact path="/jurie">
          <JuriePage />
        </Route>
        <Route authorize={['user', 'admin']} exact path="/messages">
          <Messages />
        </Route>
        <Route authorize={['user', 'admin']} exact path="/livestream">
          <Livestream />
        </Route>
        <Route authorize={['user', 'admin']} exact path="/profile">
          <ProfileInfo />
        </Route>
        <Route authorize={['user', 'admin']} exact path="/signedHackathons">
          <SignedHackathons></SignedHackathons>
        </Route>
        <Route authorize={['user', 'admin']} exact path="/voting">
          <Voting></Voting>
        </Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/register">
          <Register></Register>
        </Route>
        <Route exact path="/groupInfo">
          <GroupInfo></GroupInfo>
        </Route>
        <Route exact path="/newGroup">
          <NewGroup></NewGroup>
        </Route>
        <Route authorize={['user', 'admin']} exact path="/newHackathon">
         <NewHackathon></NewHackathon>
        </Route>
        <Route authorize={['user', 'admin']} exact path="/eventDetails">
         <EventDetails></EventDetails>
        </Route>
        <Route authorize={['user', 'admin']} exact path="/schedule">
        <EventSchedule></EventSchedule>
        </Route>
        <Route authorize={['user', 'admin']} exact path="/resultChart">
         <ResultChart></ResultChart>
        </Route>
        <Route authorize={['user', 'admin']} exact path="/privateChat">
         <PrivateChat></PrivateChat>
        </Route>
        <Route authorize={['user', 'admin']} exact path="/documents">
         <DocumentUpload></DocumentUpload>
        </Route>
        <Route authorize={['user', 'admin']} exact path="/manageEvent">
         <EventManagement></EventManagement>
        </Route>
        <Route authorize={['user', 'admin']} exact path="/eventMain">
         <EventMain></EventMain>
        </Route>
        <Route authorize={['user', 'admin']} path="/">
          <App />
        </Route>
      </Switch>
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
