import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <Nav className="d-none d-md-block sidebar">
      <Nav.Item>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/auth-settings" className="nav-link">
          Auth settings
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/authorize" className="nav-link">
          Authorize
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/token" className="nav-link">
          Token
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/site-picker" className="nav-link">
          Site Picker
        </Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
