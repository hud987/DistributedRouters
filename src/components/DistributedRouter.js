import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { arrayMove } from 'react-movable';

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
    links: {
      0: {start: 0,end: 1, val: 5},
      1: {start: 1,end: 2, val: 20},
      2: {start: 0,end: 3, val: 30},
    },
    nodeTables: {
      //0: {0: 1, 1:1, 2:2},
      //1: {0: 1, 1:1, 2:2},
      //2: {0: 1, 1:1, 2:2},
    },
    nodeIds: [ 0, 1, 2, 3],
    removeNodeActive: false,
    removeLinkActive: false,
    addLinkStartActive: false,
    addLinkEndActive: false,
    addLinkActiver: false,
    mousex: 0,
    mousey: 0,
  }

  componentDidMount() {
  }

  onAddNode = () => {
    var arr = Object.entries(this.state.nodeCoords)
    var newNodeIds = this.state.nodeIds
    if (arr.length<15) {
      for (var i=0;i<=arr.length;i++) {
        if (!(i in this.state.nodeCoords)) {
          newNodeIds.push(i)
          this.setState({ 
            nodeCoords: {...this.state.nodeCoords,[i]: {x: 0, y: 0} }, 
            nodeIds: newNodeIds,
          });
          break
        }
      }
    }
  }

  onRemoveNode = () => {
    this.setState({removeNodeActive: true})
    document.addEventListener('click', this.endRemoveNode);
  }

  endRemoveNode = () => {
    this.setState({removeNodeActive: false})
    document.removeEventListener('click', this.endRemoveNode);
  }

  onAddLink = () => {
    this.setState({
      addLinkActive: true,
      addLinkStartActive: true
    })
    document.addEventListener('click', this.continueAddLink);
    document.addEventListener('mousemove', this.onMouseMove);
  }

  continueAddLink = () => {
    this.setState({
      addLinkStartActive: false, 
      addLinkEndActive: true
    })
    document.removeEventListener('click', this.continueAddLink);
    document.addEventListener('click', this.endAddLink);
  }

  endAddLink = () => {
    this.setState({
      addLinkActive: false,
      addLinkEndActive: false
    })
    document.removeEventListener('click', this.endAddLink);
    document.removeEventListener('mousemove', this.onMouseMove);

    var newLinks={}
    Object.entries(this.state.links).forEach(([k,v]) => {
      if (v.end!=-1) {
        newLinks = {...newLinks, [k]: {start:v.start, end:v.end, val:v.val}}
      } 
    })
    this.setState({links: newLinks})
  }

  onRemoveLink = () => {
    this.setState({removeLinkActive: true})
    document.addEventListener('click', this.endRemoveLink);
  }

  endRemoveLink = () => {
    this.setState({removeLinkActive: false})
    document.removeEventListener('click', this.endRemoveLink);
  }

  onNodeClick = (e) => {
    var clickedId = parseInt(e.target.id)
    if (this.state.removeNodeActive) {
      var newLinks = {}
      var newNodes = {}
      var newNodeIds = this.state.nodeIds

      newNodeIds.map((e,i) => {
        if (clickedId==e) {
          newNodeIds.splice(i,1)
        }
      })

      Object.entries(this.state.nodeCoords).forEach(([k,v]) => {
        if (k!=clickedId) {
          newNodes = {...newNodes, [k]: {x:v.x, y:v.y}}
        } 
      })

      Object.entries(this.state.links).forEach(([k,v]) => {
        if (v.end!=clickedId && v.start!=clickedId) {
          newLinks = {...newLinks, [k]: {start:v.start, end:v.end, val:v.val}}
        }
      })

      this.setState({
        nodeCoords: newNodes,
        links: newLinks,
        nodeIds: newNodeIds,
      })
    } else if (this.state.addLinkStartActive) {
      var arr = Object.entries(this.state.links)
      var linksNew = this.state.links
      for (var i=0;i<=arr.length;i++) {
        if (!(i in this.state.links)) {
          this.setState({ links: {...this.state.links,[i]: {start: clickedId, end: -1,val: -1} } });
          linksNew = {...linksNew, [i]: {start: clickedId, end: -1,val: 0} } 
          break
        }
      }
      console.log(linksNew)
    } else if (this.state.addLinkEndActive) {
      var newLinks = this.state.links
      var start=0
      var validNodeClicked=true
      var len=0

      Object.entries(this.state.links).forEach(([k,v]) => {
        len++
        if (v.end==-1) {
          start = v.start
        }
      })
      
      Object.entries(this.state.links).forEach(([k,v]) => {
        if ( (v.start==clickedId && v.end==start) || (v.start==start && v.end==clickedId)) {
          validNodeClicked=false
        } 
      })

      if (validNodeClicked) {
        for (var i=0;i<=len;i++) {
          if (!(i in this.state.links)) {
            newLinks = {...newLinks,[i]: {start: start, end: clickedId, val: 10}};
            break
          }
        }
      }
      this.setState({
        links: newLinks,
      })
    }
  }

  onLinkClick = (e) => {
    if (this.state.removeLinkActive) {
      var newLinks = {}
      Object.entries(this.state.links).forEach(([k,v]) => {
        if (k!=e.target.id) {
          newLinks = {...newLinks, [k]: {start:v.start, end:v.end, val:v.val}}
        }
      })
      this.setState({
        links: newLinks,
      })
    }    

    
  }

  onLinkValChange = (e) => {
    var clickedId = parseInt(e.target.id)
    var val = e.target.value
    if (val<999) {
      var newLinks = this.state.links
      newLinks[clickedId].val = val

      this.setState({
        links: newLinks,
      })
    }
  }
  
  onOpenNodeTable = (e) => {
    this.setState({nodeTables: {...this.state.nodeTables, [e.target.id]: {0:1,1:1,2:1}}})
  }

  onCloseNodeTable = (e) => {
    var newNodeTables = {}
    Object.entries(this.state.nodeTables).forEach(([k,v]) => {
      if (k!=e.target.id) {
        newNodeTables = {...newNodeTables, [k]: v}
      }
    })
    this.setState({nodeTables: newNodeTables})
  }

  onMouseMove = (e) => {
    //console.log(e.clientX)
    this.setState({
      mousex: e.clientX,
      mousey: e.clientY
    }) 
  }

  render() {
    return (
      <div style={{display:'flex'}}>
        <Menu 
          nodeIds={this.state.nodeIds}
          onChangeNodeList={({ oldIndex, newIndex }) => {
          console.log(arrayMove(this.state.nodeIds, oldIndex, newIndex))
          this.setState({nodeIds: arrayMove(this.state.nodeIds, oldIndex, newIndex)})
          }
        }
          onAddNode={this.onAddNode} 
          onRemoveNode={this.onRemoveNode}
          onRemoveLink={this.onRemoveLink}
          onAddLink={this.onAddLink}
          removeNodeActive={this.state.removeNodeActive}
          removeLinkActive={this.state.removeLinkActive}
          addLinkActive={this.state.addLinkActive}
        />
        <NodeMap 
          nodeCoords={this.state.nodeCoords} 
          nodeTables={this.state.nodeTables}
          links={this.state.links}
          mousex={this.state.mousex}
          mousey={this.state.mousey}
          onNodeClick={ this.onNodeClick }
          onLinkClick={ this.onLinkClick }
          onLinkValChange={this.onLinkValChange}
          onOpenNodeTable={this.onOpenNodeTable}
          onCloseNodeTable={this.onCloseNodeTable}
          removeNodeActive={this.state.removeNodeActive}
          removeLinkActive={this.state.removeLinkActive}
          addLinkActive={this.state.addLinkActive}
        />
      </div>
  )}
}