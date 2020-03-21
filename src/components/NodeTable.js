import React, { Component } from 'react';
import { Row, Col } from 'reactstrap'

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
          paddingRight: 15,
          paddingLeft: 15,
          position: 'absolute',
          left: this.props.x>window.innerWidth-184 ? this.props.x-202 : this.props.x, 
          top: this.props.y<4 ? this.props.y+130 : this.props.y,
        }}
      >
        <Row style={{borderBottom: Object.entries(this.props.nodeInfo).length>0 ? 'solid black 2px' : ''}}>
          <Col sm='4' style={{textAlign: 'center'}}>Dest
          </Col>
          <Col sm='4' style={{textAlign: 'center'}}>Hop
          </Col>
          <Col sm='4' style={{textAlign: 'center'}}>Cst
          </Col>
        </Row>
        { Object.entries(this.props.nodeInfo).map(([k,v]) => {
            return (  
              <Row key={k}>
                <Col sm='4' style={{textAlign: 'center', borderRight: 'solid black 2px'}}>{k}
                </Col>
                <Col sm='4' style={{textAlign: 'center',borderRight: 'solid black 2px'}}> {v[0]}
                </Col>
                <Col sm='4' style={{textAlign: 'center'}}> {v[1]}
                </Col>
              </Row>

            )
          })
        }
      </div>
  )}
}