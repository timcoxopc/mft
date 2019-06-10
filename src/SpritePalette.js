import React from 'react';

const images = require.context('../public/img', true);

function Cell(props) {
    let code = props.spriteSheet;
    let imgsrc = images(`./${code}.png`);

    let offsetY = "0";
    if(props.value < props.spritesPerRow){
        console.log("&&")
        offsetY = props.spriteHeight * -1 + "px"
    } 
    console.log("B", offsetY, props.value, props.spritesPerRow);
    let position = props.spriteWidth * props.value * -1 + "px " + offsetY;
    let spriteInnerStyle = {
        float: "left",
        fontSize: "24px",
        fontWeight: "bold",
        lineHeight: "34px",
        marginRight: "-1px",
        marginTop: "-1px",
        padding: "0",
        textAlign: "center",
        width: props.spriteWidth,
        height: props.spriteHeight,
        border: "none",
        backgroundImage: `url(${imgsrc})`,
        backgroundPosition: position
    }

    return (
      <div style={props.style}>
        <button style={spriteInnerStyle} onClick={props.onClick} />
      </div>
    );
  }
  
class SpritePalette extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
        spriteSheet: props.spriteSheet
    };
  }
  
  renderSprite(i, className) {
    
    let spriteCellStyle = {
        margin: "4px 3px 0 0",
        width: "29.7px",
        height: "29.7px",
        float: "left",
        transform: "scale(" + 29.7 / this.props.spriteWidth + ")",
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