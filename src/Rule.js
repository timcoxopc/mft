import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Cell from "./Cell.js";
import Trigger from "./Trigger.js";
import Arrow from "./Arrow.js";

import trigger1 from './img/triggers/arrow_left.png';
import trigger2 from './img/triggers/arrow_up.png';
import trigger3 from './img/triggers/arrow_right.png';
import trigger4 from './img/triggers/arrow_down.png';
import trigger5 from './img/triggers/tap.png';
import trigger6 from './img/triggers/button1.png';
import trigger7 from './img/triggers/button2.png';
import trigger8 from './img/triggers/1-2-random.png';
import trigger9 from './img/triggers/2-2-random.png';
import trigger10 from './img/triggers/step1.png';
import trigger12 from './img/triggers/timer1.png';
import trigger13 from './img/triggers/timer2.png';
import trigger14 from './img/triggers/loop.png';
import trigger15 from './img/triggers/loop1.png';
import trigger16 from './img/triggers/1-4-random.png';
import trigger17 from './img/triggers/2-4-random.png';
import trigger18 from './img/triggers/3-4-random.png';
import trigger19 from './img/triggers/4-4-random.png';
import trigger20 from './img/triggers/step2.png';
import trigger21 from './img/triggers/trigger1.png';
import trigger22 from './img/triggers/trigger2.png';
import trigger23 from './img/triggers/trigger3.png';
import trigger24 from './img/triggers/trigger4.png';
import trigger25 from './img/triggers/loop2.png';
import RuleMenu from './RuleMenu.js';

/*

Rule indexes

0 - Trigger Main
1 - Trigger Secondary / Conditional (eg random) - Reserved for future use
2 - Cell 1
3 - Cell 2 
4 - Cell 3
5 - Cell 4 
6 - Cell 5
7 - Cell Output
8 - Special Output Main
9 - Special Output Secondary - Reserved for future use (eg sound)
10 - Arrow
11 - Remove rule

*/
const TRIGGER1 = 0;
const TRIGGER2 = 1;
const CELL1 = 2;
const CELL2 = 3;
const CELL3 = 4;
const CELL4 = 5;
const CELL5 = 6;
const OUTPUT = 7;
const SPECIAL1 = 8;
//const SPECIAL2 = 9;
const ARROW = 10;
//const REMOVE_RULE = 11;

class Rule extends React.Component {
  constructor(props) {
    super(props);
    
    // Is this state needed?
    this.state = { 
        rule: props.rule 
    };
  }

  renderCell(i, cell, rule, className) {

    const spriteCellStyle = {
      width: "32px",
      height: "32px",
      transform: "scale(" + 32 / this.props.spriteWidth + ")",
      transformOrigin: "top left"
    }
    
    return(
      <Cell
        cellIndex = {className}
        value = {i}
        className = {className}
        style = {spriteCellStyle} 
        spriteSheet = {this.props.spriteSheet}
        spriteWidth = {this.props.spriteWidth} 
        spriteHeight = {this.props.spriteHeight} 
        spritesPerRow = {this.props.spritesPerRow}
        renderStyle = "crisp-edges"
        onClick={ () => this.props.onClick(cell, rule) }
      />
    );
  }

  renderSpecial(i, cell, rule) {
    let specialsStyle = {
      transform: "scale(0.4)",
      transformOrigin: "top left",
      float: "left",
      width: "72px",
      height: "25px"
    }

    return(
      <Cell
        key={i}
        value = {i} 
        spriteSheet = "specials.png"
        spriteWidth = {181} 
        spriteHeight = {67} 
        spritesPerRow = {3}
        renderStyle = "unset"
        style = {specialsStyle}
        onClick = { () => this.props.onClick(cell, rule, i) }
      />   
    );
  }
  
  render() {
    //console.log("Render", this.props.index);

    let iconStyle = {
      /*border: "1px solid gray",*/
      width: "32px",
      height: "32px",
      textAlign:"center",
      background:"#fff",
      margin: "4px",
      float: "left",
      padding: "0",
      border: "none"
    }
    let popoverStyle = {
      paddingBottom: "7px"
    }
    let imgStyle = {
      width: "32px",    
      height: "32px"
    }

    const triggerPopover = (
      <Popover style={popoverStyle} id="trigger-popover" title="Trigger">
        <div >
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 1)} style={imgStyle} src={trigger1} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 2)} style={imgStyle} src={trigger2} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 3)} style={imgStyle} src={trigger3} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 4)} style={imgStyle} src={trigger4} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 12)} style={imgStyle} src={trigger12} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 13)} style={imgStyle} src={trigger13} /></button>      
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 6)} style={imgStyle} src={trigger6} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 7)} style={imgStyle} src={trigger7} /></button>

          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 20)} style={imgStyle} src={trigger21} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 21)} style={imgStyle} src={trigger22} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 22)} style={imgStyle} src={trigger23} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 23)} style={imgStyle} src={trigger24} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 10)} style={imgStyle} src={trigger10} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 15)} style={imgStyle} src={trigger15} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 20)} style={imgStyle} src={trigger20} /></button>          
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 25)} style={imgStyle} src={trigger25} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 14)} style={imgStyle} src={trigger14} /></button>
        </div>
      </Popover>
    );
    //<button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER1, this.props.index, 5)} style={imgStyle} src={trigger5} /></button>
    const conditionalPopover = (
      <Popover style={popoverStyle} id="trigger-popover" title="Condition">
        <div >
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER2, this.props.index, 8)} style={imgStyle} src={trigger8} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER2, this.props.index, 9)} style={imgStyle} src={trigger9} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER2, this.props.index, 16)} style={imgStyle} src={trigger16} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER2, this.props.index, 17)} style={imgStyle} src={trigger17} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER2, this.props.index, 18)} style={imgStyle} src={trigger18} /></button>
          <button style={iconStyle}><img alt="trigger" onClick={() => this.props.onClick(TRIGGER2, this.props.index, 19)} style={imgStyle} src={trigger19} /></button>
        </div>
      </Popover>
    );

    let specialsPopoverStyle = {
      paddingBottom: "7px",
      maxWidth: "242px"
    }

    let specials = [];
    for(let i = 1; i < 28; i++) {
      specials.push(this.renderSpecial(i, SPECIAL1, this.props.index));
    }
    const specialPopover = (
      <Popover style={specialsPopoverStyle} id="special-popover" title="Special">
        { specials }
      </Popover>
    );
    
    let specialsStyle = {
      transform: "scale(0.4)",
      transformOrigin: "top left",
      position: "absolute",
      left: "120px",
      top: "98px"
    }

    return (
      <div className="rule">          
          <RuleMenu
            //onClick={ () => this.props.onClick(REMOVE_RULE, this.props.index)}
          />
          <OverlayTrigger trigger="click" overlay={triggerPopover} placement="right" rootClose>
            <Trigger
              cellIndex={TRIGGER1}
              value={this.state.rule[TRIGGER1]}
              className={"cell-trigger1"}
              ref={this.attachRef}
            />
          </OverlayTrigger>
          <OverlayTrigger trigger="click" overlay={conditionalPopover} placement="right" rootClose>
            <Trigger
              cellIndex={TRIGGER2}
              value={this.state.rule[TRIGGER2]}
              className={"cell-trigger2"}
              ref={this.attachRef}
            />
          </OverlayTrigger>
          {this.renderCell(this.state.rule[CELL1], CELL1, this.props.index, "cell1")}
          {this.renderCell(this.state.rule[CELL2], CELL2, this.props.index, "cell2")}
          {this.renderCell(this.state.rule[CELL3], CELL3, this.props.index, "cell3")}
          {this.renderCell(this.state.rule[CELL4], CELL4, this.props.index, "cell4")}
          {this.renderCell(this.state.rule[CELL5], CELL5, this.props.index, "cell5")}
          {this.renderCell(this.state.rule[OUTPUT], OUTPUT, this.props.index, "cell-output")}
          <Arrow
            value={this.state.rule[ARROW]}
            className={"arrow-wrapper"}
            onClick={ () => this.props.onClick(ARROW, this.props.index)}
          />
          <OverlayTrigger trigger="click" overlay={specialPopover} placement="right" rootClose>
            <Cell
              ref={this.attachRef}
              value = {this.state.rule[SPECIAL1]} 
              spriteSheet = "specials.png"
              spriteWidth = {181} 
              spriteHeight = {67} 
              spritesPerRow = {3}
              renderStyle = "unset"
              style = {specialsStyle}
              onClick = { () => this.props.onClick(SPECIAL1, this.props.index) }
            />
          </OverlayTrigger>
      </div>
    );
  }
}

export default Rule;