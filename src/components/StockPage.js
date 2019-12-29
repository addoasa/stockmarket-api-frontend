import React from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';

import '../styles/StockPage.css'
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
      isLoaded: false,
    }
    this.calculateChange = this.calculateChange.bind(this);
  }
  componentDidMount(){
    this.props.toggleStockPageIsActive(true);
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
          isLoaded: true,
        });
      });
  }

  calculateChange(open, close) {
    const change = ((close - open) / open) * 100;
    return change.toFixed(1);
  }

  render() {
    const change = this.calculateChange(this.state.open, this.state.close);

    return (
      <main >
        {
        this.state.isLoaded ?
        <Container>
          <Row>
            <Col>
            <div className ="stockpage-heading">
              <div>
                <div >
                  <h3 className="stockpage-symbol">{this.state.symbol}</h3>
                </div>
                  <h5 className="stockpage-name">{this.state.name}</h5>
              </div>
              <div className = "stockpage-arrow-svg">
                {change > 0 ?
                <svg id="i-arrow-top"  viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M6 10 L16 2 26 10 M16 2 L16 30" />
                </svg>
                  :
                <svg id="i-arrow-bottom"  viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                  <path d="M6 22 L16 30 26 22 M16 30 L16 2" />
                </svg>}
              </div>
            </div>
            </Col>
            <Col>
            </Col>
            <Col>

            </Col>
          </Row>
          <hr></hr>
          <Row>
            <Col>
              <h3 className="stockpage-label">Open</h3>
              <h3 className="stockpage-info">$ {Math.round(this.state.open)}</h3>
            </Col>
            <Col>
              <h3 className="stockpage-label">Close</h3>
              <h3 className="stockpage-info">$ {Math.round(this.state.close)}</h3>
            </Col>
            <Col>
              <h3 className="stockpage-label">Change</h3>
              <h3 className="stockpage-info">{change} %</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className="stockpage-label">High</h3>
              <h3 className="stockpage-info">$ {Math.round(this.state.high)}</h3>
            </Col>
            <Col>
              <h3 className="stockpage-label">Low</h3>
              <h3 className="stockpage-info">$ {Math.round(this.state.low)}</h3>
            </Col>
            <Col>

            </Col>
          </Row>
        </Container>
        :
        <Container>
          <Row>
            <Spinner className = "stockpage-loading-spinner"  style={{ width: '10rem', height: '10rem' }} size="lg"  color="secondary"  />
          </Row>
        </Container>
        }
      </main>
    );
  }
}

export default StockPage;