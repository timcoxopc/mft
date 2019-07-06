import React, { useState } from 'react';
import Cell from './Cell';
import SpritePalette from './SpritePalette';

function Map(props) {

    const [isMouseDown, setMouseDown] = useState(0);

    function handleMouseDown() {
        setMouseDown(1);
    }

    function handleMouseUp() {
        setMouseDown(0);
    }
    
    function handleMouseOver(i) {
        if(isMouseDown) {
            props.onClick(i);
        }
    }

    function renderMapCell(i, x, y) {
        
        let spriteCellStyle = {
            float: "left",
            width: "32px",
            height: "32px",
            transform: "scale(" + 32 / props.spriteWidth + ")",
            transformOrigin: "top left",
            position: "absolute",
            left: x * props.cellWidth,
            top: y * props.cellHeight,
        }

        return(
            <Cell
                key = {i}
                value = {props.cells[i]}
                style = {spriteCellStyle} 
                spriteSheet = {props.spriteSheet}
                spriteWidth = {props.spriteWidth} 
                spriteHeight = {props.spriteHeight} 
                spritesPerRow = {props.spritesPerRow}
                renderStyle = "crisp-edges"
                onClick={ () => props.onClick(i) }
                onMouseOver={ () => handleMouseOver(i) }
            />
        );
    }

    const gridWidth = props.cellsWide;
    const gridHeight = props.cellsHigh;
        
    let cells = [];
    let i = 0;
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            cells.push(renderMapCell(i, x, y));
            i++;  
        }    
    }

    let stageWidth = gridWidth * props.cellWidth;

    return (
        <div>
            <SpritePalette 
                active={props.spriteIndex}
                spriteSheet={props.spriteSheet} 
                spriteWidth={props.spriteWidth} 
                spriteHeight={props.spriteHeight} 
                spritesPerRow={props.spritesPerRow} 
                onClick={props.onSpriteSelect} 
            />
            <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className="map-wrapper" style={{width:stageWidth,minWidth:320, margin:"0 auto"}}>
                {cells}
            </div>
        </div>
    );
}

export default Map;