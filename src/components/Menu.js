import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap'
import NodeList from './NodeList'
//import Switch from 'react-switch'

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
          <div style={{display: 'flex'}}>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              onClick={this.props.onAddNode}
            >
              Add Node
            </Button>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              disabled={this.props.removeNodeActive}
              onClick={this.props.onRemoveNode}
            >
              Remove Node
            </Button>
          </div>
          <div style={{display: 'flex'}}>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              disabled={this.props.killNodeActive}
              onClick={this.props.onKillNode}
            >
              Kill Node
            </Button>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              disabled={this.props.reviveNodeActive}
              onClick={this.props.onReviveNode}
            >
              Revive Node
            </Button>
          </div>
          <div style={{display: 'flex'}}>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              disabled={this.props.addLinkActive}
              onClick={this.props.onAddLink}
            >
              Add Link
            </Button>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              disabled={this.props.removeLinkActive}
              onClick={this.props.onRemoveLink}
            >
              Remove Link
            </Button>
          </div>
          <div style={{display: 'flex'}}>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              disabled={this.props.killLinkActive}
              onClick={this.props.onKillLink}
            >
              Kill Link
            </Button>
            <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              disabled={this.props.reviveLinkActive}
              onClick={this.props.onReviveLink}
            >
              Revive Link
            </Button>
          </div>
          <div>
            <Button 
                style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white',width:280,margin: 4,}} 
                onClick={this.props.onToggleAllTables}
            >
              {this.props.toggleAllTablesLabel}
            </Button>
          </div>
          <div style={{display: 'flex'}}>
            <Button 
              style={{
                backgroundColor: this.props.splitHorizonActive ? '#363636' : 'transparent',
                border: this.props.splitHorizonActive ? 'solid 2px #363636' : 'solid 2px #444444', 
                color: this.props.splitHorizonActive ? 'white' : '#C6C6C6',
                flex: 1,
                margin: 4,}} 
              active={this.props.splitHorizonActive}
              onClick={this.props.onChangeSplitHorizon}
            >
             Split Horizon
            </Button>
            <Button 
              style={{
                backgroundColor: this.props.forcedUpdateActive ? '#363636' : 'transparent',
                border: this.props.forcedUpdateActive ? 'solid 2px #363636' : 'solid 2px #444444', 
                color: this.props.forcedUpdateActive ? 'white' : '#C6C6C6',
                flex: 1,
                margin: 4,}} 
              active={this.props.forcedUpdateActive}
              onClick={this.props.onChangeForcedUpdate}
            >
              Forced Update
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
          >
            Send One
          </Button>
          <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              onClick={this.props.onStepTimeForwardLoop}  
          >
            Send All
          </Button>
          <Button 
              style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 
              onClick={this.props.onStepTimeForwardSteady}
          >
            Steady
          </Button>
          </div>
      </div>
  )}
}