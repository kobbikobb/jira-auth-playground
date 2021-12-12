import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as api from './utils/apiUtils';

const Autorize = () => {
  const [authLink, setAuthLink] = useState(null);

  useEffect(() => {
    async function fetchLink() {
      const linkValue = await api.getAuthLink();
      setAuthLink(linkValue);
    };

    fetchLink();
  }, []);

  if(!authLink) {
    return null;
  }
  
  return (
    <Form>
      <Alert variant="warning">
        After authenticating, you will be redirected with a code that you can use to manually get a authentication token. <br />
        You can manually set it under <Link to="/token">Token</Link>.
      </Alert>

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
