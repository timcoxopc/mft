import React, { useState, useEffect } from 'react';
import Cell from './Cell';

function Play(props) {

    const [cells, setCells] = useState(props.cells.slice());
    console.log("props.rules", props.rules);
    // HOC of Map or asbtract map to Grid?
    
    const timerID = setInterval(updateCells, 800); 

    useEffect(() => {
        return () => {
            if(timerID) {    
                clearInterval(timerID);
            }
        }
    }, [timerID]);

    function updateCells() {
        let newCells = cells.slice()
        for(i = 0; i < cells.length; i++) {
            //console.log(convertedRules);
            let ruleIndex = gc(cells[i - 25]) + gc(cells[i - 1]) + gc(cells[i]) + gc(cells[i + 1]) + gc(cells[i + 25])
            if(props.rules[ruleIndex]) {
                newCells[i] = props.rules[ruleIndex];
            }
        }
        setCells(newCells);
    }

    function renderMapCell(i, x, y) {
        
        let spriteCellStyle = {
            float: "left",
            width: "32px",
            height: "32px",
            transform: "scale(" + 32 / props.spriteWidth + ")",
            transformOrigin: "top left",
            position: "absolute",
            left: x * props.spriteWidth,
            top: y * props.spriteHeight,
        }

        return(
            <Cell
                key = {i}
                value = {cells[i]}
                style = {spriteCellStyle} 
                spriteSheet = {props.spriteSheet}
                spriteWidth = {props.spriteWidth} 
                spriteHeight = {props.spriteHeight} 
                spritesPerRow = {props.spritesPerRow}
                renderStyle = "crisp-edges"
            />
        );
    }

    const gridWidth = 25;
    const gridHeight = 15;
        
    let cellsGrid = [];
    let i = 0;
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            cellsGrid.push(renderMapCell(i, x, y));
            i++;  
        }    
    }
    
    return (
        <div className="play-wrapper">
            {cellsGrid}
        </div>
    );
}

function gc(char) {
    return String.fromCharCode(97 + char);
}

export default Play;