import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { arrayMove } from 'react-movable';

import NodeMap from './NodeMap'
import Menu from './Menu'

export default class DistributedRouter extends Component {
  state = {  
    nodeCoords: {
      0: {x: 200, y: 200},
      1: {x: 450, y: 200},
      2: {x: 200, y: 450},
      3: {x: 450, y: 450},
    },
    links: {
      0: {start: 0,end: 1, val: 10},
      1: {start: 1,end: 3, val: 20},
      2: {start: 3,end: 2, val: 30},
      3: {start: 2,end: 0, val: 40},
    },
    nodeNeighbors: {
      0: {1:10, 2:40},
      1: {0:10, 3:20},
      2: {0:40, 3:30},
      3: {1:20, 2:30},
    },
    nodeNextHopsBws: {
      /*0: {1:[1,10],2:[1,80]},
      1: {0:[0,10],3:[0,120]},
      2: {0:[0,40],3:[0,330]},
      3: {1:[1,20],2:[1,430]},*/
      0: {1:[1,10],2:[2,40]},
      1: {0:[0,10],3:[3,20]},
      2: {0:[0,40],3:[3,30]},
      3: {1:[1,20],2:[2,30]},
    },
    nodeDestPathCosts: {
      /*0: {1:[[1,],10],2:[[2,3,1],80]},
      1: {0:[[0,],10],3:[[3,2,0],120]},
      2: {0:[[0,],40],3:[[3,1,0],330]},
      3: {1:[[1,],20],2:[[2,0,1],430]},*/
      0: {1:[[1,],10],2:[[2,],40]},
      1: {0:[[0,],10],3:[[3,],20]},
      2: {0:[[0,],40],3:[[3,],30]},
      3: {1:[[1,],20],2:[[2,],30]},
    },
    aliveNodes: {0:0,1:0,2:0,3:0},
    aliveLinks: {0:0,1:0,2:0,3:0},
    linkStrokes: {0:'black',1:'black',2:'black',3:'black'},
    nodeTables: {},
    nodePathTables: {},
    nodeIds: [0, 1, 2, 3],
    removeNodeActive: false,
    killNodeActive: false,
    reviveNodeActive: false,
    removeLinkActive: false,
    killLinkActive: false,
    reviveLinkActive: false,
    addLinkStartActive: false,
    addLinkEndActive: false,
    addLinkActive: false,
    splitHorizonActive: true,
    forcedUpdateActive: true,
    pathUpdateActive: false,
    nextHopActive: false,
    pathsActive: true,
    packetOrderCurrIndex: 0,
    mousex: 0,
    mousey: 0,
    toggleAllTablesLabel: 'Show All',
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
  }

  onAddNode = () => {
    var arr = Object.entries(this.state.nodeCoords)
    var idOfNewNode = 0
    var newNodeIds = this.state.nodeIds

    if (arr.length<8) {
      for (var i=0;i<=arr.length;i++) {
        if (!(i in this.state.nodeCoords)) {
          idOfNewNode = i
          break
        }
      }

      newNodeIds.push(idOfNewNode)
      var newNodeNextHopsBws = {...this.state.nodeNextHopsBws, [idOfNewNode]: {}}
      var newNodeDestPathCosts = {...this.state.nodeDestPathCosts, [idOfNewNode]: {}}
      var newNodeTables = this.updateNodeTables(newNodeNextHopsBws)
      var newNodePathTables = this.updateNodePathTables(newNodeDestPathCosts)

      this.setState({ 
        aliveNodes: {...this.state.aliveNodes, [idOfNewNode]: 0},
        nodeNextHopsBws: newNodeNextHopsBws, 
        nodeDestPathCosts: newNodeDestPathCosts, 
        nodeNeighbors: {...this.state.nodeNeighbors, [idOfNewNode]: {}},
        nodeCoords: {...this.state.nodeCoords,[idOfNewNode]: {x: 14, y: 14} }, 
        nodeIds: newNodeIds,
        nodeTables: newNodeTables,
        nodePathTables: newNodePathTables,
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

  onKillNode = () => {
    this.setState({killNodeActive: true})
    document.addEventListener('click', this.endKillNode);
  }

  endKillNode = () => {
    this.setState({killNodeActive: false})
    document.removeEventListener('click', this.endKillNode);
  }

  onReviveNode = () => {
    this.setState({reviveNodeActive: true})
    document.addEventListener('click', this.endReviveNode);
  }

  endReviveNode = () => {
    this.setState({reviveNodeActive: false})
    document.removeEventListener('click', this.endReviveNode);
  }

  onAddLink = () => {
    this.setState({
      addLinkStartActive: true
    })
    document.addEventListener('click', this.cancelAddLink);
  }

  cancelAddLink = () => {
    this.setState({
      addLinkStartActive: false, 
    })
    document.removeEventListener('click', this.cancelAddLink);
  }

  continueAddLink = () => {
    this.setState({
      addLinkEndActive: true
    })
    document.addEventListener('click', this.endAddLink);
  }

  endAddLink = () => {
    this.setState({
      addLinkEndActive: false
    })
    document.removeEventListener('click', this.endAddLink);
    //delete link connected to mouse
    var newLinks={}
    var newAliveLinks={}
    Object.entries(this.state.links).forEach(([k,v]) => {
      if (k!=100) {
        newLinks = {...newLinks, [k]: {start:v.start, end:v.end, val:v.val}}
        if (k in this.state.aliveLinks) {
          newAliveLinks = {...newAliveLinks, [k]: 0}
        }
      } 
    })
    this.setState({
      links: newLinks,
      aliveLinks: newAliveLinks,
    })
  }

  onRemoveLink = () => {
    this.setState({removeLinkActive: true})
    document.addEventListener('click', this.endRemoveLink);
  }

  endRemoveLink = () => {
    this.setState({removeLinkActive: false})
    document.removeEventListener('click', this.endRemoveLink);
  }

  onKillLink = () => {
    this.setState({killLinkActive: true})
    document.addEventListener('click', this.endKillLink);
  }

  endKillLink = () => {
    this.setState({killLinkActive: false})
    document.removeEventListener('click', this.endKillLink);
  }

  onReviveLink = () => {
    this.setState({reviveLinkActive: true})
    document.addEventListener('click', this.endReviveLink);
  }  

  endReviveLink = () => {
    this.setState({reviveLinkActive: false})
    document.removeEventListener('click', this.endReviveLink);
  }

  onNodeClick = (e) => {
    var clickedId = parseInt(e.target.id)
    if (this.state.removeNodeActive) {
      var newLinks = {}
      var newNodes = {}
      var newNodeNeighbors = {}
      var newNodeNextHopsBws = {}
      var newNodeDestPathCosts = {}
      var newNodeTables = {}
      var newNodePathTables = {}
      var newNodeIds = this.state.nodeIds

      this.state.nodeIds.forEach((id,i) => {
        if (id==e.target.id){
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
        }
      })

      Object.entries(this.state.nodeNextHopsBws).forEach(([k,v]) => {
        if (k!=clickedId) {
          var newNextHopsBws = {}
          Object.entries(v).forEach(([k,v]) => {
            if (k!=clickedId) {
              newNextHopsBws = {...newNextHopsBws, [k]: v}
            }
          })
          newNodeNextHopsBws = {...newNodeNextHopsBws, [k]: newNextHopsBws}
          if (k in this.state.nodeTables){
            newNodeTables = {...newNodeTables, [k]: newNextHopsBws}
          }
        }
      })

      Object.entries(this.state.nodeDestPathCosts).forEach(([k,v]) => {
        if (k!=clickedId) {
          var newDestPathCosts = {}
          Object.entries(v).forEach(([k,v]) => {
            if (k!=clickedId) {
              newDestPathCosts = {...newDestPathCosts, [k]: v}
            }
          })
          newNodeDestPathCosts = {...newNodeDestPathCosts, [k]: newDestPathCosts}
          if (k in this.state.nodeTables){
            newNodePathTables = {...newNodePathTables, [k]: newDestPathCosts}
          }
        }
      })

      this.setState({
        nodeCoords: newNodes,
        links: newLinks,
        nodeIds: newNodeIds,
        nodeNeighbors: newNodeNeighbors,
        nodeNextHopsBws: newNodeNextHopsBws,
        nodeDestPathCosts: newNodeDestPathCosts,
        nodeTables: newNodeTables,
        nodePathTables: newNodePathTables
      })
    } else if (this.state.addLinkStartActive) {
      var arr = Object.entries(this.state.links)
      this.setState({ 
        links: {...this.state.links,[100]: {start: clickedId, end: -1,val: -1} },
        aliveLinks: {...this.state.aliveLinks,[100]:0 },
        linkStrokes: {...this.state.linkStrokes, [100]: 'black'}, 
      });
      this.continueAddLink()
    } else if (this.state.addLinkEndActive) {
      var newLinks = this.state.links
      var newLinkId
      var start=0
      var validNodeClicked=true
      var len=0

      Object.entries(this.state.links).forEach(([k,v]) => {
        len++
        if (v.end==-1) {
          start = v.start
          if (start==e.target.id){
            validNodeClicked=false
          }
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
            newLinkId = i
            break
          }
        }
        var newNodeNeighbors = this.state.nodeNeighbors
        var newNodeNextHopsBws = this.state.nodeNextHopsBws
        var newNodeDestPathCosts = this.state.nodeDestPathCosts
        
        newNodeNeighbors[start] = {...newNodeNeighbors[start], [clickedId]: 10}
        newNodeNeighbors[clickedId] = {...newNodeNeighbors[clickedId], [start]: 10}
        
        newNodeNextHopsBws[start] = {...newNodeNextHopsBws[start], [clickedId]: [clickedId, 10]}
        newNodeNextHopsBws[clickedId] = {...newNodeNextHopsBws[clickedId], [start]: [start, 10]}

        newNodeDestPathCosts[start] = {...newNodeDestPathCosts[start], [clickedId]: [[clickedId], 10]}
        newNodeDestPathCosts[clickedId] = {...newNodeDestPathCosts[clickedId], [start]: [[start], 10]}

        var newNodeTables = this.updateNodeTables(newNodeNextHopsBws)
        var newNodePathTables = this.updateNodePathTables(newNodeDestPathCosts)
        
        console.log(this.state.aliveLinks)
        console.log({...this.state.aliveLinks, [newLinkId]: 0})
        console.log(this.state.links)
        console.log({...this.state.links,[newLinkId]: {start: start, end: clickedId, val: 10}})
        this.setState({
          aliveLinks: {...this.state.aliveLinks, [newLinkId]: 0},
          nodeNextHopsBws: newNodeNextHopsBws,
          nodeDestPathCosts: newNodeDestPathCosts,
          nodeNeighbors: newNodeNeighbors,
          nodeTables: newNodeTables,
          nodePathTables: newNodePathTables,
          links: {...this.state.links,[newLinkId]: {start: start, end: clickedId, val: 10}},
          linkStrokes: {...this.state.linkStrokes, [newLinkId]: 'black'},
        })
      }
    } else if (this.state.killNodeActive && clickedId in this.state.aliveNodes) {
      var newAliveNodes = {}
      var newAliveLinks = {}
      var newLinkStrokes = this.state.linkStrokes
      var newlyKilledLinks = {}
      var newNodeNeighbors = this.state.nodeNeighbors
      var newNodeNextHopsBws = {}
      var newNodeDestPathCosts = {}
      var newNodeIds = this.state.nodeIds

      Object.entries(this.state.aliveNodes).forEach(([k,v]) => {
        if (k!=clickedId) {
          newAliveNodes = {...newAliveNodes, [k]:v}
        } 
      })

      Object.entries(this.state.links).forEach(([k,v]) => {
        if (v.start==clickedId) {
          newNodeNeighbors = this.deleteLinkFromMap(newNodeNeighbors,v.start,v.end)
          newlyKilledLinks[k] = 0
          newLinkStrokes[k] = '#999999'
        } else if (v.end==clickedId) {
          newNodeNeighbors = this.deleteLinkFromMap(newNodeNeighbors,v.start,v.end)
          newlyKilledLinks[k] = 0
          newLinkStrokes[k] = '#999999'
        }
      })    
 
      Object.entries(this.state.aliveLinks).forEach(([k,v]) => {
        if (!(k in newlyKilledLinks)) {
          newAliveLinks = {...newAliveLinks, [k]:v}
        } 
      })

      Object.entries(this.state.nodeNextHopsBws).forEach(([k,v]) => {
        if (k!=clickedId) {
          if (e.target.id in v && k in this.state.nodeNeighbors[e.target.id]){
            v[e.target.id] = ['-','Inf']
          }
          var killedNodeInNeighborNodePath = false
          Object.entries(this.state.nodeDestPathCosts[k]).forEach(e => {
            killedNodeInNeighborNodePath = false
            //console.log(e)
            if (e[0]!=clickedId) {
              console.log(e[1][0])
              e[1][0].forEach(e => {
                console.log(e)
                if (e==clickedId) {
                  killedNodeInNeighborNodePath = true
                }
              })
            }
            if (killedNodeInNeighborNodePath){
              v[e[0]] = [['-'],'Inf']
            } 
          })
          newNodeNextHopsBws = {...newNodeNextHopsBws, [k]:v}
        } else {
          newNodeNextHopsBws = {...newNodeNextHopsBws, [k]:{}}
        }
      })

      Object.entries(this.state.nodeDestPathCosts).forEach(([k,v]) => {
        if (k!=clickedId) {
          if (e.target.id in v && k in this.state.nodeNeighbors[e.target.id]){
            v[e.target.id] = [['-'],'Inf']
          } 
          console.log('k: ' + k + ', e.target.id: ' + e.target.id)
          var killedNodeInNeighborNodePath = false
          Object.entries(v).forEach(e => {
            killedNodeInNeighborNodePath = false
            //console.log(e)
            if (e[0]!=clickedId) {
              console.log(e[1][0])
              e[1][0].forEach(e => {
                console.log(e)
                if (e==clickedId) {
                  killedNodeInNeighborNodePath = true
                }
              })
            }
            if (killedNodeInNeighborNodePath){
              v[e[0]] = [['-'],'Inf']
            } 
          })
          
          newNodeDestPathCosts = {...newNodeDestPathCosts, [k]:v}
        } else {
          newNodeDestPathCosts = {...newNodeDestPathCosts, [k]:{}}
        }
      })
      

      var newNodeTables = this.updateNodeTables(newNodeNextHopsBws)
      var newNodePathTables = this.updateNodeTables(newNodeDestPathCosts)

      this.state.nodeIds.forEach((id,i) => {
        if (id==e.target.id){
          newNodeIds.splice(i,1)
        }
      })

      Object.entries(this.state.aliveNodes).forEach(([k,v]) => {
        if (k!=clickedId) {
          newAliveNodes = {...newAliveNodes, [k]:v}
        } 
      })

      this.setState({
        aliveLinks: newAliveLinks,
        nodeNextHopsBws: newNodeNextHopsBws,
        nodeDestPathCosts: newNodeDestPathCosts,
        nodeNeighbors: newNodeNeighbors,
        nodeTables: newNodeTables,
        nodePathTables: newNodePathTables,
        aliveNodes: newAliveNodes,
        linkStrokes: newLinkStrokes,
        nodeIds: newNodeIds,
      })
    } else if (this.state.reviveNodeActive && !(clickedId in this.state.aliveNodes)) {
      var newLinkStrokes = this.state.linkStrokes
      var newNodeNeighbors = this.state.nodeNeighbors
      var newNodeNextHopsBws = this.state.nodeNextHopsBws
      var newNodeDestPathCosts = this.state.nodeDestPathCosts
      var newAliveLinks = this.state.aliveLinks
      var newNodeIds = this.state.nodeIds
      newNodeIds.push(e.target.id)

      Object.entries(this.state.links).forEach(([k,v]) => {
        if (v.start==e.target.id || v.end==e.target.id) {
          newNodeNeighbors[v.start] = {...newNodeNeighbors[v.start], [v.end]:v.val}
          newNodeNeighbors[v.end] = {...newNodeNeighbors[v.end], [v.start]:v.val}
          newNodeNextHopsBws[v.start] = {...newNodeNextHopsBws[v.start], [v.end]:[v.end,v.val]}
          newNodeNextHopsBws[v.end] = {...newNodeNextHopsBws[v.end], [v.start]:[v.start,v.val]}
          newNodeDestPathCosts[v.start] = {...newNodeDestPathCosts[v.start], [v.end]:[[v.end],v.val]}
          newNodeDestPathCosts[v.end] = {...newNodeDestPathCosts[v.end], [v.start]:[[v.start],v.val]}
          if (!(k in this.state.aliveLinks)){
            newAliveLinks = {...newAliveLinks, [k]: 0}
          }
          newLinkStrokes[k] = 'black'
        } 
      })  
      var newNodeTables = this.updateNodeTables(newNodeNextHopsBws)
      var newNodePathTables = this.updateNodePathTables(newNodeDestPathCosts)

      this.setState({
        aliveLinks: newAliveLinks,
        nodeNextHopsBws: newNodeNextHopsBws,
        nodeDestPathCosts: newNodeDestPathCosts,
        nodeTables: newNodeTables,
        nodePathTables: newNodePathTables,
        nodeNeighbors: newNodeNeighbors,
        linkStrokes: newLinkStrokes,
        aliveNodes: {...this.state.aliveNodes, [e.target.id]:0},
        nodeIds: newNodeIds,
      })
    }
  }

  onLinkClick = (e) => {
    if (this.state.removeLinkActive) {
      var newLinks = {}
      var newAliveLinks = {}
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

      Object.entries(this.state.aliveLinks).forEach(([k,v]) => {
        if (k!=e.target.id) {
          newAliveLinks = {...newAliveLinks, [k]: v}
        } 
      })

      var newNodeNeighbors = this.deleteLinkFromMap(this.state.nodeNeighbors,deletedLinkStartingNode,deletedLinkEndingNode)
      var newNodeNextHopsBws = this.deleteLinkFromMap(this.state.nodeNextHopsBws,deletedLinkStartingNode,deletedLinkEndingNode)
      var newNodeDestPathCosts = this.deleteLinkFromMap(this.state.nodeDestPathCosts,deletedLinkStartingNode,deletedLinkEndingNode)
      var newNodeTables = this.updateNodeTables(newNodeNextHopsBws)
      var newNodePathTables = this.updateNodeTables(newNodeDestPathCosts)

      this.setState({
        nodeNeighbors: newNodeNeighbors,
        nodeNextHopsBws: newNodeNextHopsBws,
        nodeDestPathCosts: newNodeDestPathCosts,
        nodeTables: newNodeTables,
        nodePathTables: newNodePathTables,
        aliveLinks: newAliveLinks,
        links: newLinks,
      })
    } else if (this.state.killLinkActive && e.target.id in this.state.aliveLinks) {
      var killedLinkStartingNode = this.state.links[e.target.id].start
      var killedLinkEndingNode = this.state.links[e.target.id].end
      var newAliveLinks = {}

      Object.entries(this.state.aliveLinks).forEach(([k,v]) => {
        if (k!=e.target.id) {
          newAliveLinks = {...newAliveLinks, [k]: v}
        } 
      })

      var newNodeNeighbors = this.deleteLinkFromMap(this.state.nodeNeighbors,killedLinkStartingNode,killedLinkEndingNode)
      var newNodeNextHopsBws = this.state.nodeNextHopsBws
      var newNodeDestPathCosts = this.state.nodeDestPathCosts
      newNodeNextHopsBws[killedLinkStartingNode][killedLinkEndingNode] = ['-','Inf']
      newNodeNextHopsBws[killedLinkEndingNode][killedLinkStartingNode] = ['-','Inf']
      newNodeDestPathCosts[killedLinkStartingNode][killedLinkEndingNode] = [['-'],'Inf']
      newNodeDestPathCosts[killedLinkEndingNode][killedLinkStartingNode] = [['-'],'Inf']

      var newNodeTables = this.updateNodeTables(newNodeNextHopsBws)
      var newNodePathTables = this.updateNodeTables(newNodeDestPathCosts)

      this.setState({
        nodeNeighbors: newNodeNeighbors,
        nodeNextHopsBws: newNodeNextHopsBws,
        nodeDestPathCosts: newNodePathTables,
        nodeTables: newNodeTables,
        nodePathTables: newNodePathTables,
        aliveLinks: newAliveLinks,
      })
    } else if (this.state.reviveLinkActive && !(e.target.id in this.state.aliveLinks) && this.state.links[e.target.id].start in this.state.aliveNodes && this.state.links[e.target.id].end in this.state.aliveNodes ) {
      var revivedLinkStartingNode = this.state.links[e.target.id].start
      var revivedLinkEndingNode = this.state.links[e.target.id].end
      var revivedLinkVal = this.state.links[e.target.id].val
      var newNodeNeighbors = this.state.nodeNeighbors
      var newNodeNextHopsBws = this.state.nodeNextHopsBws
      var newNodeDestPathCosts = this.state.nodeDestPathCosts
      var newAliveLinks = {}

      newNodeNeighbors[revivedLinkStartingNode] = {...this.state.nodeNeighbors[revivedLinkStartingNode],[revivedLinkEndingNode]: revivedLinkVal}
      newNodeNeighbors[revivedLinkEndingNode] = {...this.state.nodeNeighbors[revivedLinkEndingNode],[revivedLinkStartingNode]: revivedLinkVal}
      newNodeNextHopsBws[revivedLinkStartingNode][revivedLinkEndingNode] = [revivedLinkStartingNode,revivedLinkVal]
      newNodeNextHopsBws[revivedLinkEndingNode][revivedLinkStartingNode] = [revivedLinkEndingNode,revivedLinkVal]
      newNodeDestPathCosts[revivedLinkStartingNode][revivedLinkEndingNode] = [[revivedLinkStartingNode],revivedLinkVal]
      newNodeDestPathCosts[revivedLinkEndingNode][revivedLinkStartingNode] = [[revivedLinkEndingNode],revivedLinkVal]
      
      var newNodeTables = this.updateNodeTables(newNodeNextHopsBws)
      var newNodePathTables = this.updateNodeTables(newNodeDestPathCosts)

      this.setState({
        nodeNeighbors: newNodeNeighbors,
        nodeNextHopsBws: newNodeNextHopsBws,
        nodeDestPathCosts: newNodeDestPathCosts,
        nodeTables: newNodeTables,
        nodePathTables: newNodePathTables,
        aliveLinks: {...this.state.aliveLinks, [e.target.id]: 0},
      })
    }
  }

  deleteLinkFromMap = (inputMap,deletedLinkStartingNode,deletedLinkEndingNode) => {
    var outputMap = {}
    Object.entries(inputMap).forEach(([k,v]) => {
      var newNeighbors = {}
      if (k==deletedLinkStartingNode) {
        Object.entries(v).forEach(([k,v]) => {
          if (k!=deletedLinkEndingNode) {
            newNeighbors = {...newNeighbors, [k]: v}
          }
        })
        outputMap = {...outputMap, [k]: newNeighbors}
      } else if (k==deletedLinkEndingNode) {
        Object.entries(v).forEach(([k,v]) => {
          if (k!=deletedLinkStartingNode) {
            newNeighbors = {...newNeighbors, [k]: v}
          }
        })
        outputMap = {...outputMap, [k]: newNeighbors}      
      } else {
        Object.entries(v).forEach(([k,v]) => {
            newNeighbors = {...newNeighbors, [k]: v}
        })
        outputMap = {...outputMap, [k]: newNeighbors}
      }
    })
    return outputMap
  }

  onLinkValChange = (e) => {
    var clickedId = parseInt(e.target.id)
    const re = /^[0-9\b]+$/;
    if ((e.target.value === '' || re.test(e.target.value)) && e.target.value.toString().length<4) {
      var newLinks = this.state.links
      var startNode = this.state.links[clickedId].start
      var endNode = this.state.links[clickedId].end
      var newBw = parseInt(e.target.value)
      var oldBw = parseInt(e.target.defaultValue);
      e.target.defaultValue = e.target.value;
      if (isNaN(newBw)) {
        newBw = 0
      }
      if (isNaN(oldBw)) {
        oldBw = 0
      }
      if (e.target.id in this.state.aliveLinks) {
        var newNodeNeighbors = this.state.nodeNeighbors
        newLinks[clickedId].val = e.target.value
        newNodeNeighbors[startNode][endNode] = newBw
        newNodeNeighbors[endNode][startNode] = newBw
        
        var newNodeNextHopsBws = this.state.nodeNextHopsBws
        var newNodeDestPathCosts = this.state.nodeDestPathCosts

        Object.entries(this.state.nodeNextHopsBws[startNode]).forEach(([k,v]) => {
          if (v[0]==endNode) {
            newNodeNextHopsBws[startNode][k] = [v[0],v[1]-oldBw+newBw]
            newNodeDestPathCosts[startNode][k] = [newNodeDestPathCosts[startNode][k][0],newNodeDestPathCosts[startNode][k][1]-oldBw+newBw]
          }
        })

        Object.entries(this.state.nodeNextHopsBws[endNode]).forEach(([k,v]) => {
          if (v[0]==startNode) {
            newNodeNextHopsBws[endNode][k] = [v[0],v[1]-oldBw+newBw]
            newNodeDestPathCosts[endNode][k] = [newNodeDestPathCosts[endNode][k][0],newNodeDestPathCosts[endNode][k][1]-oldBw+newBw]
          }
        })
        var newNodeTables = this.updateNodeTables(newNodeNextHopsBws)
        var newNodePathTables = this.updateNodePathTables(newNodeDestPathCosts)

        this.setState({
          nodeNeighbors: newNodeNeighbors,
          nodeNextHopsBws: newNodeNextHopsBws,
          nodeDestPathCosts: newNodeDestPathCosts,
          nodeTables: newNodeTables,
          nodePathTables: newNodePathTables,
          links: newLinks,
        })
      } else if (!(e.target.id in this.state.aliveLinks)) {
        newLinks[clickedId].val = e.target.value
        this.setState({
          links: newLinks,
        })
      }
    }
  }
  
  onOpenNodeTable = (e) => {
    var newLabel = 'Show All'
    if (Object.entries(this.state.nodeTables).length+1==Object.entries(this.state.nodeCoords).length) {
      newLabel = 'Hide All'
    }
    this.setState({
      nodeTables: {...this.state.nodeTables, [e.target.id]: this.state.nodeNextHopsBws[e.target.id]},
      nodePathTables: {...this.state.nodePathTables, [e.target.id]: this.state.nodeDestPathCosts[e.target.id]},
      toggleAllTablesLabel: newLabel,
    })

  }

  onCloseNodeTable = (e) => {
    var newNodeTables = {}
    var newNodePathTables = {}
    var newLabel = 'Show All'
    if (Object.entries(this.state.nodeTables).length-1==Object.entries(this.state.nodeCoords).length) {
      newLabel = 'Hide All'
    }
    Object.entries(this.state.nodeTables).forEach(([k,v]) => {
      if (k!=e.target.id) {
        newNodeTables = {...newNodeTables, [k]: v}
      }
    })
    Object.entries(this.state.nodePathTables).forEach(([k,v]) => {
      if (k!=e.target.id) {
        newNodePathTables = {...newNodePathTables, [k]: v}
      }
    })
    
    this.setState({
      nodeTables: newNodeTables,
      nodePathTables: newNodePathTables,
      toggleAllTablesLabel: newLabel,
    })
  }

  onMouseMove = (e) => {
    this.setState({
      mousex: e.clientX,
      mousey: e.clientY
    }) 
  }

  onStepTimeForwardOnce = (e) => {
    this.stepTimeForward(1)
  }

  onStepTimeForwardLoop = (e) => {
    this.stepTimeForward(this.state.nodeIds.length)
  }

  onStepTimeForwardSteadyState = (e) => {
    this.stepTimeForward(Math.pow(this.state.nodeIds.length,2))
  }

  stepTimeForward = (packetsSent) => { 
    var newNodeNextHopsBws = this.state.nodeNextHopsBws
    var newNodeDestPathCosts = this.state.nodeDestPathCosts
    var packetOrderCurrIndex = this.state.packetOrderCurrIndex
    if (this.state.nodeIds.length!=0) {
      for (var i=0;i<packetsSent;i++) {
        var nodeSendingPacket = this.state.nodeIds[packetOrderCurrIndex]
        if (packetOrderCurrIndex<this.state.nodeIds.length-1) {
          packetOrderCurrIndex++
        } else {
          packetOrderCurrIndex = 0
        }
        //console.log('sendingPacket')
        Object.entries(this.state.nodeNeighbors[nodeSendingPacket]).forEach(([k,v]) => {
          var nodeReceivingPacket = k
          if (!(nodeSendingPacket in this.state.nodeNextHopsBws[k])){
            newNodeNextHopsBws[k] = {...newNodeNextHopsBws[k], [nodeSendingPacket]: [nodeSendingPacket, v]}
            newNodeDestPathCosts[k] = {...newNodeDestPathCosts[k], [nodeSendingPacket]: [[nodeSendingPacket], v]}
          }
          Object.entries(this.state.nodeNextHopsBws[nodeSendingPacket]).forEach(([k1,v1]) => {
            var nodeEntryEditedInReceiving = k1
            if (!(k1 in this.state.nodeNextHopsBws[k]) && k1!=k){
              //console.log('added entry')
              //console.log(nodeSendingPacket)
              if (v1[1]=='Inf') {
                newNodeNextHopsBws[k] = {...newNodeNextHopsBws[k], [k1]: ['-', 'Inf']}
                newNodeDestPathCosts[k] = {...newNodeDestPathCosts[k], [k1]: [['-'], 'Inf']}
              } else {
                //console.log('nodeReceivingPacket: ' + nodeReceivingPacket + ', nodeEntryEditedInReceiving: ' + nodeEntryEditedInReceiving)
                Object.entries(newNodeDestPathCosts[nodeSendingPacket][nodeEntryEditedInReceiving]).forEach(e => {console.log(e)})
                //console.log(newNodeDestPathCosts[nodeReceivingPacket])
                newNodeNextHopsBws[k] = {...newNodeNextHopsBws[k], [k1]: [nodeSendingPacket, v1[1]+v]}
                newNodeDestPathCosts[k] = {...newNodeDestPathCosts[nodeReceivingPacket], [nodeEntryEditedInReceiving]: [[...newNodeDestPathCosts[nodeSendingPacket][nodeEntryEditedInReceiving][0],nodeSendingPacket], v1[1]+v]}
              }
            } else if (k1 in this.state.nodeNextHopsBws[k]) {
              var currentCost = this.state.nodeNextHopsBws[k][k1][1]
              var nextHopInReceiving = this.state.nodeNextHopsBws[k][k1][0]
              var nextHopInSending = v1[0]
              var nodeSendingPacketInReceivingNodePath = false
              //check if nodeSendingPacket is in receiving nodes Path
              //console.log('k: ' + k + ', k1: ' + k1)
              this.state.nodeDestPathCosts[k][k1][0].forEach(e => {
                //console.log(e)
                if (e==nodeSendingPacket) {
                  nodeSendingPacketInReceivingNodePath = true
                }
              })

              if (((v1[1]+v<currentCost || currentCost=='Inf') && (!this.state.splitHorizonActive || k!=nextHopInSending) && (!this.state.pathUpdateActive || !nodeSendingPacketInReceivingNodePath)) || (this.state.forcedUpdateActive && nodeSendingPacket==nextHopInReceiving)) {
                if (v1[1]=='Inf') {
                  newNodeNextHopsBws[k] = {...newNodeNextHopsBws[k], [k1]: ['-', v1[1]]}
                  newNodeDestPathCosts[k] = {...newNodeDestPathCosts[k], [k1]: [['-'], v1[1]]}
                } else {
                  newNodeNextHopsBws[k] = {...newNodeNextHopsBws[k], [k1]: [nodeSendingPacket, v1[1]+v]}
                  newNodeDestPathCosts[k] = {...newNodeDestPathCosts[k], [k1]: [[...newNodeDestPathCosts[nodeSendingPacket][nodeEntryEditedInReceiving][0],nodeSendingPacket], v1[1]+v]}
                }
              }
            }
          })
        })
      }
      var newNodeTables = this.updateNodeTables(newNodeNextHopsBws)
      //console.log(newNodeDestPathCosts)
      var newNodePathTables = this.updateNodeTables(newNodeDestPathCosts)
      var temp = this.state.nodeDestPathCosts
      
      this.setState({
        nodeNextHopsBws: newNodeNextHopsBws,
        nodeTables: newNodeTables,
        nodePathTables: newNodePathTables,
        packetOrderCurrIndex: packetOrderCurrIndex,
      })
    }
  }

  updateNodeTables = (newNodeNextHopsBws) => {
    var newNodeTables = {}
    Object.entries(newNodeNextHopsBws).forEach(([k,v]) => {
      var newNextHopsBws = {}
      Object.entries(v).forEach(([k,v]) => {
        newNextHopsBws = {...newNextHopsBws, [k]: v}
      })
      if (k in this.state.nodeTables) {
        newNodeTables = {...newNodeTables, [k]: newNextHopsBws}
      }
    })
    return newNodeTables
  }

    updateNodePathTables = (newNodeDestPathCosts) => {
    var newNodePathTables = {}
    Object.entries(newNodeDestPathCosts).forEach(([k,v]) => {
      var newDestPathCosts = {}
      Object.entries(v).forEach(([k,v]) => {
        newDestPathCosts = {...newDestPathCosts, [k]: v}
      })
      if (k in this.state.nodeTables) {
        newNodePathTables = {...newNodePathTables, [k]: newDestPathCosts}
      }
    })
    return newNodePathTables
  }

  onToggleAllTables = () => {
    var newNodeNextHopTables = {}
    var newNodePathTables = {}
    var newLabel = 'Show All'
    if (Object.entries(this.state.nodeTables).length<this.state.nodeIds.length) {
      Object.entries(this.state.nodeCoords).forEach(([id,v]) => {
        newNodeNextHopTables = {...newNodeNextHopTables, [id]: this.state.nodeNextHopsBws[id]}
      })
      Object.entries(this.state.nodeCoords).forEach(([id,v]) => {
        newNodePathTables = {...newNodePathTables, [id]: this.state.nodeDestPathCosts[id]}
      })
      newLabel = 'Hide All'
    }       
    this.setState({
      nodeTables: newNodeNextHopTables,
      nodePathTables: newNodePathTables,
      toggleAllTablesLabel: newLabel,
    })
    
  }

  onLinkMouseOver = (e) => {
    var newLinkStrokes = this.state.linkStrokes
    if (this.state.removeLinkActive || (this.state.killLinkActive && e.target.id in this.state.aliveLinks)) {
      newLinkStrokes[e.target.id] = 'red'
      this.setState({linkStroke: newLinkStrokes})
    } else if (this.state.reviveLinkActive && !(e.target.id in this.state.aliveLinks) && this.state.links[e.target.id].start in this.state.aliveNodes && this.state.links[e.target.id].end in this.state.aliveNodes) {
      newLinkStrokes[e.target.id] = 'green'
      this.setState({linkStroke: newLinkStrokes})
    }
  }

  onLinkMouseOut = (e) => {
    var newLinkStrokes = this.state.linkStrokes
    if (e.target.id in this.state.aliveLinks) {
      newLinkStrokes[e.target.id] = 'black'
      this.setState({linkStroke: newLinkStrokes})
    } else {
      newLinkStrokes[e.target.id] = '#999999'
      this.setState({linkStroke: newLinkStrokes})
    }
  }

  onChangeSplitHorizon = (e) => {
    this.setState({splitHorizonActive: !this.state.splitHorizonActive})
  }

  onChangeForcedUpdate = (e) => {
    this.setState({forcedUpdateActive: !this.state.forcedUpdateActive})
  }

  onChangePathUpdate = (e) => {
    this.setState({pathUpdateActive: !this.state.pathUpdateActive})
  }

  onChangeNextHop = (e) => {
    this.setState({
      nextHopActive: !this.state.nextHopActive,
      pathsActive: !this.state.pathsActive
    })
  }

  onChangePaths = (e) => {
    this.setState({
      pathsActive: !this.state.pathsActive,
      nextHopActive: !this.state.nextHopActive
    })
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
          onKillNode={this.onKillNode}
          onReviveNode={this.onReviveNode}
          onRemoveLink={this.onRemoveLink}
          onAddLink={this.onAddLink}
          onKillLink={this.onKillLink}
          onReviveLink={this.onReviveLink}
          onStepTimeForwardOnce={this.onStepTimeForwardOnce}
          onStepTimeForwardLoop={this.onStepTimeForwardLoop}
          onStepTimeForwardSteady={this.onStepTimeForwardSteadyState}
          onToggleAllTables={this.onToggleAllTables}
          toggleAllTablesLabel={this.state.toggleAllTablesLabel}
          removeNodeActive={this.state.removeNodeActive}
          killNodeActive={this.state.killNodeActive}
          reviveNodeActive={this.state.reviveNodeActive || Object.entries(this.state.aliveNodes).length==Object.entries(this.state.nodeCoords).length}
          removeLinkActive={this.state.removeLinkActive}
          addLinkActive={this.state.addLinkStartActive || this.state.addLinkEndActive}
          killLinkActive={this.state.killLinkActive}
          reviveLinkActive={this.state.reviveLinkActive || Object.entries(this.state.aliveLinks).length==Object.entries(this.state.links).length}
          onChangeSplitHorizon={this.onChangeSplitHorizon}
          onChangeForcedUpdate={this.onChangeForcedUpdate}
          onChangePathUpdate={this.onChangePathUpdate}
          onChangeNextHop={this.onChangeNextHop}
          onChangePaths={this.onChangePaths}
          forcedUpdateActive={this.state.forcedUpdateActive}
          splitHorizonActive={this.state.splitHorizonActive}
          pathUpdateActive={this.state.pathUpdateActive}
          nextHopActive={this.state.nextHopActive}
          pathsActive={this.state.pathsActive}
        />
        <NodeMap 
          nodeCoords={this.state.nodeCoords} 
          nodeTables={this.state.pathsActive ? this.state.nodePathTables : this.state.nodeTables}
          aliveNodes={this.state.aliveNodes}
          aliveLinks={this.state.aliveLinks}
          links={this.state.links}
          linkStrokes={this.state.linkStrokes}
          mousex={this.state.mousex}
          mousey={this.state.mousey}
          onNodeClick={this.onNodeClick}
          onLinkClick={this.onLinkClick}
          onLinkValChange={this.onLinkValChange}
          onLinkMouseOver={this.onLinkMouseOver}
          onLinkMouseOut={this.onLinkMouseOut}
          onOpenNodeTable={this.onOpenNodeTable}
          onCloseNodeTable={this.onCloseNodeTable}
          removeNodeActive={this.state.removeNodeActive}
          killNodeActive={this.state.killNodeActive}
          reviveNodeActive={this.state.reviveNodeActive}
          removeLinkActive={this.state.removeLinkActive}
          killLinkActive={this.state.killLinkActive}
          reviveLinkActive={this.state.reviveLinkActive}
          addLinkActive={this.state.addLinkStartActive || this.state.addLinkEndActive}
          pathsActive={this.state.pathsActive}
        />
      </div>
  )}
}