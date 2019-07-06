import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import FileSelector from './FileSelector';
import CompileButton from './CompileButton';
import { Link } from 'react-router-dom';

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
                <NavDropdown.Item><FileSelector label="Open..." onFileLoaded={(e) => props.onFileLoaded(e)} /></NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Sprites" onSelect={props.onSelect}>
                <NavDropdown.Item href="/import">Import...</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item eventKey="chicken.png">Ninja</NavDropdown.Item>
                <NavDropdown.Item eventKey="owls.png">Owls and Butterflies</NavDropdown.Item>
                <NavDropdown.Item eventKey="mushrooms.png">Mushrooms</NavDropdown.Item>
                <NavDropdown.Item eventKey="desert.png">Desert</NavDropdown.Item>
                <NavDropdown.Item eventKey="caterpillar.png">Caterpillar</NavDropdown.Item>
                <NavDropdown.Item eventKey="bomber.png">Bomber</NavDropdown.Item>
                <NavDropdown.Item eventKey="snake.png">Snake</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={props.onOpenSettings}>Settings</Nav.Link>
              </Nav>
              <Nav className="main-links">
                <ButtonGroup>
                  <Button className="nav-button" variant="danger" as={Link} to="/">Rules</Button>
                  <Button className="nav-button" variant="info" as={Link} to="/map">Map</Button>
                  <Button className="nav-button" variant="success" as={Link} to="/play">Play</Button>
                </ButtonGroup>
                <CompileButton handlePlay={props.onPlay} programState={props.programState}></CompileButton>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
 );
}

export default MainNavbar;