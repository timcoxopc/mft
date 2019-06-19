import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'

function MainNavbar(props) {
 return (
          <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="#home">Muffit</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav>
              <NavDropdown title="File">
                <NavDropdown.Item href="/new">New</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onSelect={props.onExportRules}>Save...</NavDropdown.Item>
                <NavDropdown.Item onSelect={props.onImportRules}>Open...</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Sprites" onSelect={props.onSelect}>
                <NavDropdown.Item href="/import">Import...</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="chicken">Ninja</NavDropdown.Item>
                <NavDropdown.Item eventKey="owls">Owls and Butterflies</NavDropdown.Item>
                <NavDropdown.Item eventKey="mushrooms">Mushrooms</NavDropdown.Item>
                <NavDropdown.Item eventKey="desert">Desert</NavDropdown.Item>
                <NavDropdown.Item eventKey="caterpillar">Caterpillar</NavDropdown.Item>
                <NavDropdown.Item eventKey="bomber">Bomber</NavDropdown.Item>
                <NavDropdown.Item eventKey="snake">Snake</NavDropdown.Item>
              </NavDropdown>
              </Nav>
              <Nav className="main-links">
                <Nav.Link as={Link} to="/">Rules</Nav.Link>
                <Nav.Link as={Link} to="/map">Map</Nav.Link>
                <Nav.Link as={Link} to="/play">Play</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
 );
}

export default MainNavbar;