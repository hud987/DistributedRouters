import React, { Component } from 'react';
import { Button } from 'reactstrap'
import { List, arrayMove } from 'react-movable';

export default class Menu extends Component {
  state = {   
    message: '',
    image: "",
  }
  const [items, setItems] = React.useState(['Item 1', 'Item 2', 'Item 3']);

  componentDidMount() {

  }

  render() {
    return (
      <div
        style={{
          width: 300,
          height: "100vh",
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
        <List
          values={items}
          onChange={({ oldIndex, newIndex }) =>
            setItems(arrayMove(items, oldIndex, newIndex))
          }
          renderList={({ children, props }) => <ul {...props}>{children}</ul>}
          renderItem={({ value, props }) => <li {...props}>{value}</li>}
        />
      </div>
  )}
}