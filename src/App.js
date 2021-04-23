import React from "react";
import ClassDemos from './ClassDemos.js';
import { Route, Switch, Link, Redirect, NavLink } from 'react-router-dom';

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
                <div className="row">
                    <div className="col-3">
                        <AboutNav />
                    </div>
                    <div className="col-9">
                        <Switch>
                            <Route exact path="/" />
                            <Route path="/demos" component={ClassDemos} />
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </div>
            </main>
            {/* <ClassDemos /> */}
            <footer className="container">
                <p>University of Washington</p>
            </footer>
        </div>
    );

    // return <svg style={{border: "1px solid lightgrey", width: viewWidth, height: viewHeight}}>
    //     <circle cx={0} cy={viewHeight} r="5" />
    //     <rect x="200" y="100" width="10" height="10" />
    //     <rect x={200} y={200} width={10} height={10} fill="rgb(230,230,230)" />
    //     <rect x={212} y={200} width={10} height={10} fill="rgb(230,230,230)" />
    //     <rect x={224} y={200} width={10} height={10} fill="rgb(230,230,230)" />
    //     <rect x={236} y={200} width={10} height={10} fill="rgb(230,230,230)" />
    //     <rect x={248} y={200} width={10} height={10} />
    //     <line x1="20" y1={viewHeight - 50} x2="150" y2="100" stroke="black" />
    //     <text x="20" y="35" class="small" style={{font: "italic 13px sans- serif"}}>
    //         Price history of 100 randomly selected Pokemon cards
    //         Changed the name of the repo
    //     </text>
    // </svg>;
    // return <div>Hello from react</div>;
}

function AboutNav() {
    return (
        <nav id="aboutLinks">
            <h2>About</h2>
            <ul classNAme="list-unstyled">
                <li><NavLink exact to="/" className="nav-link" activeClassName={"activeLink"}>Home Page</NavLink></li>
                <li><NavLink exact to="/" className="nav-link" activeClassName={"activeLink"}>Class Demos</NavLink></li>
                <li><NavLink exact to="/" className="nav-link" activeClassName={"activeLink"}>Assignment 2</NavLink></li>
            </ul>
        </nav>
    )
}

export default App;
