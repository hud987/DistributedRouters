import React, { Component } from 'react';
//import Draggable from 'react-draggable';

export default class Node extends Component {
  state = {
    x: this.props.x,
    y: this.props.y,
    strokeColor: 'black'
  } 

  onMouseOver = (e) => {
    if (this.props.removeNodeActive || (this.props.killNodeActive && this.props.alive)) {
      this.setState({strokeColor: 'red'})
    }
    else if (this.props.addLinkActive || (this.props.reviveNodeActive && !this.props.alive)) {
      this.setState({strokeColor: 'green'})
    }
  }

  onMouseOut = (e) => {
    if (this.props.alive) {
      this.setState({strokeColor: 'black'})
    } else {
      this.setState({strokeColor: '#999999'})
    }
  }

  render() {
    var innerColor = 'blue'
    var textColor = 'black'
    if (!this.props.alive) {
      innerColor = '#a6b8ff'
      textColor = '#999999'
    }
    return (
      <div style={{color: textColor, position: 'absolute'}}>

          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '80px',
              height: '80px',
              backgroundColor: innerColor,
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

