import React from 'react';
import Button from 'react-bootstrap/Button';

function CompileButton(props) {
    if(props.programState === "uncompiled"){
        return <Button onClick={props.handlePlay} className="play-button">Compile</Button>
    }
    else if(props.programState === "compiling"){
        return <Button onClick={props.handlePlay} disabled={true} className="play-button">Compiling...</Button>
    } 
    else if(props.programState === "compiled"){
        return <Button onClick={props.handlePlay} variant="success" className="play-button">Play</Button>
    }
    else if(props.programState === "playing"){
        return <Button onClick={props.handlePlay} variant="danger" className="play-button">Stop</Button>
    }
    return null;
}

export default CompileButton