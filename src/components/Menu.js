import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap'
import NodeList from './NodeList'
import ReactTooltip from "react-tooltip";

export default class Menu extends Component {
  state = {   
    message: '',
    image: "",
  }

  componentDidMount() {

  }

  render() {
    return (
      <div
        style={{
          width: 300,
          height: "100vh",
          backgroundColor: '#5e5e5e',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          padding: 6
        }}
      > 
          <div style={{
            fontSize: 28,
            color: 'white',
          }}>
            Distributed Router Sim
          </div>
          <ReactTooltip />
          <div style={{display: 'flex'}}>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              onClick={this.props.onAddNode}
              data-tip="a new node appears in top left corner"
              data-place="right"
              data-delay-show='400'
            >
              Add Node
            </Button>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              disabled={this.props.removeNodeActive}
              onClick={this.props.onRemoveNode}
              data-tip="removes next node clicked"
              data-place="right"
              data-delay-show='400'
            >
              Remove Node
            </Button>
          </div>
          <div style={{display: 'flex'}}>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              disabled={this.props.killNodeActive}
              onClick={this.props.onKillNode}
              data-tip="kills next node clicked, stopping it from sending packets"
              data-place="right"
              data-delay-show='400'
            >
              Kill Node
            </Button>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              disabled={this.props.reviveNodeActive}
              onClick={this.props.onReviveNode}
              data-tip="revives next node clicked, sending packets again"
              data-place="right"
              data-delay-show='400'
            >
              Revive Node
            </Button>
          </div>
          <div style={{display: 'flex'}}>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              disabled={this.props.addLinkActive}
              onClick={this.props.onAddLink}
              data-tip="adds link between next two nodes clicked"
              data-place="right"
              data-delay-show='400'
            >
              Add Link
            </Button>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              disabled={this.props.removeLinkActive}
              onClick={this.props.onRemoveLink}
              data-tip="removes next link clicked"
              data-place="right"
              data-delay-show='400'
            >
              Remove Link
            </Button>
          </div>
          <div style={{display: 'flex'}}>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              disabled={this.props.killLinkActive}
              onClick={this.props.onKillLink}
              data-tip="kills next link clicked, stopping packets"
              data-place="right"
              data-delay-show='400'
            >
              Kill Link
            </Button>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              disabled={this.props.reviveLinkActive}
              onClick={this.props.onReviveLink}
              data-tip="revives next link clicked, allowing packets"
              data-place="right"
              data-delay-show='400'
            >
              Revive Link
            </Button>
          </div>
                    <div style={{display: 'flex'}}>
            <Button 
              style={{
                fontSize: 13,
                backgroundColor: this.props.splitHorizonActive ? '#363636' : 'transparent',
                border: this.props.splitHorizonActive ? 'solid 2px #363636' : 'solid 2px #444444', 
                color: this.props.splitHorizonActive ? 'white' : '#C6C6C6',
                flex: 1,
                margin: 4,}} 
              active={this.props.splitHorizonActive}
              onClick={this.props.onChangeSplitHorizon}
              data-tip="activates split horizon, forcing routers to ignore an entry in they are the next hop"
              data-place="right"
              data-delay-show='400'
            >
             Split Horizon
            </Button>
            <Button 
              style={{
                fontSize: 13,
                backgroundColor: this.props.forcedUpdateActive ? '#363636' : 'transparent',
                border: this.props.forcedUpdateActive ? 'solid 2px #363636' : 'solid 2px #444444', 
                color: this.props.forcedUpdateActive ? 'white' : '#C6C6C6',
                flex: 1,
                margin: 4,}} 
              active={this.props.forcedUpdateActive}
              onClick={this.props.onChangeForcedUpdate}
              data-tip="activates forced update, forcing routers to update an entry received from the next hop"
              data-place="right"
              data-delay-show='400'
            >
              Forced Update
            </Button>
            <Button 
              style={{
                fontSize: 13,
                backgroundColor: this.props.pathUpdateActive ? '#363636' : 'transparent',
                border: this.props.pathUpdateActive ? 'solid 2px #363636' : 'solid 2px #444444', 
                color: this.props.pathUpdateActive ? 'white' : '#C6C6C6',
                flex: 1,
                margin: 4,}} 
              active={this.props.pathUpdateActive}
              onClick={this.props.onChangePathUpdate}
              data-tip="activates forced update, forcing routers to ignore an entry in they are in the path"
              data-place="right"
              data-delay-show='400'
            >
              Path Update
            </Button>
          </div>
          <div>
            <Button 
                style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white',width:280,margin: 4,}} 
                onClick={this.props.onToggleAllTables}
                data-tip="toggles displaying all routing tables"
                data-place="right"
                data-delay-show='400'
            >
              {this.props.toggleAllTablesLabel}
            </Button>
          </div>
          <div style={{display: 'flex'}}>
            <Button 
               style={{
                backgroundColor: this.props.nextHopActive ? '#363636' : 'transparent',
                border: this.props.nextHopActive ? 'solid 2px #363636' : 'solid 2px #444444', 
                color: this.props.nextHopActive ? 'white' : '#C6C6C6',
                flex: 1,
                margin: 4,}} 
              active={this.props.nextHopActive}
              onClick={this.props.onChangeNextHop}
              data-tip="displays next hops in routing tables"
              data-place="right"
              data-delay-show='400'
            >
              Next Hop
            </Button>
            <Button 
               style={{
                backgroundColor: this.props.pathsActive ? '#363636' : 'transparent',
                border: this.props.pathsActive ? 'solid 2px #363636' : 'solid 2px #444444', 
                color: this.props.pathsActive ? 'white' : '#C6C6C6',
                flex: 1,
                margin: 4,}} 
              active={this.props.pathsActive}
              onClick={this.props.onChangePaths}
              data-tip="displays paths in routing tables"
              data-place="right"
              data-delay-show='400'
            >
              Paths
            </Button>
          </div>

          <div style={{
            color: 'white',
            paddingTop: 50,
            width: 300,
            fontSize: 30,
          }}>
            Messaging Order
          </div>
            <NodeList  selected={this.props.selected} nodeIds={this.props.nodeIds} onChangeNodeList={this.props.onChangeNodeList}/>
          <div>
          {/*
          <Button 
            style={{width: 270/4, backgroundColor: 'white', color: 'black',}} 
            disabled
          >
            -
          </Button>*/}
          <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              onClick={this.props.onStepTimeForwardOnce}  
              data-tip="sends a single packet from the marked node"
              data-place="right"
              data-delay-show='400'
          >
            Send One
          </Button>
          <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              onClick={this.props.onStepTimeForwardLoop}  
              data-tip="sends a single packet from all nodes in order"
              data-place="right"
              data-delay-show='400'
          >
            Send All
          </Button>
          <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              onClick={this.props.onStepTimeForwardSteady}
              data-tip="sends enough packets to achieve steady state"
              data-place="right"
              data-delay-show='400'
          >
            Steady
          </Button>
          </div>
          <div style={{paddingTop: 10,}}>
          <a style={{
            color: 'white',
            fontSize: 18,
            textDecorationLine: 'underline',
          }} href={'https://github.com/hud987/DistributedRouters'}>More Info</a>
          </div>
      </div>
  )}
}