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
          left: this.props.x>window.innerWidth-124 ? this.props.x-141 : this.props.x, 
          top: this.props.y<4 ? this.props.y+130 : this.props.y,
        }}
      >
        Dest | Hop | Cst
        { Object.entries(this.props.nodeInfo).map(([k,v]) => {
            return (  
              <div key={k}>{k} | {v[0]} | {v[1]}</div>
            )
          })
        }
      </div>
  )}
}