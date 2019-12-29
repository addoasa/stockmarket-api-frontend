import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/StockListing.css';
import { Row, Col } from 'reactstrap';

class StockListing extends React.Component {
  constructor() {
    super();
    this.calculateChange = this.calculateChange.bind(this);
  }



  calculateChange(open, close) {
    const change = ((close - open) / open) * 100;
    return change.toFixed(1);
  }


  render() {
    const change = this.calculateChange(this.props.stockData.open, this.props.stockData.close);
   
    return (
      <Link className="stock-individual-container-link" to={`/${this.props.stockData.cusip}`}>
        <div className={change > 0 ? "stock-individual-container" : "stock-individual-container-bad" } id ={this.props.stockData.cusip}>
          <Row className="stock-company-name-row">
              <h5 className="stock-company-name">{this.props.stockData.name}</h5>
          </Row>
          <Row className="p-3 stock-listing-row">
            <Col id="symbol-container">
              <h4 className="stock-listing-label">Symbol</h4>
              <h2>{this.props.stockData.symbol}</h2>
            </Col>
            <Col id="open-container">
              <h4 className="stock-listing-label">Open</h4>
              <h2>{Math.round(this.props.stockData.open)}</h2>
            </Col>
            <Col id="close-container">
              <h4 className="stock-listing-label">Close</h4>
              <h2>{Math.round(this.props.stockData.close)}</h2>
            </Col>
            <Col id="change-container">
              <h4 className="stock-listing-label">Change</h4>
              <h2>{change} % </h2>
            </Col>
            <Col id="highlo-container">
              <div className = "highlo-labels">
                <h4 className="stock-listing-label">Low</h4>
                <h4 className="stock-listing-label">High</h4>
              </div>
              <input readOnly type="range" max={this.props.stockData.high} min={this.props.stockData.low} value={this.props.stockData.close} />
            </Col>
          </Row>
        </div>
      </Link>
    );
  }
}

export default StockListing;
