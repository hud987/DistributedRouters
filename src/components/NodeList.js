import React, { Component } from 'react';
import { List, arrayMove } from 'react-movable';

export default class NodeList extends Component {
  

  render() {
    return (
      <List
        values={this.props.nodeIds}
        onChange={this.props.onChangeNodeList}

        renderList={({ children, props, isDragged }) => <ul {...props} style={{ 
          padding: 5, 
          cursor: isDragged ? 'grabbing' : undefined,
          overflowY: 'scroll',
          height: 375,
          //borderTop: '5px solid #F9F9F9',
          //borderBottom: '5px solid #F9F9F9',
          //borderLeft: '5px solid #F9F9F9',
        }}>{children}</ul>}

        renderItem={({ value, index, props, isDragged, isSelected }) => <li {...props} style={{
          ...props.style,
          padding: '1.5em',
          margin: '0.5em 0em',
          listStyleType: 'none',
          cursor: isDragged ? 'grabbing' : 'grab',
          //border: '2px solid #CCC',
          //boxShadow: '3px 3px #AAA',
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