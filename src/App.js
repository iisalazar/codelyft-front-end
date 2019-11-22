import React, { Fragment } from 'react';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import Alerts from "./components/Alerts";


// the state providers
import AlertState from "./context/alert/AlertState";
import SnippetState from "./context/snippet/SnippetState";
import AuthState from "./context/auth/AuthState";
import ModalState from "./context/modal/ModalState";

import setAuthToken from "./utils/setAuthToken";

import ModalForm from "./components/modal/ModalForm";
import SnippetModal from "./components/modal/SnippetModal";

import Widget from "./components/Widget";
import './App.css';
// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCode, faUpload } from '@fortawesome/free-solid-svg-icons';

library.add(faCode);
library.add(faUpload)

if(localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <SnippetState>
        <AlertState>
          <ModalState>
            <Router>
              <SnippetModal />
              <ModalForm />
              <Fragment>
                <Navbar />
                <div className="container">
                  <Alerts />
                  <Switch>
                    <PrivateRoute path="/" exact component={ Profile } />
                    <Route path="/register" exact component = { Register } />
                    <Route path="/login" exact component = { Login } />
                  </Switch>
                  <Widget />
                </div>
              </Fragment>
            </Router>
          </ModalState>
        </AlertState>
      </SnippetState>
    </AuthState>
  );
}

export default App;
