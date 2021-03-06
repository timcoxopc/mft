import React, { useEffect, useRef, useState } from 'react';
import Cell from './Cell';
import KeyTrigger from './KeyTrigger';
import cloneDeep from 'lodash/cloneDeep';

function Play(props) {
    const [cells, setCells] = useState(cloneDeep(props.cells));
    const [activeMap, setActiveMap] = useState(props.activeMap);
    let cellsRef = useRef(cloneDeep(props.cells));

    useInterval(() => {
        updateCells(13, 0); // random trigger test
        updateCells(12, 0);
        let r = Math.ceil(Math.random() * 4);
        
        // Modify so only run triggers that are used 
        
        // Random
        if(checkRandom(1, r)) updateCells(12, 1);
        else if(checkRandom(2, r)) updateCells(12, 2);
        if(checkRandom(3, r)) updateCells(12, 3);
        else if(checkRandom(4, r)) updateCells(12, 4);
        else if(checkRandom(5, r)) updateCells(12, 5);
        else if(checkRandom(6, r)) updateCells(12, 6);

        // Individual Random
        updateCells(12, 7);
        updateCells(12, 8);
        updateCells(12, 9);
        updateCells(12, 10);
        updateCells(12, 11);
        updateCells(12, 12);
    }, 300);

    useEffect(
        () => { 
            cellsRef.current.cells = cells 
        },
        [cells]
      );

   function updateCells(trigger1, trigger2 = 0) {
    if(props.programState !== "playing") {
        return;
    }
    let arrayRandomCells = [];
    let arrayRandomOutputs = [];
    let oldCells = cellsRef.current.cells[activeMap].slice();
    let newCells = cellsRef.current.cells[activeMap].slice();
    let ruleIndex;
    let isMet;
        for(let i = 0; i < oldCells.length; i++) {
            if(trigger2 >= 7 && trigger2 <= 12) {
                if(checkRandom(trigger2 - 6, Math.ceil(Math.random() * 4))){
                    isMet = true
                } else {
                    isMet = false;
                }
            } else {
                isMet = true;
            }

            ruleIndex = gc(trigger1) + gc(trigger2) + gc(oldCells[i - props.cellsWide]) + gc(oldCells[i - 1]) + gc(oldCells[i]) + gc(oldCells[i + 1]) + gc(oldCells[i + props.cellsWide])
            if(props.rules[ruleIndex] && isMet) {                
                if(trigger1 === 13){
                    // for random
                    arrayRandomCells.push(i);
                    arrayRandomOutputs.push(props.rules[ruleIndex].output);
                }
                else {
                    //if(trigger1 < 5){
                    //    console.log("r", ruleIndex);
                    //}
                    newCells[i] = props.rules[ruleIndex].output;
                    if(props.rules[ruleIndex].special1) {
                        triggerSpecial(props.rules[ruleIndex].special1);
                    }
                }
            }
        }
        if(trigger1 === 13 && isMet) {
            let i = Math.floor(Math.random() * arrayRandomCells.length);
            newCells[arrayRandomCells[i]] = arrayRandomOutputs[i];
            //if(props.rules[ruleIndex].special1) {
            //    triggerSpecial(props.rules[ruleIndex].special1);
            //}
        }
        cellsRef.current.cells[activeMap] = newCells.slice();
        setCells(cloneDeep(cellsRef.current.cells));
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
                value = {cells[activeMap][i]}
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

    var audio1 = new Audio('/sounds/bump.wav');
    var audio2 = new Audio('/sounds/collide1.wav');
    var audio3 = new Audio('/sounds/pickup.wav');
    var audio4 = new Audio('/sounds/destroy2.wav');
    var audio5 = new Audio('/sounds/explode.wav');
    var audio6 = new Audio('/sounds/hit.wav');
    var audio7 = new Audio('/sounds/sand.wav');
    var audio8 = new Audio('/sounds/teleport.wav');
    var audio9 = new Audio('/sounds/completelevel.wav');
    var audio = [audio1, audio2, audio3, audio4, audio5, audio6, audio7, audio8, audio9];
    
    function triggerSpecial(special) {
        //console.log("Trigger Special", special);
        if(special >= 1 && special <= 9) {
            audio[special - 1].play();
        }
        else if(special === 10) {
            setTimeout(function(){ updateCells(20, 0);}, 50); // Change to lower for prod build
        }
        else if(special === 11) {
            setTimeout(function(){ updateCells(21, 0);}, 50); // Change to lower for prod build
        }
        else if(special === 12) {
            setTimeout(function(){ updateCells(22, 0);}, 50); // Change to lower for prod build
        }
        else if(special === 13) {
            setTimeout(function(){ updateCells(23, 0);}, 50); // Change to lower for prod build
        }
        else if(special === 16 && Number(activeMap) < 9) {
            setActiveMap(Number(activeMap) + 1);
        }
        else if(special === 17 && Number(activeMap) > 0) {
            setActiveMap(Number(activeMap) - 1);
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
                <KeyTrigger style={{margin: "10px"}} keyCode={37} label="Left" onTrigger={() => updateCells(1, 0)} />
                <KeyTrigger style={{margin: "10px"}} keyCode={38} label="Up" onTrigger={() => updateCells(2, 0)} />
                <KeyTrigger style={{margin: "10px"}} keyCode={39} label="Right" onTrigger={() => updateCells(3, 0)} />
                <KeyTrigger style={{margin: "10px"}} keyCode={40} label="Down" onTrigger={() => updateCells(4, 0)} />
                <KeyTrigger style={{margin: "10px"}} keyCode={90} label="z" onTrigger={() => updateCells(6, 0)} />
                <KeyTrigger style={{margin: "10px"}} keyCode={88} label="x" onTrigger={() => updateCells(7, 0)} />
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
        return "p";
    } else{
        return String.fromCharCode(97 + char);
    }
}

function checkRandom(c, r){
    //c = c - 13;
    if((c === 1 || c === 3) && r === 1){
        return true;
    } else if((c === 1 || c === 4) && r === 2){
        return true;
    } else if((c === 2 || c === 5) && r === 3){
        return true;    
    } else if((c === 2 || c === 6) && r === 4){
        return true;    
    } else {
        return false;
    }
}

export default Play;
