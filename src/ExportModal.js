import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ExportWindow from './ExportWindow';

class ExportModal extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: true,
      };
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    render() {
      return (
        <>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Export</Modal.Title>
            </Modal.Header>
            <Modal.Body><ExportWindow /></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }

  export default ExportModal;
  