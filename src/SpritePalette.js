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
    
    let spriteCellStyle = {
        margin: "4px 4px 0 0",
        width: "32px",
        height: "32px",
        float: "left",
        transform: "scale(" + 32 / this.props.spriteWidth + ")",
        transformOrigin: "top left"
    }

    return(
      <Cell
        spriteSheet={this.props.spriteSheet}
        spriteWidth={this.props.spriteWidth}
        spriteHeight={this.props.spriteHeight}
        spritesPerRow={this.props.spritesPerRow}
        value={i}
        style={spriteCellStyle}        
        onClick={() => this.props.onClick(i)}
      />
    );
    // className={"sprite-palette--cell"}
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
        </div>
    );
  }
}

export default SpritePalette;