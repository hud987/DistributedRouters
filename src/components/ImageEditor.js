import React, { Component } from 'react';
import './ImageEditor.css';

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      image: "",
    };

  }

  dropArea = React.createRef()
  gallery = React.createRef();

  componentDidMount() {
    let div = this.dropArea.current
    div.addEventListener('dragenter', this.handleDragIn)
    div.addEventListener('dragleave', this.handleDragOut)
    div.addEventListener('dragover', this.handleDragIn)
    div.addEventListener('drop', this.handleDrop)
  }
  componentWillUnmount() {
    let div = this.dropArea.current
    div.removeEventListener('dragenter', this.handleDragIn)
    div.removeEventListener('dragleave', this.handleDragOut)
    div.removeEventListener('dragover', this.handleDrag)
    div.removeEventListener('drop', this.handleDrop)
  }

  handleDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const dropArea = this.dropArea.current;
    dropArea.classList.add('highlight')
  }
  
  handleDragOut = (e) => {  
    e.preventDefault()
    e.stopPropagation()
    const dropArea = this.dropArea.current;
    dropArea.classList.remove('highlight')
  }

  handleDrop = (e) => {   
    e.preventDefault();
    let dt = e.dataTransfer
    let files = dt.files
    console.log('dropped')
    this.handleImage(files[0])
  }

  handleImage = (i) => {
    let gallery = this.gallery.current
    let reader = new FileReader()
    reader.readAsDataURL(i)
    reader.onloadend = function() {
      let img = document.createElement('img')
      img.src = reader.result
      gallery.appendChild(img)
    }
  }

  render() {
    return (
      <div>
        <div id="title-text">Image Editor</div>
        <div id="drop-area" ref={this.dropArea}>
          <form 
            className="my-form" 
          >
            <p>Upload a file with the file dialog or by dragging and dropping images onto the dashed region</p>
            <input type="file" id="fileElem" accept="image/*"/>
            <label className="button" htmlFor="fileElem">Select a file</label>
          </form>
        </div>  
        <div id="image-container" ref={this.gallery}></div>    
      </div>
  )}
}