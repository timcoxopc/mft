import React from 'react';

const images = require.context('../public/img', true);

function Cell(props) {
    /*
      props.spriteSheet
      props.spriteWidth
      props.spriteHeight
      props.spritesPerRow
      props.outlineStyle
    */
    let spriteInnerStyle = {
        width: props.spriteWidth,
        height: props.spriteHeight,
        backgroundColor: "#ddd",
        outline: props.outlineStyle
    }
    
    let imgsrc = "./img/blank.png";
    let position = "";
    if(props.value !== 0) {
      imgsrc = images(`./${props.spriteSheet}.png`);
      let offsetY = "0";
      if(props.value > props.spritesPerRow){
        offsetY = props.spriteHeight * (Math.floor((props.value - 1)  / props.spritesPerRow)) * -1 + "px"
      }
      position = props.spriteWidth * ((props.value - 1) % props.spritesPerRow) * -1 + "px " + offsetY;
  
      spriteInnerStyle.objectPosition = position;
      spriteInnerStyle.objectFit = "none";
      spriteInnerStyle.imageRendering = props.renderStyle;
    }


    return (
      <div style={props.style} className={props.className}>
        <img src = {`${imgsrc}`} alt="cell" style={spriteInnerStyle} className="cell--button" onClick={props.onClick} />
      </div>
    );
}

export default Cell;