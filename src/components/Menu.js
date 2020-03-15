import React, { Component } from 'react';
import { Button } from 'reactstrap'
import NodeList from './NodeList'

export default class Menu extends Component {
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
          width: 300,
          height: "99vh",
          backgroundColor: 'gray',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          padding: 6
        }}
      >
          <div style={{
            width: 300,
            fontSize: 30,
          }}>
            Distributed Routers
          </div>
          <Button style={{backgroundColor: 'white', color: 'black'}}>
            Add Node
          </Button>
          <Button style={{backgroundColor: 'white', color: 'black',}}>
            Remove Node
          </Button>
          <Button style={{backgroundColor: 'white', color: 'black',}}>
            Add Link
          </Button>
          <Button style={{backgroundColor: 'white', color: 'black',}}>
            Remove Link
          </Button>
          <div style={{
            paddingTop: 100,
            width: 300,
            fontSize: 30,
          }}>
            Messaging Order
          </div>
          <NodeList selected="1"/>
          <div>
          <Button style={{width: 270/4, backgroundColor: 'white', color: 'black',}}>
            -
          </Button>
          <Button style={{width: 270/4, backgroundColor: 'white', color: 'black',}}>
            >
          </Button>
          <Button style={{width: 270/4, backgroundColor: 'white', color: 'black',}}>
            >>
          </Button>
          <Button style={{width: 270/4, backgroundColor: 'white', color: 'black',}}>
            >>>
          </Button>
          </div>
      </div>
  )}
}