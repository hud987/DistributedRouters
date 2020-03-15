import React, { Component } from 'react';

import Node from './Node'

export default class NodeMap extends Component {
  state = {   

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
    var nodeCoordsNew = this.props.nodeCoords
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
    document.onmouseup = null
    document.onmousemove = null
    if ( !this.movedOnClick ) {
      //console.log( 'didnt move')
      //this.contextTrigger.handleContextClick(e);
    }
  }

  render() {
    //console.log(Math.sin(angle))
    return (
      <div>
          { 
            this.props.links.map((e,i) => {
            var angle=Math.atan2(this.props.nodeCoords[e.end].x-this.props.nodeCoords[e.start].x,this.props.nodeCoords[e.end].y-this.props.nodeCoords[e.start].y)
            return ( 
              <div 
                key={i}
                style={{
                  left: 300+(this.props.nodeCoords[e.start].x+(40*Math.cos(angle))+this.props.nodeCoords[e.end].x+50)/2, 
                  top: (this.props.nodeCoords[e.start].y-(40*Math.sin(angle))+this.props.nodeCoords[e.end].y+50)/2,
                  fontSize: '20px',
                  position: 'absolute',
                }}
              >
                { e.val }
              </div>)
          })}
          { Object.entries(this.props.nodeCoords).map(([k,v]) => {
            return ( 
              <Node 
                key={k} 
                id={k.toString()} 
                rm={this.onStartRemoveLink} 
                //reff={c => this.contextTrigger = c} 
                dragMouseDown={this.dragMouseDown} 
                onClick={this.props.onClick}
                x={v.x} 
                y={v.y}
                removeNodeActive={this.props.removeNodeActive}
              /> )
          })}
          <svg width={window.innerWidth} height={window.innerHeight}>
          
          { this.props.links.map((e,i) => {
            return ( 
              <line 
                key={i}
                x1={this.props.nodeCoords[e.start].x+40}
                y1={this.props.nodeCoords[e.start].y+40} 
                x2={this.props.nodeCoords[e.end].x+40} 
                y2={this.props.nodeCoords[e.end].y+40}
                stroke="black"
                strokeWidth="5"
              /> )
          })}

          </svg>

        </div>
  )}
}

/*

*/