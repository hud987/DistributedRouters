import React, { Component } from 'react';
import { Button } from 'reactstrap'
import NodeList from './NodeList'

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
          backgroundColor: 'gray',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          padding: 6
        }}
      >
          <div style={{
            width: 300,
            fontSize: 30,
          }}>
            Distributed Routers
          </div>
          <div style={{display: 'flex'}}>
            <Button 
              style={{backgroundColor: 'white', color: 'black', flex: 1}} 
              onClick={this.props.onAddNode}
            >
              Add Node
            </Button>
            <Button 
              style={{backgroundColor: 'white', color: 'black', flex: 1}} 
              disabled={this.props.removeNodeActive}
              onClick={this.props.onRemoveNode}
            >
              Remove Node
            </Button>
          </div>
          <div style={{display: 'flex'}}>
            <Button 
              style={{backgroundColor: 'white', color: 'black', flex: 1}} 
              disabled={this.props.killNodeActive}
              onClick={this.props.onKillNode}
            >
              Kill Node
            </Button>
            <Button 
              style={{backgroundColor: 'white', color: 'black', flex: 1}} 
              disabled={this.props.reviveNodeActive}
              onClick={this.props.onReviveNode}
            >
              Revive Node
            </Button>
          </div>
          <div style={{display: 'flex'}}>
            <Button 
              style={{backgroundColor: 'white', color: 'black', flex: 1}}
              disabled={this.props.addLinkActive}
              onClick={this.props.onAddLink}
            >
              Add Link
            </Button>
            <Button 
              style={{backgroundColor: 'white', color: 'black', flex: 1}}
              disabled={this.props.removeLinkActive}
              onClick={this.props.onRemoveLink}
            >
              Remove Link
            </Button>
          </div>
          <div style={{display: 'flex'}}>
            <Button 
              style={{backgroundColor: 'white', color: 'black', flex: 1}} 
              disabled={this.props.killLinkActive}
              onClick={this.props.onKillLink}
            >
              Kill Link
            </Button>
            <Button 
              style={{backgroundColor: 'white', color: 'black', flex: 1}} 
              disabled={this.props.reviveLinkActive}
              onClick={this.props.onReviveLink}
            >
              Revive Link
            </Button>
          </div>
          <Button 
            style={{backgroundColor: 'white', color: 'black',}}
            onClick={this.props.onToggleAllTables}
          >
            {this.props.toggleAllTablesLabel}
          </Button>
          {//forced update, split horizon
          }
          <div style={{
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
            style={{width: 270/4, backgroundColor: 'white', color: 'black',}}
            onClick={this.props.onStepTimeForwardOnce}  
          >
            >
          </Button>
          <Button 
            style={{width: 270/4, backgroundColor: 'white', color: 'black',}} 
            onClick={this.props.onStepTimeForwardLoop}  
          >
            >>
          </Button>
          <Button 
            style={{width: 270/4, backgroundColor: 'white', color: 'black',}} 
            onClick={this.props.onStepTimeForwardSteady}
          >
            >>>
          </Button>
          </div>
      </div>
  )}
}