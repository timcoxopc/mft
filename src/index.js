/*

  Use context see: https://www.reddit.com/r/reactjs/comments/9j4h9n/how_to_pass_a_function_to_a_grandchild_in_react/

*/
import React from 'react';
import ReactDOM from 'react-dom';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ExportModal from './ExportModal';
import ImportModal from './ImportModal';
import Rule from './Rule';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import './index.css';

class RuleSet extends React.Component {
  constructor(props) {
    super(props);
    let emptyRules = []
    for (let i = 0; i < 40; i++) {
      emptyRules.push([0, 0, 0, 0, 0, 0, 0]);
    }
    this.state = {
      rules: emptyRules,
      modalShow: false
    }
  }

  handleClick(i, rule, value) {
    //console.log("*", i, rule, value);
    const rules = this.state.rules.slice();
    if(value == undefined && i != 6){
      rules[rule - 1][i]++ ; 
      if(rules[rule - 1][i] > 5) {
        rules[rule - 1][i] = 0
      }
    } else {
      rules[rule - 1][i] = value;
    }
    this.setState({
      rules: rules
    });
  }

  openFile(file) {
    console.log("Open file", file);
    this.setState({ modalShow: false });
  }

  render() {
    const totalRules = 40;
    let rules = [];
    for (let i = 0; i < totalRules; i++) {
      rules.push(<Rule index={i + 1} rule={this.state.rules[i]} onClick={(cell, rule, value) => this.handleClick(cell, rule, value)} />);
    }

    let modalClose = () => this.setState({ modalShow: false });

    return (
        <div>
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
              <NavDropdown title="Sprites" id="basic-nav-dropdown">
                <NavDropdown.Item href="/import">Import...</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/import">Ninja</NavDropdown.Item>
                <NavDropdown.Item href="/import">Owls and Butterflies</NavDropdown.Item>
                <NavDropdown.Item href="/import">Mushrooms</NavDropdown.Item>
                <NavDropdown.Item href="/import">Desert</NavDropdown.Item>
                <NavDropdown.Item href="/import">Caterpillar</NavDropdown.Item>
                <NavDropdown.Item href="/import">Bomber</NavDropdown.Item>
                <NavDropdown.Item href="/import">Snake</NavDropdown.Item>
              </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route path="/new" exact component={ExportModal} />
            <Route path="/export" exact component={ExportModal} />
            <Route path="/open" exact component={ExportModal} />
          </Switch>

          {rules}
          
          <ImportModal show={this.state.modalShow} onHide={modalClose} openfile={(file) => this.openFile(file)} />
        </div>
    );
  }
}

// ========================================
/*
function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
*/
// ========================================

ReactDOM.render(
  <Router>
    <RuleSet />
  </Router>, 
  document.getElementById('root')
);
