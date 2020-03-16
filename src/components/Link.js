import React, { Component } from 'react';

export default class Node extends Component {
  state = {
    stroke: 'black'
  } 

  onMouseOver = (e) => {
    if (this.props.removeLinkActive) {
      this.setState({stroke: 'red'})
    }
  }

  onMouseOut = (e) => {
    this.setState({stroke: 'black'})
  }

  render() {
    return (
      <line 
        id={this.props.id}
        x1={this.props.x1}
        y1={this.props.y1} 
        x2={this.props.x2} 
        y2={this.props.y2}
        stroke={this.state.stroke}
        strokeWidth="5"
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onClick={this.props.onClick}
      /> 
  )}
}

/*
<Draggable handle=".handle">
</Draggable>
*/