import React from "react";
import ClassDemos from './ClassDemos.js';
import HomePage from './HomePage.js';
import Assignment2 from './Assignment2';
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

// const App = () => {
function App(props) {
    return (
        <div>
            <header className="jumbotron jumbotron-fluid py-4">
                <div className="container">
                    <h1><Link to="/"> INFO 474: Data Visualization </Link></h1>
                    <h2>Zach Grande, Spring 2021</h2>
                </div>
            </header>

            <main className="container">
                <div>
                    <div className="col-3">
                        <AboutNav />
                    </div>
                    <div className="col-9">
                        <Switch>
                            <Route exact path="/info474-react-parcel-template/" component={HomePage} />
                            <Route path="/info474-react-parcel-template/demos" component={ClassDemos} />
                            <Route path="/info474-react-parcel-template/assignment2" component={Assignment2} />
                            <Redirect to="/info474-react-parcel-template/" />
                        </Switch>
                    </div>
                </div>
            </main>
            <footer className="container">
                <p>University of Washington</p>
            </footer>
        </div>
    );
}

function AboutNav() {
    return (
        <Navbar bg="navbar navbar-expand-lg navbar-light bg-light" id="nav-bar">
            <NavLink exact to="/info474-react-parcel-template/" className="nav-link" id="nav-li" activeClassName={"activeLink"}>Home Page</NavLink>
            <NavLink exact to="/info474-react-parcel-template/demos" className="nav-link" id="nav-li" activeClassName={"activeLink"}>Class Demos</NavLink>
            <NavLink exact to="/info474-react-parcel-template/assignment2" className="nav-link" id="nav-li" activeClassName={"activeLink"}>Assignment 2</NavLink>
        </Navbar>
    )
}

export default App;
