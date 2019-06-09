import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
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
import trigger11 from './img/triggers/timer1.png';
import trigger12 from './img/triggers/timer2.png';
import trigger13 from './img/triggers/timer1.png';
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

function Cell(props) {
    return (
      <div className={props.className}>
        <button className={"cell--inner icon" + props.value} onClick={props.onClick} />
      </div>
    );
  }
  
  class Trigger extends React.Component {
    constructor(...args) {
        super(...args);
      }

    render(){

        return(
        <div className={this.props.className}>
            <button 
                className={"cell--inner cell--trigger trigger" + this.props.value} 
                onClick={this.props.onClick} 
            />
        </div>
        );
    }
  }

class Rule extends React.Component {
  constructor(props) {
    super(props);
    
    //this.attachRef = target => this.setState({ target });
    console.log("###", this.attachRef);
    this.state = { 
        rule: props.rule, 
        show: false
    };
  }
  
  renderCell(i, cell, rule, className) {
    return(
      <Cell
        cellIndex={className}
        value={i}
        className={className}
        onClick={() => this.props.onClick(cell, rule)}
      />
    );
  }
  
  render() {
    let divStyle = {
      border: "1px solid white",
      width: "30px",
      height: "30px",
      background: "#212529"
    };
    let iconStyle = {
      /*border: "1px solid gray",*/
      width: "30px",
      height: "30px",
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
      width: "28px",    
      height: "28px"
    }

    const popover = (
      <Popover style={popoverStyle} id="trigger-popover" title="Trigger">
        <div >
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 1)} style={imgStyle} src={trigger1} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 2)} style={imgStyle} src={trigger2} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 3)} style={imgStyle} src={trigger3} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 4)} style={imgStyle} src={trigger4} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 5)} style={imgStyle} src={trigger5} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 6)} style={imgStyle} src={trigger6} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 7)} style={imgStyle} src={trigger7} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 8)} style={imgStyle} src={trigger8} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 9)} style={imgStyle} src={trigger9} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 10)} style={imgStyle} src={trigger10} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 11)} style={imgStyle} src={trigger11} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 12)} style={imgStyle} src={trigger12} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 13)} style={imgStyle} src={trigger13} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 14)} style={imgStyle} src={trigger14} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 15)} style={imgStyle} src={trigger15} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 16)} style={imgStyle} src={trigger16} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 17)} style={imgStyle} src={trigger17} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 18)} style={imgStyle} src={trigger18} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 19)} style={imgStyle} src={trigger19} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 20)} style={imgStyle} src={trigger20} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 21)} style={imgStyle} src={trigger21} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 22)} style={imgStyle} src={trigger22} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 23)} style={imgStyle} src={trigger23} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 24)} style={imgStyle} src={trigger24} /></button>
          <button style={iconStyle}><img onClick={() => this.props.onClick(6, this.props.index, 25)} style={imgStyle} src={trigger25} /></button>
        </div>
      </Popover>
    );
  
    return (
      <div className="rule">          
            
          <OverlayTrigger show={this.state.show} trigger="click" overlay={popover} placement="right" rootClose>
          <Trigger
              cellIndex={6}
              value={this.state.rule[6]}
              className={"cell-trigger"}
              ref={this.attachRef}
            />
          

          </OverlayTrigger>
          {this.renderCell(this.state.rule[0], 0, this.props.index, "cell1")}
          {this.renderCell(this.state.rule[1], 1, this.props.index, "cell2")}
          {this.renderCell(this.state.rule[2], 2, this.props.index, "cell3")}
          {this.renderCell(this.state.rule[3], 3, this.props.index, "cell4")}
          {this.renderCell(this.state.rule[4], 4, this.props.index, "cell5")}
          {this.renderCell(this.state.rule[5], 5, this.props.index, "cell-output")}
      </div>
    );
  }
}

export default Rule;