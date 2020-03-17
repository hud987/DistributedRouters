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
          height: "99vh",
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
          <Button 
            style={{backgroundColor: 'white', color: 'black'}} 
            onClick={this.props.onAddNode}
          >
            Add Node
          </Button>
          <Button 
            style={{backgroundColor: 'white', color: 'black',}} 
            disabled={this.props.removeNodeActive}
            onClick={this.props.onRemoveNode}
          >
            Remove Node
          </Button>
          <Button 
            style={{backgroundColor: 'white', color: 'black',}} 
            disabled={true}
            onClick={this.props.onRemoveNode}
          >
            Kill Node
          </Button>
          <Button 
            style={{backgroundColor: 'white', color: 'black',}}
            disabled={this.props.addLinkActive}
            onClick={this.props.onAddLink}
          >
            Add Link
          </Button>
          <Button 
            style={{backgroundColor: 'white', color: 'black',}}
            disabled={this.props.removeLinkActive}
            onClick={this.props.onRemoveLink}
          >
            Remove Link
          </Button>
          <div style={{
            paddingTop: 100,
            width: 300,
            fontSize: 30,
          }}>
            Messaging Order
          </div>
            <NodeList  selected={this.props.selected} nodeIds={this.props.nodeIds} onChangeNodeList={this.props.onChangeNodeList}/>
          <div>
          <Button 
            style={{width: 270/4, backgroundColor: 'white', color: 'black',}} 
            disabled
          >
            -
          </Button>
          <Button 
            style={{width: 270/4, backgroundColor: 'white', color: 'black',}}
            onClick={this.props.onStepTimeForward}  
          >
            >
          </Button>
          <Button 
            style={{width: 270/4, backgroundColor: 'white', color: 'black',}} 
            disabled
          >
            >>
          </Button>
          <Button 
            style={{width: 270/4, backgroundColor: 'white', color: 'black',}} 
            disabled
          >
            >>>
          </Button>
          </div>
      </div>
  )}
}