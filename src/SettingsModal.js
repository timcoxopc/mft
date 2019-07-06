import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

class SettingsModal extends React.Component {
 
    constructor(...args) {
        super(...args);
        this.state = { 
            cellswide: this.props.cellswide,
            cellshigh: this.props.cellshigh,
            cellwidth: this.props.cellwidth,
            cellheight: this.props.cellheight,
            timer1: this.props.timer1,
            timer2: this.props.timer2
        };
    }
 
    handleChange= e => {
        this.props.handleUpdateSettings([e.target.name], e.target.value);
        //this.setState({ [e.target.name]: e.target.value });
    }
 
    render() {
        return (
        <Form>
        <Modal
            {...this.props}
            className="settings-modal"
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Open File
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formBasicEmail">
                    <h5>Map</h5>
                    <Form.Row>
                        <div className="col-3">
                            <Form.Label>Cells Wide</Form.Label>
                            <Form.Control
                                name="cellswide"
                                value={this.props.cellswide}
                                onChange={this.handleChange}
                                type="input"
                                placeholder="http://www.example.com/example.json"
                            />
                        </div>
                        <div className="col-3">
                            <Form.Label>Cells High</Form.Label>
                            <Form.Control
                                name="cellshigh"
                                value={this.props.cellshigh}
                                onChange={this.handleChange}
                                type="input"
                                placeholder="http://www.example.com/example.json"
                            />
                        </div>
                    </Form.Row>
                    <Form.Row>
                        <div className="col-3">
                            <Form.Label>Cell Width</Form.Label>
                            <Form.Control
                                name="cellwidth"
                                value={this.props.cellwidth}
                                onChange={this.handleChange}
                                type="input"
                                placeholder="http://www.example.com/example.json"
                            />
                        </div>
                        <div className="col-3">
                            <Form.Label>Cells Height</Form.Label>
                            <Form.Control
                                name="cellheight"
                                value={this.props.cellheight}
                                onChange={this.handleChange}
                                type="input"
                                placeholder="http://www.example.com/example.json"
                            />
                        </div>
                        </Form.Row>
                    
                        <h5>Timers</h5>
                        <Form.Row>
                        <div className="col-3">
                            <Form.Label>Timer 1</Form.Label>
                            <Form.Control
                                name="timer1"
                                value={this.props.timer1}
                                onChange={this.handleChange}
                                type="input"
                                placeholder="http://www.example.com/example.json"
                            />
                        </div>
                        <div className="col-3">
                            <Form.Label>Timer 2</Form.Label>
                            <Form.Control
                                name="timer2"
                                value={this.props.timer2}
                                onChange={this.handleChange}
                                type="input"
                                placeholder="http://www.example.com/example.json"
                            />
                        </div>
                    </Form.Row>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={() => this.props.onHide()} type="submit">
                OK
            </Button>
            </Modal.Footer>
        </Modal>
        </Form>
    );
  }
}

/*
<Button variant="secondary" onClick={this.props.onHide}>
Close
</Button>
 */

export default SettingsModal;