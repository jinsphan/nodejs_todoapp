import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React from "react";
import ReactDOM from "react-dom";
// import createBrowserHistory from "history/createBrowserHistory";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";
import thunk from "redux-thunk";
import rootReducer from "app/reducers";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, autoRehydrate } from "redux-persist";
import "normalize.css/normalize.css";
import "./custom.css";
import theme from "./app/theme";
import CircularProgress from "material-ui/CircularProgress";

// Component imports
import App from "./app/containers/App";

// This is for material-ui's tap event as per the documentations
injectTapEventPlugin();

// Material-ui settings
const muiTheme = getMuiTheme({
  ...theme,
  fontFamily: "'Open sans', sans-serif",
});

// Redux Settings
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)),
  autoRehydrate(),
);

// React router things
// const history = createBrowserHistory();

class AppProvider extends React.Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(
      store,
      {
        blacklist: [
          "userActive",
          "todos",
        ],
      },
      () => {
        this.setState({ rehydrated: true });
      },
    );
  }

  render() {
    if (!this.state.rehydrated) {
      return <div className="-text-center"><CircularProgress /></div>;
    }

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router>
      <AppProvider />
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root"),
);
