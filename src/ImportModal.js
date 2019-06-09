import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
 
class ImportModal extends React.Component {
 
    constructor(...args) {
        super(...args);
        this.state = { fileName: "" };
    }
 
    handleChange= e => {
        this.setState({ [e.target.name]: e.target.value });
    }
 
    render() {
        return (
        <Form>
        <Modal
            {...this.props}
            size="lg"
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
                    <Form.Label>File location</Form.Label>
                    <Form.Control
                        name="fileName"
                        value={this.state.fileName}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="http://www.example.com/example.json"
                    />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>
                Close
            </Button>
            <Button variant="primary" onClick={() => this.props.openfile(this.state.fileName)} type="submit">
                Open File
            </Button>
            </Modal.Footer>
        </Modal>
        </Form>
    );
  }
}
 
export default ImportModal;