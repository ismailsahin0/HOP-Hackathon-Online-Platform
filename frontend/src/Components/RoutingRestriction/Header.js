import React from "react";
import CustomLink from "./CustomLink";

export const Header = () => {
  return (
    <>
      <CustomLink condition="signedIn" to="/logout">
        Logout
      </CustomLink>
      <CustomLink condition="signedOut" to="/login">
        To Login Page
      </CustomLink>
      <CustomLink condition="signedIn" to="/restricted">
        To Restricted Page
      </CustomLink>
      <CustomLink condition="teacher" to="/only-teacher">
        To Only Teacher Page
      </CustomLink>
      <CustomLink condition="student" to="/only-student">
        To Only Student Page
      </CustomLink>
    </>
  );
};

export default Header;