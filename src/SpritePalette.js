import React from 'react';
import Cell from "./Cell.js";

class SpritePalette extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
        spriteSheet: props.spriteSheet
    };
  }
  
  renderSprite(i, className) {
    let outlineStyle = "none"
    if(i === this.props.active) {
      let borderWidth = 3 / (32 / this.props.spriteWidth);
      outlineStyle = borderWidth + "px solid red";
    }

    let spriteCellStyle = {
      margin: "6px 6px 0 0",
      width: "32px",
      height: "32px",
      float: "left",
      transform: "scale(" + 32 / this.props.spriteWidth + ")",
      transformOrigin: "0 3px 0"
    }

    return(
      <Cell
        spriteSheet={this.props.spriteSheet}
        spriteWidth={this.props.spriteWidth}
        spriteHeight={this.props.spriteHeight}
        spritesPerRow={this.props.spritesPerRow}
        renderStyle = "crisp-edges"
        outlineStyle={outlineStyle}
        value={i}
        style={spriteCellStyle}        
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  
  renderNoFill() {
    // merge with above renderSprite
    let spriteCellStyle = {
      margin: "6px 6px 0 0",
      width: "32px",
      height: "32px",
      float: "left",
      transform: "scale(1)" // For z index (to float with other sprites)
    }
  
    let outlineStyle = "";
    if(this.props.active === 0) {
      outlineStyle = "3px solid red";
    }

    return(
      <Cell 
        spriteSheet="no-fill.png"
        spriteWidth={32}
        spriteHeight={32}
        spritesPerRow={1}
        renderStyle = ""
        outlineStyle={outlineStyle}
        style={spriteCellStyle}
        value={null}
        onClick={() => this.props.onClick(0)}
      />
    );
  }

  render() {  
    return (
        <div className="sprite-palette bg-dark">  
            {this.renderSprite(1)}
            {this.renderSprite(2)}
            {this.renderSprite(3)}
            {this.renderSprite(4)}
            {this.renderSprite(5)}
            {this.renderSprite(6)}
            {this.renderSprite(7)}
            {this.renderSprite(8)}
            {this.renderSprite(9)}
            {this.renderSprite(10)}
            {this.renderSprite(11)}
            {this.renderSprite(12)}
            {this.renderSprite(13)}
            {this.renderSprite(14)}
            {this.renderSprite(15)}
            {this.renderSprite(16)}            
            {this.renderNoFill()}
        </div>
    );
  }
}

export default SpritePalette;