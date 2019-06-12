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
    
    if(props.value !== 0) {
      let imgsrc = images(`./${code}.png`);
      let offsetY = "0";
      if(props.value > props.spritesPerRow){
        offsetY = props.spriteHeight * -1 + "px"
      }
      let position = props.spriteWidth * props.value * -1 + "px " + offsetY;
      
      spriteInnerStyle.backgroundImage = `url(${imgsrc})`;
      spriteInnerStyle.backgroundPosition = position;
    } 

    return (
      <div style={props.style} className={props.className}>
        <button style={spriteInnerStyle} className="cell--button" onClick={props.onClick} />
      </div>
    );
}

export default Cell;