import React from 'react';
import random_1_2 from './img/triggers/1-2-random.png';
import random_2_2 from './img/triggers/2-2-random.png';
import random_1_4 from './img/triggers/1-4-random.png';
import random_2_4 from './img/triggers/2-4-random.png';
import random_3_4 from './img/triggers/3-4-random.png';
import random_4_4 from './img/triggers/4-4-random.png';
import random_1_2_i from './img/triggers/onetwo.png';
import random_2_2_i from './img/triggers/twotwo.png';
import random_1_4_i from './img/triggers/onefour.png';
import random_2_4_i from './img/triggers/twofour.png';
import random_3_4_i from './img/triggers/threefour.png';
import random_4_4_i from './img/triggers/fourfour.png';

const arrayTrigger = ["", random_1_2, random_2_2, random_1_4, random_2_4, random_3_4, random_4_4, random_1_2_i, random_2_2_i, random_1_4_i, random_2_4_i, random_3_4_i, random_4_4_i];

function TriggerModifier(props) {

    let borderClass;
    if(props.value === 0) {
        borderClass = "trigger--is-empty";
    } else {
        borderClass = "trigger--not-empty"
    }

    let triggerButtonStyle = {
        backgroundImage:"url(" + arrayTrigger[props.value] + ")",
        backgroundSize: "contain"
    }

    return(
        <div className={props.className}>
            <button 
            style = {triggerButtonStyle}
            className={borderClass + " cell--inner cell--trigger"} 
            onClick = {props.onClick}
            />
        </div>
    );
}

export default TriggerModifier;