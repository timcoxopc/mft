import React from 'react';

const images = require.context('../public/img', true);

function Cell(props) {
    let code = props.spriteSheet;

    
    let spriteInnerStyle = {
        float: "left",
        fontSize: "24px",
        fontWeight: "bold",
        lineHeight: "34px",
        padding: "0",
        textAlign: "center",
        width: props.spriteWidth,
        height: props.spriteHeight,
        backgroundColor: "#ddd"
    }
    
    let imgsrc = "./img/blank.png";
    let position = "";
    if(props.value !== 0) {
      imgsrc = images(`./${code}.png`);
      let offsetY = "0";
      if(props.value > props.spritesPerRow){
        offsetY = props.spriteHeight * -1 + "px"
      }
      position = props.spriteWidth * ((props.value - 1) % props.spritesPerRow) * -1 + "px " + offsetY;
      
      //spriteInnerStyle.backgroundImage = `url(${imgsrc})`;
      spriteInnerStyle.objectPosition = position;
      spriteInnerStyle.objectFit = "none";
      spriteInnerStyle.imageRendering = "crisp-edges";
      //<button style={spriteInnerStyle} className="cell--button" onClick={props.onClick} />
    } 

    return (
      <div style={props.style} className={props.className}>
        <img src = {`${imgsrc}`} style={spriteInnerStyle} className="cell--button" onClick={props.onClick} />
      </div>
    );
}

export default Cell;