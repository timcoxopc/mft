import React from 'react';
import ReactDOM from 'react-dom';
import MainNavbar from './MainNavbar';
import ExportModal from './ExportModal';
import ImportModal from './ImportModal';
import SettingsModal from './SettingsModal';
import RuleSet from './RuleSet';
import Map from './Map';
//import Play from './Play';
import PlayEaselJS from './PlayEaselJS';
//import FileSelector from './FileSelector';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import cloneDeep from 'lodash/cloneDeep';
import './index.css';

const images = require.context('../public/img', true); // For hidden spritesheet

const TRIGGER1 = 0;
const TRIGGER2 = 1;
const CELL1 = 2;
const OUTPUT = 7;
const SPECIAL1 = 8;
//const SPECIAL2 = 9;
const ARROW = 10;

class Muffit extends React.Component {

  constructor(props) {
    super(props);

    const DEFAULT_CELLS_WIDE = 25;
    const DEFAULT_CELLS_HIGH = 15;

    let emptyRules = []
    for (let i = 0; i < 200; i++) {
      emptyRules.push([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]);
    }

    let cells = new Array(375).fill(1);

    this.state = {
      rules: emptyRules,
      convertedRules: {},
      mapCells: [cells.slice(), cells.slice(), cells.slice(), cells.slice(), cells.slice(), cells.slice(), cells.slice(), cells.slice(), cells.slice()],
      activeMap: 0,
      modalShow: false,
      settingsModalShow: false,
      spriteSheet: "chicken.png",
      spriteWidth: 32,
      spriteHeight: 32,
      spritesPerRow: 8,
      spriteIndex: 1,  
      programState:"uncompiled",
      cellswide: DEFAULT_CELLS_WIDE,
      cellshigh: DEFAULT_CELLS_HIGH,
      cellwidth: 32,
      cellheight: 32,
      timer1: 400,
      timer2: 800,
    }
  }
  
  handleClick(i, rule, value) {
    //console.log("!!!", this.state.mapCells);
    console.log("*", i, rule, value);
    const rules = this.state.rules.slice();
    if(value === undefined && (i >= CELL1 && i <= OUTPUT)) {
      rules[rule - 1][i] = this.state.spriteIndex;
    } else if (i === TRIGGER1 || i === TRIGGER2 || i === SPECIAL1) {
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
      rules: rules,
      programState: "uncompiled"
    });
  }

  handleMapClick(cell) {
    const cells = cloneDeep(this.state.mapCells);
    cells[this.state.activeMap][cell] = this.state.spriteIndex;
    this.setState({
      mapCells: cells
    });
  }

  handleUpdate(cell, value){
    const cells = cloneDeep(this.state.mapCells);
    cells[this.state.activeMap][cell] = value;
    this.setState({
      mapCells: cells
    });
  }

  handleUpdateSettings(prop, value){
    this.setState({
      [prop]: Number(value)
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
    //console.log(getImageData("sprite-sheet"));
    saveObj.rules = this.state.rules.slice();
    saveObj.map = cloneDeep(this.state.mapCells);
    saveObj.spriteSheet = this.state.spriteSheet; //getImageData("sprite-sheet")
    saveObj.cellswide = this.state.cellswide;
    saveObj.cellshigh = this.state.cellshigh;
    downloadObjectAsJson(saveObj, "test");
  }

  handleCompileButton() {
    if(this.state.programState === "uncompiled") {
      this.setState({
        programState:"compiling"
      });
      this.setState(function(currentState){
        return {
          convertedRules:convertRules(currentState.rules),
          programState:"playing"
        }
      });
    }
    else if(this.state.programState === "compiled") {
      this.setState({
        programState:"playing"
      });
    }
    else if(this.state.programState === "playing") {
      const cells = cloneDeep(this.state.mapCells);
      this.setState({
        programState:"compiled",
        mapCells: cells,
        spriteHeight: 32
      });
    }
  }

  compile() {
    this.setState(function(currentState){
      return {convertedRules:convertRules(currentState.rules)}
    });
  }

  selectSpriteSheet(value) {
    if(value !== "chicken.png" && value !== "cyber-chicken.png") {
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

  handleFileLoaded(str) {
          let data = JSON.parse(str);
          const rules = this.state.rules.slice();
          for (let i = 0; i < data.rules.length; i++) {
            for(let j = 0; j < rules[i].length; j++) {
              rules[i][j] = data.rules[i][j];
            }
          }
          
          let spriteSheet;
          if(data.spriteSheet) {
            spriteSheet = data.spriteSheet;
          }
          else {
            spriteSheet = "chicken.png";
          }

          this.selectSpriteSheet(spriteSheet);
          
          // Map
          let cells;
          if(data.map.length > 9){
            // Kludge to load old maps, open, save in new format then remove this code
            cells = cloneDeep(this.state.mapCells);
            cells[this.state.activeMap] = data.map.slice();
          }
          else {
            cells = cloneDeep(data.map);
          }
          // Remove once all files modernised?
          let cellsWide, cellsHigh;
          if(data.cellswide){
            cellsWide = Number(data.cellswide);
          } 
          else {
            cellsWide = 25;//DEFAULT_CELLS_WIDE;
          }
          if(data.cellshigh){
            cellsHigh = Number(data.cellshigh);
          } 
          else {
            cellsHigh = 15;//DEFAULT_CELLS_HIGH;
          }
          //
          //saveObj.cellswide
          
          this.setState ({
            rules: rules,
            mapCells: cells,
            cellswide: cellsWide,
            cellshigh: cellsHigh
            //spriteSheet: spriteSheet.slice()
          });
  }

  handleOpenSettings() {
    this.setState({ settingsModalShow: true });
  }

  handleChangeMap(e) {
    this.setState({ activeMap: e.target.value });
  }

  render() {

    let modalClose = () => this.setState({ modalShow: false });
    let settingsModalClose = () => this.setState({ settingsModalShow: false });
    let imgsrc = images(`./${this.state.spriteSheet}`);

    return (
        <div>
          <MainNavbar 
            onSelect={(e) => this.selectSpriteSheet(e)} 
            onExportRules={() => this.exportRules()}
            onImportRules={() => this.importRules()}
            onFileLoaded={(e) => this.handleFileLoaded(e)}
            onOpenSettings={() => this.handleOpenSettings()}
            onChangeMap={(e) => this.handleChangeMap(e)}
            onCompile={() => this.compile()}
            onPlay={() => this.handleCompileButton()}
            programState={this.state.programState}
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
                  rules={this.state.rules}
                  cells={this.state.mapCells[this.state.activeMap].slice()}
                  cellsWide={this.state.cellswide}
                  cellsHigh={this.state.cellshigh}
                  cellWidth={this.state.cellwidth}
                  cellHeight={this.state.cellheight}
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
            <Route 
              path="/play" exact 
              render={props => 
                <PlayEaselJS
                  {...props}
                  rules={this.state.convertedRules}
                  cells={cloneDeep(this.state.mapCells)}
                  activeMap={this.state.activeMap}
                  cellsWide={this.state.cellswide}
                  cellsHigh={this.state.cellshigh}
                  cellWidth={this.state.cellwidth}
                  cellHeight={this.state.cellheight}
                  spriteIndex={this.state.spriteIndex}
                  spriteSheet={this.state.spriteSheet} 
                  spriteWidth={this.state.spriteWidth} 
                  spriteHeight={this.state.spriteHeight} 
                  spritesPerRow={this.state.spritesPerRow}
                  programState={this.state.programState}
                  onUpdate={(cell, value) => this.handleUpdate(cell, value)}

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
          
          <SettingsModal
            show={this.state.settingsModalShow} 
            onHide={() => settingsModalClose()} 
            handleUpdateSettings={(prop, val) => this.handleUpdateSettings(prop, val)}
            cellswide = {this.state.cellswide}
            cellshigh = {this.state.cellshigh}
            cellwidth = {this.state.cellwidth}
            cellheight = {this.state.cellheight}
            timer1 = {this.state.timer1}
            timer2 = {this.state.timer2}
          />
          <img
            alt="sprite sheet" 
            id="sprite-sheet"
            src = {`${imgsrc}`}
          />          
        </div>
    );
  }
}

// ========================================
// Move into helper functions import
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

function gc(char) {
    return String.fromCharCode(97 + char);
}

function getWildCardRules(str) {
    let arrayRules = [""];
    let ruleIndex = 0;
    let maxCellStates = 16;

    for(let i = 0; i < str.length; i++) {
        let c = str.charAt(i);								
        if(c !== "a") {			
            if(arrayRules[ruleIndex] !== undefined) {
                arrayRules[ruleIndex] += c;
            }
        }		
        else {
            let preString = arrayRules[ruleIndex];
            if(preString !== undefined) {					
                for(let j = 0; j <= maxCellStates; j++) {			
                    if(j !== 0) {													
                        let rString = gc(j) + str.slice(i + 1 , str.length);																																	
                        arrayRules[ruleIndex] = getWildCardRules(preString + rString);
                        ruleIndex++;	
                    }
                }
            }
        }				
    }
    return arrayRules.slice();
}

function convertRules(rules) {
  const newRules = {};
  for(let rule of rules) {        
      let newRule1 = gc(rule[2]) + gc(rule[3]) + gc(rule[4]) + gc(rule[5]) + gc(rule[6]);
      let allRules = [];
      if(newRule1 !== "aaaaa") {
        if(rule[10] === 1){
          // Handle arrows
          let newRule2 = gc(rule[6]) + gc(rule[5]) + gc(rule[4]) + gc(rule[3]) + gc(rule[2]);
          let newRule3 = gc(rule[3]) + gc(rule[6]) + gc(rule[4]) + gc(rule[2]) + gc(rule[5]);
          let newRule4 = gc(rule[5]) + gc(rule[2]) + gc(rule[4]) + gc(rule[6]) + gc(rule[3]);
          let allRulesString = getWildCardRules(newRule1).toString() +  
                               getWildCardRules(newRule2).toString() + 
                               getWildCardRules(newRule3).toString() + 
                               getWildCardRules(newRule4).toString();
          allRules = allRulesString.split(",");
          //let allRules =  + .split(",");
        }
        else {
          allRules = getWildCardRules(newRule1).toString().split(",");
        }
      } 
      
      if(allRules){
        for(let newRule of allRules) {
          newRules[gc(rule[0]) + gc(rule[1]) + newRule] = {output: rule[7]};
          if(rule[8] !== 1) {
            newRules[gc(rule[0]) + gc(rule[1]) + newRule].special1 = rule[8]; 
          }
        }
      }
  }
  return newRules;
}

/*
function getImageData(imageID){
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var img = document.getElementById(imageID);
  context.drawImage(img, 0, 0 );
  return context.getImageData(0, 0, img.width, img.height);
}
*/

// ========================================

ReactDOM.render(
  <Router>
    <Muffit />
  </Router>, 
  document.getElementById('root')
);
