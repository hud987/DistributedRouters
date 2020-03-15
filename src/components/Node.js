import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export default class Node extends Component {
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
    this.movedOnClick = false

    document.onmouseup = this.closeDragElement
    document.onmousemove = this.elementDrag
  }

  elementDrag = (e) => {
    e.preventDefault()
    //console.log('dragging')
    this.movedOnClick = true
  }

  closeDragElement = (e) => {
    //console.log('unclicked')

    document.onmouseup = null
    document.onmousemove = null
    if ( !this.movedOnClick ) {
      console.log( 'didnt move')
      //this.contextTrigger.handleContextClick(e);
    }
  }

  handleClick2 = (e) => {}

  handleClick = (e, data) => {
    this.props.rm(e)
    //console.log(data.foo);
  }

  render() {
    return (
      <div style={{position: 'absolute'}}>
        <ContextMenuTrigger 
          style={{backgroundColor: "blue"}}
          ref={this.props.reff} 
          id="some_unique_identifier"
          holdToDisplay={-1}
        >
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '80px',
              height: '80px',
              backgroundColor: 'red',
              border: '3.5px solid black',
              borderRadius: "45px",
              left: this.props.x, 
              top: this.props.y,
              position: 'absolute',
            }}
            id={this.props.id}
            onMouseDown={this.props.dragMouseDown}
            ref={this.reff}
          >
            <div
              id={this.props.id} 
              style={{
              paddingBottom: "5px",
              fontSize: '30px',
              pointerEvents: "none",
            }}>
              10
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
          <div>
          <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
            Add Link
          </MenuItem>
          <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
            Remove Link
          </MenuItem>
          </div>
          <div >
            Node | Next Hop
          </div>
        </ContextMenu>
      </div>
  )}
}
