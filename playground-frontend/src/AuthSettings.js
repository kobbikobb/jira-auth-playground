import React, { useState, useEffect } from "react";
import { Form, Alert } from "react-bootstrap";
import * as settingsUtils from "./settingsUtils";
import * as api from './utils/apiUtils';

const AuthSettings = () => {
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
    settingsUtils.setSecret(value);

    // TODO: Debounce
    api.saveSettings({
      secret: value
    });
  };

  return (
    <Form>
      <Alert variant="info">
        Set up and get jira oauth configurations, <a href="https://developer.atlassian.com/console/myapps/">see here.</a>
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

    </Form>
  );
};

export default AuthSettings;
