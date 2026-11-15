import { useEffect } from 'react';
import ClassDemos from './ClassDemos';
import HomePage from './HomePage';
import Assignment2 from './Assignment2';
import InteractiveDemos from './InteractiveDemos';
import Assignment3 from './Assignment3';
import Assignment4 from './Assignment4';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const navItems = [
    { to: '/', label: 'Final Project' },
    { to: '/home', label: 'Home Page' },
    { to: '/demos', label: 'Class Demos' },
    { to: '/assignment2', label: 'Assignment 2' },
    { to: '/demos2', label: 'Interactive Demos' },
    { to: '/assignment3', label: 'Assignment 3' },
];

function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <SiteNav />

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

            <footer className="site-footer py-4">
                <Container className="d-flex flex-column flex-sm-row justify-content-between gap-2">
                    <span>INFO 474: Data Visualization &middot; Spring 2021</span>
                    <span>University of Washington</span>
                </Container>
            </footer>
        </>
    );
}

function SiteNav() {
    return (
        <Navbar expand="lg" sticky="top" collapseOnSelect className="site-navbar py-2">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <span className="brand-title">INFO 474: Data Visualization</span>
                    <span className="brand-subtitle">Zach Grande, Spring 2021</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="site-nav" />
                <Navbar.Collapse id="site-nav">
                    <Nav className="ms-auto gap-lg-1 py-2 py-lg-0">
                        {navItems.map(({ to, label }) => (
                            <Nav.Link key={to} as={NavLink} to={to} eventKey={to} end>
                                {label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default App;
