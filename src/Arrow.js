  import React from 'react';
  
  function Arrow(props) {
    let imgsrc;
    if(props.value === 1) {
      imgsrc = "./img/arrow-selected.png";
    } else {
      imgsrc = "./img/arrow.png";
    }

    let spriteInnerStyle = {
      width: 32,
      height: 32,
    }

    return(
      <div className={props.className}>
        <img 
          src = {`${imgsrc}`} 
          alt = "Arrow"
          style={spriteInnerStyle} 
          className="cell--button" 
          onClick={props.onClick} 
        />
      </div>
    );
  }

  export default Arrow;