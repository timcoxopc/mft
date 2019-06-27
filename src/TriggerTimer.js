import React, {useEffect} from 'react';

function TriggerTimer(props) {
    //props.onUpdate(props.triggerID)
    console.log("init", props.delay);
    const timerID = setInterval(function(){ props.onUpdate(props.triggerID) }, props.delay); 

    useEffect(() => {
        return () => {
            if(timerID) {    
                clearInterval(timerID);
            }
        }
    }, [timerID]);

    return (<div>Timer Placholder</div>);
}

export default TriggerTimer