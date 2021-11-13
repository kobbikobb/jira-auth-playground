import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuthLink } from "./authUtils";
import * as settingsUtils from "./settingsUtils";

const Autorize = () => {
  const [clientId, setClientId] = useState(settingsUtils.getClientId());
  const [secret, setSecret] = useState(settingsUtils.getSecret());

  const onClientIdChanged = (e) => {
    const value = e.target.value;
    setClientId(value);
    settingsUtils.setClientId(value);
  };

  const onSecretChanged = (e) => {
    const value = e.target.value;
    setSecret(value);
    settingsUtils.setSecret(value);
  };

  const authLink = getAuthLink(clientId);

  return (
    <Form>
      <Alert variant="warning">
        After authenticating, you will be redirected with a code that you can use to manually get a authentication token. <br />
        You can manually set it under <Link to="/token">Token</Link>.
      </Alert>

      <Form.Group className="mb-3" controlId="formClientId">
        <Form.Label>ClientId</Form.Label>
        <Form.Control
          type="text"
          value={clientId}
          onChange={onClientIdChanged}
          placeholder="Enter Client Id"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSecret">
        <Form.Label>Secret</Form.Label>
        <Form.Control
          type="password"
          value={secret}
          onChange={onSecretChanged}
          placeholder="Secret"
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        href={authLink}
        target="_blank"
        disabled={authLink.length === 0}
      >
        Authorize
      </Button>
    </Form>
  );
};

export default Autorize;
