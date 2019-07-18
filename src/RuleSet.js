import React from 'react';
import Rule from './Rule';
import SpritePalette from './SpritePalette';

function RuleSet(props) {
    const totalRules = 200;
    let rules = [];
    for (let i = 0; i < totalRules; i++) {
        rules.push(
            <Rule 
                key={i}
                index={i + 1} 
                rule={props.rules[i]} 
                spriteSheet={props.spriteSheet}
                spriteWidth={props.spriteWidth}
                spriteHeight={props.spriteHeight}
                spritesPerRow={props.spritesPerRow}
                onClick={props.onRuleClick} 
            />
        );
    }
    
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

            <div className="rules-wrapper">
                {rules}
            </div>
        </div>
    );
}

export default RuleSet;