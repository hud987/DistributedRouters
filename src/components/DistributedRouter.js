import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import NodeMap from './NodeMap'
import Menu from './Menu'

export default class DistributedRouter extends Component {
  state = {  
    nodeCoords: {
      0: {x: 200, y: 200},
      1: {x: 200, y: 400},
      2: {x: 400, y: 200},
      3: {x: 400, y: 400},
    },
    links: [
      {start: 0,end: 1, val: 10},
      {start: 1,end: 2, val: 20},
      {start: 0,end: 3, val: 30}
    ],
    removeNodeActive: false
  }

  componentDidMount() {
  }

  onAddNode = () => {
    var arr = Object.entries(this.state.nodeCoords)
    if (arr.length<15) {
      for (var i=0;i<=arr.length;i++) {
        if (!(i in this.state.nodeCoords)) {
          this.setState({ nodeCoords: {...this.state.nodeCoords,[i]: {x: 0, y: 0} } });
          break
        }
      }

    }
  }

  onRemoveNode = () => {
    this.setState({removeNodeActive: true})
    document.addEventListener('click', this.endRemoveNode);
    //console.log(this.state.removeNodeActive)
  }

  endRemoveNode = () => {
    this.setState({removeNodeActive: false})
    document.removeEventListener('click', this.endRemoveNode);
    //console.log(this.state.removeNodeActive)
  }

  onNodeClick = (e) => {
    var clickedId = parseInt(e.target.id)
    if (this.state.removeNodeActive) {
      var newLinks = this.state.links
      var newNodes = {}
      Object.entries(this.state.nodeCoords).forEach(([k,v]) => {
        if (k!=clickedId) {
          newNodes = {...newNodes, [k]: {x:v.x, y:v.y}}
        }
      })

      this.state.links.forEach((e,i) => {
        if (e.end==clickedId || e.start==clickedId) {
          newLinks.splice(i,1)
        }
      }) 
      
      this.setState({
        nodeCoords: newNodes,
        links: newLinks,
      })
    }
  }

  render() {
    return (
      <div style={{display:'flex'}}>
        <Menu 
          onAddNode={this.onAddNode} 
          onRemoveNode={this.onRemoveNode}
          removeNodeActive={this.state.removeNodeActive}
        />
        <NodeMap 
          nodeCoords={this.state.nodeCoords} 
          links={this.state.links}
          removeNodeActive={this.state.removeNodeActive}
          onClick={ this.onNodeClick }
        />
      </div>
  )}
}