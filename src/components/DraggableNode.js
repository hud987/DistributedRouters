import React, { Component } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export default class DraggableNode extends Component {
  state = {
    x: this.props.x,
    y: this.props.y,
  } 
  reff = React.createRef();     
  contextTrigger = null;

  componentDidMount() {
    this.pos1 = 0
    this.pos2 = 0
    this.pos3 = 0
    this.pos4 = 0
  }

  dragMouseDown = (e) => {
    e.preventDefault()
    //console.log('clicked')
    this.movedOnClick = false
    this.pos3 = e.clientX
    this.pos4 = e.clientY
    document.onmouseup = this.closeDragElement
    document.onmousemove = this.elementDrag
  }

  elementDrag = (e) => {
    e.preventDefault()
    //console.log('dragging')
    this.movedOnClick = true
    this.pos1 = this.pos3 - e.clientX
    this.pos2 = this.pos4 - e.clientY
    this.pos3 = e.clientX
    this.pos4 = e.clientY
    var newY,newX;
    if (this.reff.current.offsetTop - this.pos2 < 0) {
      newY = 0
    } else if (this.reff.current.offsetTop - this.pos2 > window.innerHeight-80) {
      newY = window.innerHeight-80
    } else {
      newY = this.reff.current.offsetTop - this.pos2
    }
    if (this.reff.current.offsetLeft - this.pos1 < 0) {
      newX = 0
    } else if (this.reff.current.offsetLeft - this.pos1 > window.innerWidth-80) {
      newX = window.innerWidth-80
    } else {
      newX = this.reff.current.offsetLeft - this.pos1
    }
    this.setState({
        y:newY + "px",
        x:newX + "px",
    })
  }

  closeDragElement = (e) => {
    //console.log('unclicked')

    document.onmouseup = null
    document.onmousemove = null
    if ( !this.movedOnClick ) {
      console.log( 'didnt move')
      this.contextTrigger.handleContextClick(e);
    }
  }

  handleClick = (e, data) => {
    console.log(data.foo);
  }

  render() {
    return (
      <div>
        <ContextMenuTrigger 
          ref={c => this.contextTrigger = c} 
          id="some_unique_identifier"
        >
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '80px',
              height: '80px',
              backgroundColor: 'white',
              border: '3.5px solid black',
              borderRadius: "45px",
              left: this.state.x, 
              top: this.state.y,
              position: 'absolute'
            }}
            onMouseDown={this.dragMouseDown}
            ref={this.reff}
          >
            <div style={{
              paddingBottom: "5px",
              fontSize: '40px',
            }}>
              3
            </div>
          </div>
        </ContextMenuTrigger>

        <ContextMenu 
          style={{
            padding: 3,
            backgroundColor: 'white',
            border: '3px solid black',
            borderRadius: "4px",
          }} 
          id="some_unique_identifier"
        >
          <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
            ContextMenu Item 1
          </MenuItem>
          <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
            ContextMenu Item 2
          </MenuItem>
          <MenuItem divider />
          <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
            ContextMenu Item 3
          </MenuItem>
        </ContextMenu>
      </div>
  )}
}
