import React, { Component } from 'react';

export default class Node extends Component {
  state = {
    //killed Strok: '#3d3d3d'
  } 

  render() {
    return (
      <line 
        id={this.props.id}
        x1={this.props.x1}
        y1={this.props.y1} 
        x2={this.props.x2} 
        y2={this.props.y2}
        stroke={this.props.stroke}
        strokeWidth="5"
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        onClick={this.props.onClick}
      /> 
  )}
}
