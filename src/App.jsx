import React from "react";
import ClassDemos from './ClassDemos';
import HomePage from './HomePage';
import Assignment2 from './Assignment2';
import InteractiveDemos from './InteractiveDemos';
import Assignment3 from './Assignment3';
import Assignment4 from './Assignment4';
import { Routes, Route, Link, Navigate, NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// const App = () => {
function App(props) {
    return (
        <div>
            <header className="jumbotron jumbotron-fluid py-4 mb-0">
                <div className="d-flex mx-5 px-5 flex-column">
                    <div>
                        <h1><Link to="/"> INFO 474: Data Visualization </Link></h1>
                    </div>
                    <div>
                        <h2>Zach Grande, Spring 2021</h2>
                    </div>
                </div>
                <div className="d-flex mx-5 px-3 flex-column text-center">
                    <AboutNav />
                </div> 
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Assignment4/>} />
                    <Route path="/home" element={<HomePage/>} />
                    <Route path="/demos" element={<ClassDemos/>} />
                    <Route path="/assignment2" element={<Assignment2/>} />
                    <Route path="/demos2" element={<InteractiveDemos/>} />
                    <Route path="/assignment3" element={<Assignment3/>} />

                    {/* <Route path="*" element={<Navigate to="/" />} /> */}
                </Routes>
            </main>
            <footer className="container pt-5">
                <p className="float-right">University of Washington</p>
            </footer>
        </div>
    );
}

function AboutNav() {
    const basePath = '/info474-react-parcel-template'
    return (
        <Navbar bg="navbar navbar-expand-lg navbar-light bg-transparent" id="nav-bar">
            <NavLink to="/" className="nav-link" id="nav-li" activeclassname={"activeLink"}>Final Project</NavLink>
            <NavLink to="/home" className="nav-link" id="nav-li" activeclassname={"activeLink"}>Home Page</NavLink>
            <NavLink to="/demos" className="nav-link" id="nav-li" activeclassname={"activeLink"}>Class Demos</NavLink>
            <NavLink to="/assignment2" className="nav-link" id="nav-li" activeclassname={"activeLink"}>Assignment 2</NavLink>
            <NavLink to="/demos2" className="nav-link" id="nav-li" activeclassname={"activeLink"}>Interactive Demos</NavLink>
            <NavLink to="/assignment3" className="nav-link" id="nav-li" activeclassname={"activeLink"}>Assignment 3</NavLink>
        </Navbar>
    )
}

export default App;
