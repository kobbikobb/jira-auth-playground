import React, { useState, useEffect } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import * as settingsUtils from "./settingsUtils";
import * as api from './utils/apiUtils';
import AuthTokenItem from './AuthTokenItem';

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
      setAuthTokens(await api.getAuthTokens());
    };

    fetchData();
  }, []);
  

  const onSetAuthToken = async (event) => {
    event.preventDefault();
    
    try {
      await api.setAuthCode(authCode)
      setAuthTokens(await api.getAuthTokens());
    } catch (error) {
      alert(error.message);
    }
  };

  const authTokensSorted = authTokens.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1)

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

      <Button variant="primary" type="submit" onClick={onSetAuthToken}>
        Set auth token
      </Button>

      <h4 style={{marginTop: 20}}>Authentication tokens</h4>
      {
        authTokensSorted.map(authToken => 
          <AuthTokenItem authToken={authToken} isActive={authToken === authTokensSorted[0]}/>)
      }
   
    </Form>
  );
};

export default Token;
