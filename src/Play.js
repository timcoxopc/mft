import React, { useEffect, useRef, useState } from 'react';
import Cell from './Cell';
import KeyTrigger from './KeyTrigger';

function Play(props) {
    const [cells, setCells] = useState(props.cells.slice());
    let cellsRef = useRef(props.cells.slice);

    useInterval(() => {
        updateCells(12);
    }, 400);

    useEffect(
        () => { 
            cellsRef.current.cells = cells 
        },
        [cells]
      );

   function updateCells(trigger) {
    if(props.programState !== "playing") {
        return;
    }
    //if(trigger < 10){
    console.log("TRIGGER", props.cellsWide);
    //}
    let oldCells = cellsRef.current.cells.slice();
    let newCells = cellsRef.current.cells.slice();
        for(let i = 0; i < oldCells.length; i++) {
            let ruleIndex = gc(trigger) + gc(oldCells[i - props.cellsWide]) + gc(oldCells[i - 1]) + gc(oldCells[i]) + gc(oldCells[i + 1]) + gc(oldCells[i + props.cellsWide])
            if(props.rules[ruleIndex]) {
                newCells[i] = props.rules[ruleIndex];
            }
        }
        cellsRef.current.cells = newCells.slice();
        setCells(newCells);
    }

    function renderMapCell(i, x, y) {
        
        let spriteCellStyle = {
            float: "left",
            width: props.cellWidth,
            height: props.cellHeight,
            transform: "scale(" + props.cellWidth / props.spriteWidth + ")",
            transformOrigin: "top left",
            position: "absolute",
            left: x * props.cellWidth,
            top: y * props.cellWidth
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

    // Componentify
    const gridWidth = props.cellsWide;
    const gridHeight = props.cellsHigh;
        
    let cellsGrid = [];
    let i = 0;
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            cellsGrid.push(renderMapCell(i, x, y));
            i++;  
        }    
    }

    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest function.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }
    
      let stageWidth = gridWidth * props.cellWidth;

    return (
        
        <div className="play-wrapper" style={{width:stageWidth,minWidth:320, margin:"0 auto"}}>
            <div className="grid-wrapper">
                {cellsGrid}
            </div>
            <div className="keys-wrapper">
                <KeyTrigger style={{margin: "10px"}} keyCode={37} label="Left" onTrigger={() => updateCells(1)} />
                <KeyTrigger style={{margin: "10px"}} keyCode={38} label="Up" onTrigger={() => updateCells(2)} />
                <KeyTrigger style={{margin: "10px"}} keyCode={39} label="Right" onTrigger={() => updateCells(3)} />
                <KeyTrigger style={{margin: "10px"}} keyCode={40} label="Down" onTrigger={() => updateCells(4)} />
                <KeyTrigger style={{margin: "10px"}} keyCode={90} label="z" onTrigger={() => updateCells(6)} />
                <KeyTrigger style={{margin: "10px"}} keyCode={88} label="x" onTrigger={() => updateCells(7)} />
            </div>
        </div>
    );
}

/*
            <TriggerTimer 
                triggerID="13"
                delay = "500"
                onUpdate = {(trigger) => updateCells(trigger)}
            />
            <TriggerTimer 
                triggerID="14"
                delay = "2000"
                onUpdate = {(trigger2) => updateCells(trigger2)}
            />
            */


function gc(char) {
    if(char === undefined){
        return "b";
    } else{
        return String.fromCharCode(97 + char);
    }
}

export default Play;