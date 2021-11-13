import React, { useState } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import { getAuthToken } from "./authUtils";
import * as settingsUtils from "./settingsUtils";

const Token = () => {
  const [authCode, setAuthCode] = useState(settingsUtils.getCode());
  const [accessToken, setAccessToken] = useState(settingsUtils.getToken().access_token);

  const onAuthCodeChanged = (e) => {
    const value = e.target.value;
    setAuthCode(value);
    settingsUtils.setCode(value);
  };

  const onGetAuthToken = async (event) => {
    event.preventDefault();
    
    try {
      const newToken = await getAuthToken(
        settingsUtils.getClientId(),
        settingsUtils.getSecret(),
        authCode
      );
      setAccessToken(newToken.access_token);
      settingsUtils.setToken(newToken);
    } catch (error) {
      console.log('error', error);
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
        Get auth token
      </Button>

      <Alert variant="success" style={{ marginTop: "20px" }}>
        Authentication token: {accessToken}
      </Alert>
    </Form>
  );
};

export default Token;
