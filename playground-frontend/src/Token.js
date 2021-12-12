import React, { useState, useEffect } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import * as settingsUtils from "./settingsUtils";
import * as api from './utils/apiUtils';

const Token = () => {
  const [authCode, setAuthCode] = useState(settingsUtils.getCode());
  const [authTokens, setAuthTokens] = useState([]);

  const onAuthCodeChanged = (e) => {
    const value = e.target.value;
    setAuthCode(value);
    settingsUtils.setCode(value);
  };


  useEffect(() => {
    async function fetchData() {
      const authTokenValues = await api.getAuthTokens();
      setAuthTokens(authTokenValues);
    };

    fetchData();
  }, []);
  

  const onGetAuthToken = async (event) => {
    event.preventDefault();
    
    try {
      const newToken = await api.setAuthCode(authCode)

      console.log('newToken', JSON.stringify(newToken));
      console.log('access_token', newToken.access_token);
    } catch (error) {
      console.log('Setting token failed', error.message);
      alert(error.message);
    }
  };

  return (
    <Form>
      <Alert variant="warning">
        Manually copy the auth code from the oauth redirect and add it below.
      </Alert>

      <Form.Group className="mb-3" controlId="authCode">
        <Form.Label>Authentication code</Form.Label>
        <Form.Control
          type="text"
          value={authCode}
          onChange={onAuthCodeChanged}
          placeholder="Enter authentication code"
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={onGetAuthToken}>
        Set auth token
      </Button>

      <Alert variant="success" style={{ marginTop: "20px" }}>
        Authentication token: {JSON.stringify(authTokens)}
      </Alert>
    </Form>
  );
};

export default Token;
