import React from "react";
import ReactDOM from "react-dom";
import { MainView } from "./components/main-view/main-view";

import "./index.scss";

// create main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <MainView />
    );
  }
}

// find the root of the app
const container = document.getElementsByClassName("app-container")[0];

// render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);