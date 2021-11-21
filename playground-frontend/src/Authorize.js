import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuthLink } from "./utils/authUtils";
import * as api from './utils/apiUtils';

const Autorize = () => {
  const [clientId, setClientId] = useState('');
  const [secret, setSecret] = useState('');

    useEffect(() => {
      async function fetchSettings() {
        const settings = await api.getSettings();

        if(settings != null) {
          setClientId(settings.clientId);
          setSecret(settings.secret);
        }
      };

      fetchSettings();
    }, []);

  const onClientIdChanged = (e) => {
    const value = e.target.value;
    setClientId(value);

    // TODO: Debounce
    api.saveSettings({
      clientId: value
    });
  };

  const onSecretChanged = (e) => {
    const value = e.target.value;
    setSecret(value);

    // TODO: Debounce
    api.saveSettings({
      secret: value
    });
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
