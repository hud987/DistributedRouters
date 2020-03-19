import React, { Component } from 'react';

import Node from './Node'
import NodeTable from './NodeTable'
import Link from './Link'

export default class NodeMap extends Component {
  state = {}

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

    this.movedOnClick = true
    this.pos1 = this.pos3 - e.clientX
    this.pos2 = this.pos4 - e.clientY
    this.pos3 = e.clientX
    this.pos4 = e.clientY
    var newY,newX;
    var nodeCoordsNew = this.props.nodeCoords
    if (this.reff.offsetTop - this.pos2 < 14) {
      newY = 14
    } else if (this.reff.offsetTop - this.pos2 > window.innerHeight-94) {
      newY = window.innerHeight-94
    } else {
      newY = this.reff.offsetTop - this.pos2
    }
    if (this.reff.offsetLeft - this.pos1 < 14) {
      newX = 14
    } else if (this.reff.offsetLeft - this.pos1 > window.innerWidth-394) {
      newX = window.innerWidth-394
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
    if ( !this.movedOnClick && !this.props.removeNodeActive && !this.props.killNodeActive && !this.props.reviveNodeActive && !this.props.addLinkActive && !this.props.removeLinkActive ) {
      //this.contextTrigger.handleContextClick(e);
      if (e.target.id in this.props.nodeTables) {
        this.props.onCloseNodeTable(e)
      } else if (!this.props.reviveNodeActive) {
        this.props.onOpenNodeTable(e)
      }
    }
  }

  render() {
    return (
      <div style={{overflow: 'hidden'}}>
          { 
            Object.entries(this.props.links).map(([k,v]) => {
            if (v.end!=-1) {
              var angle=Math.atan2(this.props.nodeCoords[v.end].x-this.props.nodeCoords[v.start].x,this.props.nodeCoords[v.end].y-this.props.nodeCoords[v.start].y)
              return ( 
                <input
                  type='visible' 
                  value={v.val}
                  key={k}
                  id={k.toString()}
                  style={{
                    width: 48,
                    left: 300+(this.props.nodeCoords[v.start].x+(50*Math.cos(angle))+this.props.nodeCoords[v.end].x+40)/2, 
                    top: (this.props.nodeCoords[v.start].y-(40*Math.sin(angle))+this.props.nodeCoords[v.end].y+50)/2,
                    fontSize: '20px',
                    position: 'absolute',
                    color: this.props.linkStrokes[k],
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                  }}
                  onChange={this.props.onLinkValChange}
                >
                </input>)
            }
          })}
          
          { Object.entries(this.props.nodeCoords).map(([k,v]) => {
            return ( 
              <Node 
                key={k} 
                id={k.toString()} 
                rm={this.onStartRemoveLink} 
                //reff={c => this.contextTrigger = c} 
                dragMouseDown={this.dragMouseDown} 
                onClick={this.props.onNodeClick}
                x={v.x} 
                y={v.y}
                removeNodeActive={this.props.removeNodeActive}
                killNodeActive={this.props.killNodeActive}
                reviveNodeActive={this.props.reviveNodeActive}
                addLinkActive={this.props.addLinkActive}
                alive={k in this.props.aliveNodes}
              /> )
          })}
          <svg width={window.innerWidth} height={window.innerHeight}>
          
          { Object.entries(this.props.links).map(([k,v]) => {
            return ( 
              <Link 
                key={k}
                id={k.toString()}
                x1={this.props.nodeCoords[v.start].x+40}
                y1={this.props.nodeCoords[v.start].y+40} 
                x2={v.end==-1 ? this.props.mousex-300 : this.props.nodeCoords[v.end].x+40} 
                y2={v.end==-1 ? this.props.mousey :this.props.nodeCoords[v.end].y+40}
                removeLinkActive={this.props.removeLinkActive}
                reviveLinkActive={this.props.reviveLinkActive}
                killLinkActive={this.props.killLinkActive}
                stroke={this.props.linkStrokes[k]}
                onClick={this.props.onLinkClick}
                onMouseOver={this.props.onLinkMouseOver}
                onMouseOut={this.props.onLinkMouseOut}
              /> )
          })}

          </svg>
          { Object.entries(this.props.nodeTables).map(([k,v]) => {
            return (
              <NodeTable 
                key={k}
                x={this.props.nodeCoords[k].x+350} 
                y={this.props.nodeCoords[k].y-70}
                nodeInfo={v}
              />
            )
          })}
        </div>
  )}
}

/*

*/