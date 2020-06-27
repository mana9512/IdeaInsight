import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Idea from "./components/Idea";
import "bootstrap/dist/css/bootstrap.min.css";
import PostIdea from "./components/PostIdea";
import PostSolution from "./components/PostSolution";

//REDUX
import store from "./store";
import { Provider } from "react-redux";
import Alert from "./components/Alert";
import setAuthToken from "../src/utils/setAuthToken";
import { loadUser } from "../src/action/auth";
import Landing from "./components/Landing";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/idea" component={Idea} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/ideaPost" component={PostIdea} />
            <Route exact path="/solutionPost/:id" component={PostSolution} />
          </Switch>
          
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
