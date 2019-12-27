import React from 'react';
import StockListing from './StockListing';

class StockContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    const searchResultListings = [];
    let stockListings;
    // Conditional to prevent .map() from running before stocks are recieved
    if (!this.props.stocksToRender.stocks) {
      stockListings = null;
    } else {
      stockListings = this.props.stocksToRender.stocks.map((stock, index) => (stock));
    }
    console.log(stockListings);
    return (
      <></>
      // <>{this.props.isSearching ? searchResultListings : stockListings}</>
    );
  }
}

export default StockContainer;
