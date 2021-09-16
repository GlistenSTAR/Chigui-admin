import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import React, { Component } from 'react';
import Login from "./components/auth/Login";
import Landing from "./components/layout/Landing";
import NotFound from "./components/layout/NotFound";
import { Provider } from "react-redux";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Register from "./components/auth/Register";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/jquery/dist/jquery.min';
import '../node_modules/popper.js/dist/popper';

import User from "./components/pages/Users";
import Battery from "./components/pages/Battery";
import Electronic from "./components/pages/Electronic";
import Car from "./components/pages/Car";
import Review from "./components/pages/Review";
import Oil from "./components/pages/Oil";
import Highlight from "./components/pages/Highlight";
import Quotes from "./components/pages/Quotes";
import Services from "./components/pages/Services";

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = "./login";
    }
}

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/register" component={ Register } />
                            <Route exact path="/login" component={ Login } />
                            <Switch>
                                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                <PrivateRoute exact path="/users" component={User} />
                                <PrivateRoute exact path="/battery" component={Battery} />
                                <PrivateRoute exact path="/electronic" component={Electronic} />
                                <PrivateRoute exact path="/car" component={Car} />
                                <PrivateRoute exact path="/review" component={Review}/>
                                <PrivateRoute exact path="/oil" component={Oil}/>
                                <PrivateRoute exact path="/highlight" component={Highlight}/>
                                <PrivateRoute exact path="/quote" component={Quotes}/>
                                <PrivateRoute exact path="/services" component={Services}/>
                            </Switch>
                            <Route exact path="*" component={NotFound} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
