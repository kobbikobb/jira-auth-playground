import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Autorize from "./Authorize";
import Sidebar from "./Sidebar";
import Token from "./Token";
import SitePicker from "./SitePicker";
import './App.css';

function App() {
  return (
    <Router>
      <Container fluid id="app">
        <Row id="app-header-wrapper">
          <h1 className="app-header">The Playground</h1>
          </Row>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Sidebar />
          </Col>
          <Col xs={10} id="page-content-wrapper">
            <Switch>
              <Route path="/authorize">
                <Autorize />
              </Route>
              <Route path="/token">
                <Token />
              </Route>
              <Route path="/site-picker">
                <SitePicker />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
