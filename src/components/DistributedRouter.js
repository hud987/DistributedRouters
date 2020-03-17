import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { arrayMove } from 'react-movable';

import NodeMap from './NodeMap'
import Menu from './Menu'

export default class DistributedRouter extends Component {
  state = {  
    nodeCoords: {
      0: {x: 200, y: 200},
      1: {x: 400, y: 200},
      2: {x: 200, y: 400},
      3: {x: 400, y: 400},
    },
    links: {
      0: {start: 0,end: 1, val: 10},
      1: {start: 1,end: 3, val: 20},
      2: {start: 3,end: 2, val: 30},
      3: {start: 2,end: 0, val: 40},
    },
    nodeNeighbors: {
      0: {1:10, 2:40},
      1: {0:5, 3:20},
      2: {0:40, 3:30},
      3: {1:20, 2:30},
    },
    nodeNextHops: {},
    nodeTables: {},
    nodeIds: [ 0, 1, 2, 3],
    removeNodeActive: false,
    removeLinkActive: false,
    addLinkStartActive: false,
    addLinkEndActive: false,
    addLinkActiver: false,
    packetOrderCurrIndex: 0,
    mousex: 0,
    mousey: 0,
  }

  componentDidMount() {
  }

  onAddNode = () => {
    var arr = Object.entries(this.state.nodeCoords)
    var idOfNewNode = 0
    var newNodeIds = this.state.nodeIds
    var newNodeNeighbors = this.state.nodeNeighbors

    if (arr.length<15) {
      for (var i=0;i<=arr.length;i++) {
        if (!(i in this.state.nodeCoords)) {
          idOfNewNode = i
          break
        }
      }

      newNodeIds.push(idOfNewNode)
      this.setState({ 
        nodeNeighbors: {...newNodeNeighbors, [idOfNewNode]: {}},
        nodeCoords: {...this.state.nodeCoords,[idOfNewNode]: {x: 0, y: 0} }, 
        nodeIds: newNodeIds,
      });
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

    //delete link connected to mouse
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
      var newNodeNeighbors = {}
      var newNodeTables = {}
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

      Object.entries(this.state.nodeNeighbors).forEach(([k,v]) => {
        if (k!=clickedId) {
          var newNeighbors = {}
          Object.entries(v).forEach(([k,v]) => {
            if (k!=clickedId) {
              newNeighbors = {...newNeighbors, [k]: v}
            }
          })
          newNodeNeighbors = {...newNodeNeighbors, [k]: newNeighbors}
          if (k in this.state.nodeTables) {
            newNodeTables = {...newNodeTables, [k]: newNeighbors}
          }
        }
      })

      this.setState({
        nodeCoords: newNodes,
        links: newLinks,
        nodeIds: newNodeIds,
        nodeNeighbors: newNodeNeighbors,
        nodeTables: newNodeTables,
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
        var newNodeNeighbors = this.state.nodeNeighbors
        var newNodeTables = this.state.nodeTables
        newNodeNeighbors[start] = {...newNodeNeighbors[start], [clickedId]: 10}
        newNodeNeighbors[clickedId] = {...newNodeNeighbors[clickedId], [start]: 10}
        
        Object.entries(newNodeNeighbors).forEach(([k,v]) => {
            var newNeighbors = {}
            Object.entries(v).forEach(([k,v]) => {
                newNeighbors = {...newNeighbors, [k]: v}
            })
            if (k in this.state.nodeTables) {
              newNodeTables = {...newNodeTables, [k]: newNeighbors}
            }
        })

        this.setState({
          nodeNeighbors: newNodeNeighbors,
          nodeTables: newNodeTables,
          links: newLinks,
        })
      }
    }
  }

  onLinkClick = (e) => {
    if (this.state.removeLinkActive) {
      var newLinks = {}
      var newNodeNeighbors = {}
      var newNodeTables = {}
      var deletedLinkStartingNode = 0
      var deletedLinkEndingNode = 0

      Object.entries(this.state.links).forEach(([k,v]) => {
        if (k!=e.target.id) {
          newLinks = {...newLinks, [k]: {start:v.start, end:v.end, val:v.val}}
        } else {
          deletedLinkStartingNode = v.start
          deletedLinkEndingNode = v.end
        }
      })

      Object.entries(this.state.nodeNeighbors).forEach(([k,v]) => {
        var newNeighbors = {}
        if (k==deletedLinkStartingNode) {
          Object.entries(v).forEach(([k,v]) => {
            if (k!=deletedLinkEndingNode) {
              newNeighbors = {...newNeighbors, [k]: v}
            }
          })
          newNodeNeighbors = {...newNodeNeighbors, [k]: newNeighbors}
          if (k in this.state.nodeTables) {
            newNodeTables = {...newNodeTables, [k]: newNeighbors}
          }
        } else if (k==deletedLinkEndingNode) {
          Object.entries(v).forEach(([k,v]) => {
            if (k!=deletedLinkStartingNode) {
              newNeighbors = {...newNeighbors, [k]: v}
            }
          })
          newNodeNeighbors = {...newNodeNeighbors, [k]: newNeighbors}
          if (k in this.state.nodeTables) {
            newNodeTables = {...newNodeTables, [k]: newNeighbors}
          }        
        } else {
          Object.entries(v).forEach(([k,v]) => {
              newNeighbors = {...newNeighbors, [k]: v}
          })
          newNodeNeighbors = {...newNodeNeighbors, [k]: newNeighbors}
          if (k in this.state.nodeTables) {
            newNodeTables = {...newNodeTables, [k]: newNeighbors}
          }
        }
      })

      this.setState({
        links: newLinks,
        nodeNeighbors: newNodeNeighbors,
        nodeTables: newNodeTables,
      })
    }    

    
  }

  onLinkValChange = (e) => {
    var clickedId = parseInt(e.target.id)
    const re = /^[0-9\b]+$/;
    if ((e.target.value === '' || re.test(e.target.value)) && e.target.value.toString().length<4) {
      var newLinks = this.state.links
      var newNodeNeighbors = this.state.nodeNeighbors
      var newNodeTables = {}
      var startNode = this.state.links[clickedId].start
      var endNode = this.state.links[clickedId].end
      var newBw = parseInt(e.target.value)
      if (isNaN(newBw)) {
        newBw = 0
      }
      newLinks[clickedId].val = e.target.value
      newNodeNeighbors[startNode][endNode] = newBw
      newNodeNeighbors[endNode][startNode] = newBw

      Object.entries(newNodeNeighbors).forEach(([k,v]) => {
        var newNeighbors = {}
        Object.entries(v).forEach(([k,v]) => {
            newNeighbors = {...newNeighbors, [k]: v}
        })
        if (k in this.state.nodeTables) {
          newNodeTables = {...newNodeTables, [k]: newNeighbors}
        }
      })

      this.setState({
        nodeNeighbors: newNodeNeighbors,
        nodeTables: newNodeTables,
        links: newLinks,
      })
    }
  }
  
  onOpenNodeTable = (e) => {
    this.setState({nodeTables: {...this.state.nodeTables, [e.target.id]: this.state.nodeNeighbors[e.target.id]}})
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
    this.setState({
      mousex: e.clientX,
      mousey: e.clientY
    }) 
  }

  onStepTimeForward = (e) => {
    if (this.state.packetOrderCurrIndex<this.state.nodeIds.length-1) {
      this.setState({packetOrderCurrIndex: ++this.state.packetOrderCurrIndex})
    } else {
      this.setState({packetOrderCurrIndex: 0})
    }
  }

  render() {
    return (
      <div style={{display:'flex'}}>
        <Menu 
          selected={this.state.packetOrderCurrIndex}
          nodeIds={this.state.nodeIds}
          onChangeNodeList={({ oldIndex, newIndex }) => {this.setState({nodeIds: arrayMove(this.state.nodeIds, oldIndex, newIndex)})}}
          onAddNode={this.onAddNode} 
          onRemoveNode={this.onRemoveNode}
          onRemoveLink={this.onRemoveLink}
          onAddLink={this.onAddLink}
          onStepTimeForward={this.onStepTimeForward}
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