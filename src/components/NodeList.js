import React, { Component } from 'react';
import { List, arrayMove } from 'react-movable';

export default class NodeList extends Component {
  state = {   
    items: ['1', '2', '3', '4', '5', '6','7','8','9']
  }

  render() {
    return (
      <List
        values={this.state.items}
        onChange={({ oldIndex, newIndex }) =>
          this.setState({items: arrayMove(this.state.items, oldIndex, newIndex)})
        }

        renderList={({ children, props, isDragged }) => <ul {...props} style={{ 
          padding: 0, 
          cursor: isDragged ? 'grabbing' : undefined,
          overflowY: 'scroll',
          borderTop: '5px solid #AAA',
          borderBottom: '5px solid #AAA'
        }}>{children}</ul>}

        renderItem={({ value, index, props, isDragged, isSelected }) => <li {...props} style={{
          ...props.style,
          padding: '1.5em',
          margin: '0.5em 0em',
          listStyleType: 'none',
          cursor: isDragged ? 'grabbing' : 'grab',
          border: '2px solid #CCC',
          boxShadow: '3px 3px #AAA',
          color: '#333',
          borderRadius: '5px',
          fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
          backgroundColor: index==this.props.selected ? '#AAA' : '#FFF',
          textAlign: 'center'
        }}>{value}</li>}
        //lockVertically={true}
      />
  )}
}