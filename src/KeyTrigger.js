import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button'

function KeyTrigger(props) {

    const handleKeyDown = (e) => {
        if(e.keyCode === props.keyCode){
            props.onTrigger(2);
            e.preventDefault();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, true);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);
        };
    });

    return <Button onClick={() => props.onTrigger(2)} style={props.style}>{props.label}</Button>
}

export default KeyTrigger