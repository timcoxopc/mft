import React, {useEffect} from 'react';

function TriggerTimer(props) {
    const timerID = setInterval(props.onUpdate(props.triggerID), props.delay); 

    useEffect(() => {
        return () => {
            if(timerID) {    
                clearInterval(timerID);
            }
        }
    }, [timerID]);
}

export default TriggerTimer