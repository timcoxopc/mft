import React, { useEffect, useRef, useState } from 'react';
import KeyTrigger from './KeyTrigger';
import { SpriteSheet, Sprite, Stage } from "@createjs/easeljs";
import cloneDeep from 'lodash/cloneDeep';

const images = require.context('../public/img', true);

function PlayEaselJS(props) {
    useEffect(() => {
        init(props);    
        return function cleanup() {
            clearInterval(id);
        };
    })

    return (    
        <div>
            <canvas id="play-wrapper" width="1000" height="600"></canvas>
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

var stage;
var spriteSheet;
var cellsGrid = [];
let gridWidth;
let gridHeight;
let cellWidth;
let cellHeight;
let activeCells;
let audio = [];
let rules = {};
let activeMap = 1;
let id;

function init(props) {
    gridWidth = props.cellsWide;
    gridHeight = props.cellsHigh;
    cellWidth = props.cellWidth;
    cellHeight = props.cellHeight;
    rules = cloneDeep(props.rules);
    activeMap = props.activeMap;
    activeCells = cloneDeep(props.cells);

    stage = new Stage("play-wrapper");
    var data = {
        images: ["./img/" + props.spriteSheet],
        frames: {width:32, height:32},
    };

    spriteSheet = new SpriteSheet(data);

    var audio1 = new Audio('/sounds/bump.wav');
    var audio2 = new Audio('/sounds/collide1.wav');
    var audio3 = new Audio('/sounds/pickup.wav');
    var audio4 = new Audio('/sounds/destroy2.wav');
    var audio5 = new Audio('/sounds/explode.wav');
    var audio6 = new Audio('/sounds/hit.wav');
    var audio7 = new Audio('/sounds/sand.wav');
    var audio8 = new Audio('/sounds/teleport.wav');
    var audio9 = new Audio('/sounds/completelevel.wav');
    audio = [audio1, audio2, audio3, audio4, audio5, audio6, audio7, audio8, audio9];

    // Preload Spritesheet
    if (!spriteSheet.complete) {
        // not preloaded, listen for the complete event:
        spriteSheet.addEventListener("complete", handleSpritesLoaded);
    }
    else {
        renderGrid(activeCells[activeMap]);
        stage.update();
        start();
    }

    function handleSpritesLoaded(event) {
        renderGrid(activeCells[activeMap]);
        stage.update();
        start();
    }
}

function start(){
    id = setInterval(function() {
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
}

function renderGrid(cells) {    
    

    var sprite;
    cellsGrid = [];
    let i = 0;
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            sprite = new Sprite(spriteSheet);
            sprite.gotoAndStop(cells[i] - 1);
            sprite.x = x * cellWidth;
            sprite.y = y * cellHeight;
            stage.addChild(sprite);
            cellsGrid.push(sprite);
            i++;
        }    
    }
    
}

function updateCells(trigger1, trigger2 = 0) {
    /*
    if(props.programState !== "playing") {
        return;
    }
    */

    let arrayRandomCells = [];
    let arrayRandomOutputs = [];
    console.log("activeMap", activeMap);
    let oldCells = activeCells[activeMap].slice();
    let newCells = activeCells[activeMap].slice();
    
    //console.log("Update cells", oldCells.length);
    
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

        ruleIndex = gc(trigger1) + gc(trigger2) + gc(oldCells[i - gridWidth]) + gc(oldCells[i - 1]) + gc(oldCells[i]) + gc(oldCells[i + 1]) + gc(oldCells[i + gridWidth])
        //console.log("Ri", ruleIndex);
        if(rules[ruleIndex] && isMet) {    
            if(trigger1 === 13){
                // for random
                arrayRandomCells.push(i);
                arrayRandomOutputs.push(rules[ruleIndex].output);
            }
            else {
                //if(trigger1 < 5){
                //    console.log("r", ruleIndex);
                //}

                newCells[i] = rules[ruleIndex].output;
                cellsGrid[i].gotoAndStop(newCells[i] - 1);
                if(rules[ruleIndex].special1) {
                    if(triggerSpecial(rules[ruleIndex].special1)){
                        return;
                    }
                }
            }
        }
    }
    if(trigger1 === 13 && isMet) {
        let i = Math.floor(Math.random() * arrayRandomCells.length);
        newCells[arrayRandomCells[i]] = arrayRandomOutputs[i];
        cellsGrid[i].gotoAndStop(newCells[i] - 1);
        //if(rules[ruleIndex].special1) {
        //    triggerSpecial(rules[ruleIndex].special1);
        //}
    }

    activeCells[activeMap] = newCells.slice();
    stage.update();
}

function triggerSpecial(special) {
    //console.log("Trigger Special", special);
    if(special >= 1 && special <= 9) {
        audio[special - 1].play();
        return false;
    }
    else if(special === 10) {
        setTimeout(function(){ updateCells(20, 0);}, 50); // Change to lower for prod build
        return false;
    }
    else if(special === 11) {
        setTimeout(function(){ updateCells(21, 0);}, 50); // Change to lower for prod build
        return false;
    }
    else if(special === 12) {
        setTimeout(function(){ updateCells(22, 0);}, 50); // Change to lower for prod build
        return false;
    }
    else if(special === 13) {
        setTimeout(function(){ updateCells(23, 0);}, 50); // Change to lower for prod build
        return false;
    }
    else if(special === 16 && Number(activeMap) < 9) {
        activeMap++;
        renderGrid(activeCells[activeMap]);
        return true;
    }
    else if(special === 17 && Number(activeMap) > 0) {
        activeMap--;
        renderGrid(activeCells[activeMap]);
        return true;
    }
} 

export default PlayEaselJS;
