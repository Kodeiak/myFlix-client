import React from "react";
import ReactDOM from "react-dom";
import { MainView } from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";

import "./index.scss";

// create main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container fluid>
        <MainView />
      </Container>
    );
  }
}

// find the root of the app
const container = document.getElementsByClassName("app-container")[0];

// render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);