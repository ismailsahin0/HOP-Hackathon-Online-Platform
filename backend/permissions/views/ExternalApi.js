import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import { useAuth0 } from "@auth/auth";
import config from "../auth_config.json";

const { apiOrigin = "http://localhost:8000" } = config;

const ExternalApiComponent = () => {
  const [state, setState] = useState({
    showResult: false,
    endpointMessage: "",
    error: null
  });

  const {
    loginWithPopup,
    getAccessTokenWithPopup
  } = useAuth0();

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({
        ...state,
        error: null
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error
      });
    }
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({
        ...state,
        error: null
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error
      });
    }

    await callPublicEndpoint();
  };
 
  const callProtectedEndpoint = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${apiOrigin}/api/protected`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const responseData = await response.json();
      setState({
        ...state,
        showResult: true,
        endpointMessage: responseData
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error
      });
    }
  };

  const callRoleBasedEndpoint = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      const response = await fetch(`${apiOrigin}/api/role`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const responseData = await response.json();
      setState({
        ...state,
        showResult: true,
        endpointMessage: responseData
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error
      });
    }
  };

  const callPublicEndpoint = async () => {
    try {
      const response = await fetch(`${apiOrigin}/api/public`);
      const responseData = await response.json();
      setState({
        ...state,
        showResult: true,
        endpointMessage: responseData
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error
      });
    }
  };

  const callRoleBasedEndpoint = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${apiOrigin}/api/protected/role`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const responseData = await response.json();
      setState({
        ...state,
        showResult: true,
        endpointMessage: responseData
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error
      });
    }
  };

  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };


  return (
    <>
      <div className="">
        {state.error === "consent_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              className="alert-link"
              onClick={(e) => handle(e, handleConsent)}
            >
              consent to get access to users api
            </a>
          </Alert>
        )}

        {state.error === "login_required" && (
          <Alert color="warning">
            You need to{" "}
            <a
              href="#/"
              className="alert-link"
              onClick={(e) => handle(e, handleLoginAgain)}
            >
              log in again
            </a>
          </Alert>
        )}
      </div>
    </>
  );
};

export default ExternalApiComponent;