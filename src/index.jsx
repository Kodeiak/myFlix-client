import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import { createStore } from "redux";
import { Provider } from "react-redux";
import moviesApp from "./reducers/reducers";
import { devToolsEnhancer } from "redux-devtools-extension";

// no {} necessary as MainView is default export from main-view
import MainView from "./components/main-view/main-view";
import "./index.scss";

const store = createStore(moviesApp, devToolsEnhancer());

// create main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container fluid className="login-form">
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// find the root of the app
const container = document.getElementsByClassName("app-container")[0];

// render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);