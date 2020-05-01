import React, { Component } from 'react';
import { Row, Col } from 'reactstrap'

export default class NodeTable extends Component {
  state = {   
    message: '',
    image: "",
  }

  componentDidMount() {

  }
//  style={{backgroundColor: '#363636',borderColor: '#363636', color: 'white', flex: 1,margin: 4,}} 

  render() {
    var middleColumnTitle = <Col sm='6' style={{textAlign: 'center', fontSize: 12}}>Next</Col>
    if (this.props.pathsActive) {
      middleColumnTitle = <Col sm='6' style={{textAlign: 'center', fontSize: 12}}>Path</Col>
    }

    return (
      <div 
        style={{
          backgroundColor: 'white',//'#363636',
          color: 'black',//'white',
          border: '3px solid black',
          width: 233, //280 to show whole 9 char path
          borderRadius: 3,
          paddingRight: 15,
          paddingLeft: 15,
          position: 'absolute',
          left: this.props.x>window.innerWidth-236 ? this.props.x-202 : this.props.x, //innerwidth-184
          top: this.props.y<4 ? this.props.y+130 : this.props.y,
        }}
      >
        <Row style={{borderBottom: Object.entries(this.props.nodeInfo).length>0 ? 'solid black 2px' : ''}}>
          <Col sm='3' style={{textAlign: 'center', fontSize: 12}}>Dest.
          </Col>
          { middleColumnTitle }
          <Col sm='3' style={{textAlign: 'center', fontSize: 12}}>Cost
          </Col>
        </Row>
        { Object.entries(this.props.nodeInfo).map(([k,v]) => {
            var middleColumnVals
            if (this.props.pathsActive) {
              var stringOutputOfPath = ''
              //console.log('error part: ' + v[0])
              var vReversed = v[0].slice().reverse()
              var charCount = 0
              vReversed.forEach(e => {
                charCount+=1
                if (charCount<8) {
                  if (stringOutputOfPath==='') {
                    stringOutputOfPath = stringOutputOfPath + e
                  }
                  else { 
                    stringOutputOfPath = stringOutputOfPath + ',' + e
                  }
                }
              })
              if (charCount >= 8) {
                stringOutputOfPath = stringOutputOfPath + '...'
              }
              middleColumnVals = <Col sm='6' style={{textAlign: 'center',borderRight: 'solid black 2px'}}> {stringOutputOfPath}</Col>
            } else {
              middleColumnVals = <Col sm='6' style={{textAlign: 'center',borderRight: 'solid black 2px'}}> {v[0]}</Col>
            }
            return (  
              <Row key={k}>
                <Col sm='3' style={{textAlign: 'center', borderRight: 'solid black 2px'}}>{k}
                </Col>
                { middleColumnVals }
                <Col sm='3' style={{textAlign: 'center'}}> {v[1]}
                </Col>
              </Row>
            )
          })
        }
      </div>
  )}
}