import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

const CustomLink = props => {
  const [returnedLink, setReturnedLink] = useState(null);
  useEffect(() => {
    switch (props.condition) {
      case "teacher":
        return setReturnedLink(
          props.user.role === "teacher" ? <Link {...props}>{props.children}</Link> : null
        );
      case "student":
        return setReturnedLink(
          props.user.role === "student" ? <Link {...props}>{props.children}</Link> : null
        );
      case "signedIn":
        return setReturnedLink(
          props.user.isSignedIn ? <Link {...props}>{props.children}</Link> : null
        );
      case "signedOut":
        return setReturnedLink(
          props.user.isSignedIn ? null : <Link {...props}>{props.children}</Link>
        );
      default:
        return setReturnedLink(<Link {...props}>{props.children}</Link>);
    }
  }, [props.user]);
  return <>{returnedLink}</>;
};

const mapStateToProps = state => ({
  user: state.userReducer
});

export default connect(
  mapStateToProps,
  null
)(CustomLink);