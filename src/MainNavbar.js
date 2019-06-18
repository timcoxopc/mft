import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MainNavbar(props) {
 return (
          <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Navbar.Brand href="#home">Muffit</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              <NavDropdown title="File" id="basic-nav-dropdown">
                <NavDropdown.Item href="/new">New</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/open">Open...</NavDropdown.Item>
                <NavDropdown.Item href="/export">Export...</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Sprites" id="basic-nav-dropdown" onSelect={props.onSelect}>
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
            </Navbar.Collapse>
          </Navbar>
 );
}

export default MainNavbar;