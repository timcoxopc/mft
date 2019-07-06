import React from 'react';
import trigger1 from './img/triggers/arrow_left.png';
import trigger2 from './img/triggers/arrow_up.png';
import trigger3 from './img/triggers/arrow_right.png';
import trigger4 from './img/triggers/arrow_down.png';
import trigger5 from './img/triggers/tap.png';
import trigger6 from './img/triggers/button1.png';
import trigger7 from './img/triggers/button2.png';
import trigger8 from './img/triggers/1-2-random.png';
import trigger9 from './img/triggers/2-2-random.png';
import trigger10 from './img/triggers/step1.png';
import trigger11 from './img/triggers/step2.png';
import trigger12 from './img/triggers/timer1.png';
import trigger13 from './img/triggers/timer2.png';
import trigger14 from './img/triggers/loop.png';
import trigger15 from './img/triggers/loop1.png';
import trigger16 from './img/triggers/1-4-random.png';
import trigger17 from './img/triggers/2-4-random.png';
import trigger18 from './img/triggers/3-4-random.png';
import trigger19 from './img/triggers/4-4-random.png';
import trigger21 from './img/triggers/trigger1.png';
import trigger22 from './img/triggers/trigger2.png';
import trigger23 from './img/triggers/trigger3.png';
import trigger24 from './img/triggers/trigger4.png';
import trigger25 from './img/triggers/loop2.png';

const arrayTrigger = ["", trigger1, trigger2, trigger3, trigger4, trigger5, trigger6, trigger7, trigger8, trigger9, trigger10, trigger11, trigger12, trigger13, trigger14, trigger15, trigger16, trigger17, trigger18, trigger19, trigger21, trigger22, trigger23, trigger24, trigger25];

function Trigger(props) {

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

export default Trigger;