import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
// In newer version of the react-router-dom Switch keyword has been replaced by Routes
// import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <p>This is the home Page.</p>
                    </Route>
                    <Route path="/join" component={RoomJoinPage}></Route>
                    <Route path="/create" component={CreateRoomPage}></Route>
                </Switch>
            </Router>
        );
    }
}
