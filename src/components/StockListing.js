import React from 'react';
// import '../styles/StockListing.css'

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
        <h5>{this.props.stockData.name}</h5>
        <div className="stock-listing-container">
          <div id="symbol-container">
            <h4>Symbol</h4>
            <h2>{this.props.stockData.symbol}</h2>
          </div>
          <div id="open-container">
            <h4>Open</h4>
            <h2>{this.props.stockData.open}</h2>

          </div>
          <div id="close-container">
            <h4>Close</h4>
            <h2>{this.props.stockData.close}</h2>

          </div>
          <div id="change-container">
            <h4>Change</h4>
            <h2>
              {this.calculateChange(this.props.stockData.open, this.props.stockData.close)}
              {' '}
%
            </h2>

          </div>
          <div id="highlo-container">
            <h4>High</h4>
            <h4>Low</h4>
            <input type="range" max={this.props.stockData.high} min={this.props.stockData.low} value={this.props.stockData.close} />
          </div>
        </div>
      </>
    );
  }
}

export default StockListing;
