import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import "../assets/scss/main.scss";

import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import getCurrentUser from "../services/getCurrentUser";

import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import PostForm from "./layout/PostForm";
import PostList from "./layout/PostList";
import CurrentUserShow from "./layout/CurrentUserShow";
import UserShow from "./layout/UserShow";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route exact path="/media" component={PostForm}/>
        <Route exact path="/user-profile/:id" render={routeProps => (
          <UserShow {...routeProps} currentUser={currentUser} />
        )} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/my-profile" component={CurrentUserShow} user={currentUser}/>
      </Switch>
    </Router>
  );
};

export default hot(App);
