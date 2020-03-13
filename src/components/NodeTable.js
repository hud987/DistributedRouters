import React, { Component } from 'react';

export default class NodeTable extends Component {
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
          width: '80px',
          height: '100px',
          backgroundColor: 'red',
          position: 'absolute',
          left: 4,//this.props.x, 
          top: 5//this.props.y,
        }}
      >
        hello
      </div>
  )}
}