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

class RuleSet extends React.Component {
  constructor(props) {
    super(props);
    let emptyRules = []
    for (let i = 0; i < 40; i++) {
      emptyRules.push([0, 0, 0, 0, 0, 0, 0, 0, 1]);
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
    if(value === undefined && i <= 6) {
      rules[rule - 1][i] = this.state.spriteIndex;
    } else if (i === 6 || i === 8) {
      document.body.click(); // Trigger popover to hide
      rules[rule - 1][i] = value;
    } else if (i === 7) {
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
    this.setState({ modalShow: false });
  }
  
  setSprite(spriteIndex) {
    this.setState({ spriteIndex: spriteIndex });
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
    const totalRules = 40;
    let rules = [];
    for (let i = 0; i < totalRules; i++) {
      
      console.log("Rule #" + i + " " + this.state.rules[i]);
      
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
          <MainNavbar onSelect={(e) => this.selectSpriteSheet(e)} />

          <Switch>
            <Route path="/new" exact component={ExportModal} />
            <Route path="/export" exact component={ExportModal} />
            <Route path="/open" exact component={ExportModal} />
          </Switch>
          
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
