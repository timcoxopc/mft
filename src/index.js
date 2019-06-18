import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import ExportModal from './ExportModal';
import ImportModal from './ImportModal';
import SpritePalette from './SpritePalette';
import Rule from './Rule';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import './index.css';

const TRIGGER1 = 0;
//const TRIGGER2 = 1;
const CELL1 = 2;
const OUTPUT = 7;
const SPECIAL1 = 8;
//const SPECIAL2 = 9;
const ARROW = 10;

class RuleSet extends React.Component {

  constructor(props) {
    super(props);
    let emptyRules = []
    for (let i = 0; i < 40; i++) {
      emptyRules.push([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]);
    }

    this.state = {
      rules: emptyRules,
      modalShow: false,
      spriteSheet: "chicken",
      spriteWidth: 32,
      spriteHeight: 32,
      spritesPerRow: 8,
      spriteIndex: 1  
    }
  }
  
  handleClick(i, rule, value) {
    //console.log("*", i, rule, value);
    const rules = this.state.rules.slice();
    if(value === undefined && (i >= CELL1 && i <= OUTPUT)) {
      rules[rule - 1][i] = this.state.spriteIndex;
    } else if (i === TRIGGER1 || i === SPECIAL1) {
      document.body.click(); // Trigger popover to hide
      rules[rule - 1][i] = value;
    } else if (i === ARROW) {
      if(rules[rule - 1][i] === 0) {
        rules[rule - 1][i] = 1;
      } else {
        rules[rule - 1][i] = 0;
      }
    }
    this.setState({
      rules: rules
    });
  }

  openFile(file) {
    console.log("OPEN file ", file);
    this.setState({ modalShow: false });
  }
  
  setSprite(spriteIndex) {
    this.setState({ spriteIndex: spriteIndex });
  }

  exportRules() {
    downloadObjectAsJson(this.state.rules, "test");
  }

  importRules() {
    fetch('./files/test.mft')
    .then((res) => res.json())
    .then((data) => {
      const rules = this.state.rules.slice();
      for (let i = 0; i < 40; i++) {
        for(let j = 0; j < rules[i].length; j++) {
          rules[i][j] = data[i][j];
        }
      }
  
      this.setState ({
        rules: rules
      });
    })
  }

  selectSpriteSheet(value) {
    //console.log("VALUE", value);
    if(value !== "chicken") {
      this.setState({
        spriteWidth: 16,
        spriteHeight: 16
      });
    } else {
      this.setState({
        spriteWidth: 32,
        spriteHeight: 32
      });
    }
    this.setState({ spriteSheet: value });
  }

  render() {
    const totalRules = 40;
    let rules = [];
    //console.log("Rule #1 " + this.state.rules[0]);
    for (let i = 0; i < totalRules; i++) {
      rules.push(
        <Rule 
          key={i}
          index={i + 1} 
          rule={this.state.rules[i]} 
          spriteSheet={this.state.spriteSheet}
          spriteWidth={this.state.spriteWidth}
          spriteHeight={this.state.spriteHeight}
          spritesPerRow={this.state.spritesPerRow}
          onClick={(cell, rule, value) => this.handleClick(cell, rule, value)} 
        />
      );
    }

    let modalClose = () => this.setState({ modalShow: false });

    return (
        <div>
          <MainNavbar 
            onSelect={(e) => this.selectSpriteSheet(e)} 
            onExportRules={() => this.exportRules()}
            onImportRules={() => this.importRules()}
          />

          <SpritePalette 
            active={this.state.spriteIndex}
            spriteSheet={this.state.spriteSheet} 
            spriteWidth={this.state.spriteWidth} 
            spriteHeight={this.state.spriteHeight} 
            spritesPerRow={this.state.spritesPerRow} 
            onClick={(index) => this.setSprite(index)} 
          />

          <div className="rules-wrapper">
            {rules}
          </div>

          <ImportModal 
            show={this.state.modalShow} 
            onHide={modalClose} 
            openfile={(file) => this.openFile(file)} 
          />
        </div>
    );
  }
}

// ========================================

function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".mft");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

// ========================================

ReactDOM.render(
  <Router>
    <RuleSet />
  </Router>, 
  document.getElementById('root')
);
