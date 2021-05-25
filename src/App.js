import React from "react";
import ClassDemos from './ClassDemos.js';
import HomePage from './HomePage.js';
import Assignment2 from './Assignment2';
import InteractiveDemos from './InteractiveDemos';
import Assignment3 from './Assignment3';
import Assignment4 from './Assignment4';
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                    <div className="col-9">
                        <AboutNav />
                    </div>
                    <div className="col-9">
                        <Switch>
                            <Route exact path="/info474-react-parcel-template/" component={Assignment4} />
                            <Route path="/info474-react-parcel-template/home" component={HomePage} />
                            <Route path="/info474-react-parcel-template/demos" component={ClassDemos} />
                            <Route path="/info474-react-parcel-template/assignment2" component={Assignment2} />
                            <Route path="/info474-react-parcel-template/demos2" component={InteractiveDemos} />
                            <Route path="/info474-react-parcel-template/assignment3" component={Assignment3} />
                            
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
            <NavLink exact to="/info474-react-parcel-template/" className="nav-link" id="nav-li" activeClassName={"activeLink"}>Final Project</NavLink>
            <NavLink exact to="/info474-react-parcel-template/home" className="nav-link" id="nav-li" activeClassName={"activeLink"}>Home Page</NavLink>
            <NavLink exact to="/info474-react-parcel-template/demos" className="nav-link" id="nav-li" activeClassName={"activeLink"}>Class Demos</NavLink>
            <NavLink exact to="/info474-react-parcel-template/assignment2" className="nav-link" id="nav-li" activeClassName={"activeLink"}>Assignment 2</NavLink>
            <NavLink exact to="/info474-react-parcel-template/demos2" className="nav-link" id="nav-li" activeClassName={"activeLink"}>Interactive Demos</NavLink>
            <NavLink exact to="/info474-react-parcel-template/assignment3" className="nav-link" id="nav-li" activeClassName={"activeLink"}>Assignment 3</NavLink>
        </Navbar>
    )
}

export default App;
