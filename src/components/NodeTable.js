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
          left: this.props.x>window.innerWidth+80 ? this.props.x-80 : this.props.x, 
          top: this.props.y>window.innerHeight+100 ? this.props.y-80 : this.props.y,
        }}
      >
        hello
      </div>
  )}
}