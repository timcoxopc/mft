import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import ExportModal from './ExportModal';
import ImportModal from './ImportModal';
import RuleSet from './RuleSet';
import Map from './Map';
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

class Muffit extends React.Component {

  constructor(props) {
    super(props);
    let emptyRules = []
    for (let i = 0; i < 40; i++) {
      emptyRules.push([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]);
    }

    let cells = new Array(375).fill(1);
    console.log(cells);
    this.state = {
      rules: emptyRules,
      mapCells: cells,
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

  handleMapClick(cell) {
    const cells = this.state.mapCells.slice();
    cells[cell] = this.state.spriteIndex;
    this.setState({
      mapCells: cells
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
    var saveObj = {};
    saveObj.rules = this.state.rules.slice();
    saveObj.map = this.state.mapCells.slice();
    downloadObjectAsJson(saveObj, "test");
  }

  importRules() {
    fetch('./files/test.mft')
    .then((res) => res.json())
    .then((data) => {
      
      // Pull in rules - Optimize
      const rules = this.state.rules.slice();
      for (let i = 0; i < data.rules.length; i++) {
        for(let j = 0; j < rules[i].length; j++) {
          rules[i][j] = data.rules[i][j];
        }
      }

      // Pull in map
      const mapCells = data.map.slice();
  
      this.setState ({
        rules: rules,
        mapCells: mapCells
      });
    })
  }

  selectSpriteSheet(value) {
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

    let modalClose = () => this.setState({ modalShow: false });

    return (
        <div>
          <MainNavbar 
            onSelect={(e) => this.selectSpriteSheet(e)} 
            onExportRules={() => this.exportRules()}
            onImportRules={() => this.importRules()}
          />
          <Switch>
            <Route 
              path="/" exact 
              render={props => 
                <RuleSet
                  {...props}
                  rules={this.state.rules.slice()}
                  spriteIndex={this.state.spriteIndex}
                  spriteSheet={this.state.spriteSheet} 
                  spriteWidth={this.state.spriteWidth} 
                  spriteHeight={this.state.spriteHeight} 
                  spritesPerRow={this.state.spritesPerRow} 
                  onRuleClick={(i, rule, value) => this.handleClick(i, rule, value)} 
                  onSpriteSelect={(e) => this.setSprite(e)}
                />
              }
              
            />
            <Route 
              path="/map" exact 
              render={props => 
                <Map
                  {...props}
                  rules={this.state.rules.slice()}
                  cells={this.state.mapCells.slice()}
                  spriteIndex={this.state.spriteIndex}
                  spriteSheet={this.state.spriteSheet} 
                  spriteWidth={this.state.spriteWidth} 
                  spriteHeight={this.state.spriteHeight} 
                  spritesPerRow={this.state.spritesPerRow} 
                  onClick={(cell) => this.handleMapClick(cell)}
                  onSpriteSelect={(e) => this.setSprite(e)}
                />
              }
              
            />
            <Route path="/export" exact component={ExportModal} />
            <Route path="/open" exact component={ExportModal} />
          </Switch>

          <ImportModal 
            show={this.state.modalShow} 
            onHide={modalClose} 
            openfile={(file) => this.openFile(file)} 
          />
        </div>
    );
  }
}

////render={props => <About {...props} extra={someVariable} />} 
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
    <Muffit />
  </Router>, 
  document.getElementById('root')
);
