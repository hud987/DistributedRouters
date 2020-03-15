import React, { Component } from 'react';

import Node from './Node'

export default class NodeMap extends Component {
  state = {   
    nodeCoords: [
      {x: 0, y: 0},
      {x: 100, y: 100},
    ],
    nodesRendered: false,
  }
  removeLinkActive = 0

  componentDidMount() {
    this.pos1 = 0
    this.pos2 = 0
    this.pos3 = 0
    this.pos4 = 0
    document.addEventListener('mousedown', this.handleRemoveLink);
  }

  dragMouseDown = (e) => {
    e.preventDefault()
    //console.log('clicked')
    this.clickedId = parseInt(e.target.id)
    this.reff = e.target
    this.movedOnClick = false
    this.pos3 = e.clientX
    this.pos4 = e.clientY
    document.onmouseup = this.closeDragElement
    document.onmousemove = this.elementDrag
  }

  elementDrag = (e,id) => {
    e.preventDefault()
    //console.log('dragging')
    this.movedOnClick = true
    this.pos1 = this.pos3 - e.clientX
    this.pos2 = this.pos4 - e.clientY
    this.pos3 = e.clientX
    this.pos4 = e.clientY
    var newY,newX;
    var nodeCoordsNew = this.state.nodeCoords
    if (this.reff.offsetTop - this.pos2 < 0) {
      newY = 0
    } else if (this.reff.offsetTop - this.pos2 > window.innerHeight-80) {
      newY = window.innerHeight-80
    } else {
      newY = this.reff.offsetTop - this.pos2
    }
    if (this.reff.offsetLeft - this.pos1 < 0) {
      newX = 0
    } else if (this.reff.offsetLeft - this.pos1 > window.innerWidth-80) {
      newX = window.innerWidth-80
    } else {
      newX = this.reff.offsetLeft - this.pos1
    }
    //console.log(this.clickedId)
    nodeCoordsNew[this.clickedId].x = newX
    nodeCoordsNew[this.clickedId].y = newY
    this.setState({
      nodeCoords: nodeCoordsNew
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

  handleRemoveLink(e) {
    if (this.removeLinkActive>0) {
      console.log('removed link')
      this.removeLinkActive--
    }
    /* if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      alert('You clicked outside of me!');
    }*/
    console.log('clicked')
    console.log(this.removeLinkActive)

  }

  onStartRemoveLink = () => {
    this.removeLinkActive = 2
    console.log('remove Link')
    console.log(this.removeLinkActive)
  }

  render() {
    var angle=Math.atan2(this.state.nodeCoords[1].x-this.state.nodeCoords[0].x,this.state.nodeCoords[1].y-this.state.nodeCoords[0].y)
    //console.log(Math.sin(angle))
    return (
      <div>
          <div 
            style={{
              left: 300+(this.state.nodeCoords[0].x+(40*Math.cos(angle))+this.state.nodeCoords[1].x+50)/2, 
              top: (this.state.nodeCoords[0].y-(40*Math.sin(angle))+this.state.nodeCoords[1].y+50)/2,
              fontSize: '20px',
              position: 'absolute',
            }}
          >
            10
          </div>
          <Node id={"0"} rm={this.onStartRemoveLink} reff={c => this.contextTrigger = c} dragMouseDown={this.dragMouseDown} x={this.state.nodeCoords[0].x} y={this.state.nodeCoords[0].y}/>
          <Node id={"1"} rm={this.onStartRemoveLink} reff={c => this.contextTrigger = c} dragMouseDown={this.dragMouseDown} x={this.state.nodeCoords[1].x} y={this.state.nodeCoords[1].y}/>
          <svg width={window.innerWidth} height={window.innerHeight}>
            <line 
              x1={this.state.nodeCoords[0].x+40}
              y1={this.state.nodeCoords[0].y+40} 
              x2={this.state.nodeCoords[1].x+40} 
              y2={this.state.nodeCoords[1].y+40}
              stroke="black"
              strokeWidth="5"
              />
          </svg>

        </div>
  )}
}

/*

*/