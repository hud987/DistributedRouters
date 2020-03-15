import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import NodeMap from './NodeMap'
import Menu from './Menu'

export default class DistributedRouter extends Component {
  state = {   
    message: '',
    image: "",
  }

  componentDidMount() {

  }

  render() {
    return (
      <div style={{display:'flex'}}>
        <Menu/>
        <NodeMap />
      </div>
  )}
}