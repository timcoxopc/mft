import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button'

function KeyTrigger(props) {

    const handleKeyDown = (e) => {
        if(e.keyCode === props.keyCode){
            props.onTrigger(2);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, true);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);
        };
    });

    return <Button style={props.style}>{props.label}</Button>
}

export default KeyTrigger