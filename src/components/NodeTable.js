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
          backgroundColor: 'white',
          border: '3px solid black',
          borderRadius: 3,
          padding: 3,
          position: 'absolute',
          left: this.props.x>window.innerWidth+80 ? this.props.x-80 : this.props.x, 
          top: this.props.y>window.innerHeight+100 ? this.props.y-80 : this.props.y,
        }}
      >
        Node | Bw
        { Object.entries(this.props.nodeInfo).map(([k,v]) => {
            return (  
              <div key={k}>{k} | {v}</div>
            )
          })
        }
      </div>
  )}
}