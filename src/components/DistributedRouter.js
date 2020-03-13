import React, { Component } from 'react';
import DraggableNode from './DraggableNode'

export default class DistributedRouter extends Component {
  state = {   
    message: '',
    image: "",
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <DraggableNode/>
      </div>
  )}
}