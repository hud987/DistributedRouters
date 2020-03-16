import React, { Component } from 'react';
//import Draggable from 'react-draggable';

export default class Node extends Component {
  state = {
    x: this.props.x,
    y: this.props.y,
    strokeColor: 'black'
  } 
  reff = React.createRef();     
  contextTrigger = null;

  componentDidMount() {
    this.pos1 = 0
    this.pos2 = 0
    this.pos3 = 0
    this.pos4 = 0
  }

  onMouseOver = (e) => {
    if (this.props.removeNodeActive) {
      this.setState({strokeColor: 'red'})
    } else if (this.props.addLinkActive ) {
      this.setState({strokeColor: 'green'})
    }
  }

  onMouseOut = (e) => {
    this.setState({strokeColor: 'black'})
  }

  render() {
    return (
      <div style={{position: 'absolute'}}>

          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '80px',
              height: '80px',
              backgroundColor: 'blue',
              borderColor: this.state.strokeColor,
              border: '3.5px solid',
              borderRadius: "45px",
              left: this.props.x, 
              top: this.props.y,
              position: 'absolute',
            }}
            className={"handle"}
            id={this.props.id}
            onClick={this.props.onClick}
            onMouseDown={this.props.dragMouseDown}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            onClick={this.props.onClick}
            ref={this.reff}
          >
            <div
              id={this.props.id} 
              style={{
              paddingBottom: "5px",
              fontSize: '30px',
              pointerEvents: "none",
            }}>
              { this.props.id }
            </div>
          </div>

      </div>
  )}
}

