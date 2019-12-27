import React from 'react';
import '../styles/StockListing.css';
import { Container, Row, Col, Toast, ToastBody, ToastHeader  } from 'reactstrap';

class StockListing extends React.Component {
  constructor() {
    super();
    this.state = {
      isStockChangeNeg: false,
    };
    this.calculateChange = this.calculateChange.bind(this);
  }

  calculateChange(open, close) {
    const change = ((close - open) / open) * 100;
    return change.toFixed(1);
  }

  render() {
    console.log(this.props.stockData);
    return (
      <>

        
        <Row className="stock p-3 my-2 rounded">
            <Toast className ="align-items-end">  
            <ToastHeader>
              <h5>{this.props.stockData.name}</h5>         
            </ToastHeader> 
            <ToastBody>    
          <Container>
            <Row>
              <Col id="symbol-container">
                <h4>Symbol</h4>
                <h2>{this.props.stockData.symbol}</h2>
              </Col>
              <Col id="open-container">
                <h4>Open</h4>
                <h2>{this.props.stockData.open}</h2>

              </Col>
              <Col id="close-container">
                <h4>Close</h4>
                <h2>{this.props.stockData.close}</h2>

              </Col>
              <Col id="change-container">
                <h4>Change</h4>
                <h2>
                  {this.calculateChange(this.props.stockData.open, this.props.stockData.close)}
                  {' '}
    %
                </h2>

              </Col>
              <Col id="highlo-container">
                <h4>High</h4>
                <h4>Low</h4>
                <input type="range" max={this.props.stockData.high} min={this.props.stockData.low} value={this.props.stockData.close} />
              </Col>
              </Row>
              </Container>

              </ToastBody>
            </Toast>
        </Row>
      </>
    );
  }
}

export default StockListing;
