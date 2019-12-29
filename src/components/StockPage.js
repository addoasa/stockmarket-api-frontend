import React from 'react';
import { Container, Row, Col } from 'reactstrap';

class StockPage extends React.Component {
  constructor() {
    super();
    this.state= {
      name: '', 
      symbol: '', 
      open: '', 
      close: '', 
      high: '', 
      low: '', 
    }
    this.calculateChange = this.calculateChange.bind(this);
  }
  componentDidMount(){
    this.props.toggleStockPageIsActive();
    console.log(this.props.match.params.cusip)
    fetch(`http://localhost:4000/stocks/${this.props.match.params.cusip}`,{
      method:'get',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((gotUniqueStockData) => {
      return gotUniqueStockData.json();
    })
    .then((readableUniqueStockData) => {
      console.log(readableUniqueStockData)
      this.setState({
         name: readableUniqueStockData.name, 
         symbol: readableUniqueStockData.symbol, 
         open: readableUniqueStockData.open, 
         close: readableUniqueStockData.close, 
         high: readableUniqueStockData.high, 
         low: readableUniqueStockData.low, 
        });
    });
  }
  
  calculateChange(open, close) {
    const change = ((close - open) / open) * 100;
    return change.toFixed(1);
  }

  render() {
    return (
      <main>
        <Container>
          <Row>
            <Col>
              <h3>{this.state.symbol}</h3>
              <h5>{this.state.name}</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Open</h3>
              <h3>$ {Math.round(this.state.open)}</h3>
            </Col>
            <Col>
              <h3>Close</h3>
              <h3>$ {Math.round(this.state.close)}</h3>
            </Col>
            <Col>
              <h3>Change</h3>
              <h3>{this.calculateChange(this.state.open, this.state.close)} %</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>High</h3>
              <h3>$ {Math.round(this.state.high)}</h3>
            </Col>
            <Col>
              <h3>Low</h3>
              <h3>$ {Math.round(this.state.low)}</h3>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}

export default StockPage;