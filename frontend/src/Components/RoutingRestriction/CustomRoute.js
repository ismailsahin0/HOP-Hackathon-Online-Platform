import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const CustomRoute = props => {
  const [returnedRoute, setReturnedRoute] = useState("");
  useEffect(() => {
    switch (props.condition) {
      case "teacher":
        return setReturnedRoute(
          props.user.role === "teacher" ? (
            <Route {...props} />
          ) : (
            <Redirect to="/index" />
          )
        );
      case "student":
        return setReturnedRoute(
          props.user.role === "student" ? (
            <Route {...props} />
          ) : (
            <Redirect to="/index" />
          )
        );
      case "signedIn":
        return setReturnedRoute(
          props.user.isSignedIn ? <Route {...props} /> : <Redirect to="/index" />
        );
      default:
        return setReturnedRoute(<Route {...props} />);
    }
  }, [props.user]);
  return <>{returnedRoute}</>;
};

const mapStateToProps = state => ({
  user: state.userReducer
});
export default connect(
  mapStateToProps,
  null
)(CustomRoute);