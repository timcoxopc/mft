import React from 'react';

function buildFileSelector(){
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('id', 'files');
  return fileSelector;
}

class FileSelector extends React.Component {
    componentDidMount(){ 
    this.fileSelector = buildFileSelector();
    this.fileSelector.addEventListener('change', this.handleFileSelected, false);
  }
  handleFileSelected = (evt) => {
    var file = evt.target.files[0]; 
    var reader = new FileReader();

    reader.handler = this.props.onFileLoaded
    reader.onload = (function(f) {
        return function(e) {
            this.handler(reader.result);
        };
    })(file);

    reader.readAsText(file);
  }

  handleFileSelect = (e) => {
    e.preventDefault();
    this.fileSelector.click();
  }
  //className="button" href=""
  render(){
    return <span onClick={this.handleFileSelect}>{this.props.label}</span>
  }
}

export default FileSelector
