import React from "react";
import { Switch } from "react-router-dom";

import CustomRoute from "./CustomRoute";
import MainIndex from "./MainIndex";
import LoginPage from "./LoginPage";
import RestrictedPage from "./RestrictedPage";
import OnlyTeacher from "./OnlyTeacher";
import OnlyStudent from "./OnlyStudent";

export const Content = () => {
  return (
    <>
      <Switch>
        <CustomRoute exact path="/index" component={MainIndex} />
        <CustomRoute
          condition="signedIn"
          exact
          path="/restricted"
          component={RestrictedPage}
        />
        <CustomRoute
          condition="teacher"
          exact
          path="/only-teacher"
          component={OnlyTeacher}
        />
        <CustomRoute
          condition="student"
          exact
          path="/only-student"
          component={OnlyStudent}
        />
        <CustomRoute exact path="/login" component={LoginPage} />
      </Switch>
    </>
  );
};

export default Content;