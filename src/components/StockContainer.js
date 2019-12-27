import React from 'react';
import StockListing from './StockListing';
import { Container, Row, Col } from 'reactstrap';


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
      stockListings = this.props.stocksToRender.stocks.map((stock, index) =>
      // create a <StockListing /> component for every object in stockListings array
        <StockListing key={`stock${index}`} stockData={stock} />);
    }
    console.log(stockListings);
    return (
      <main>
        <Container>
          {stockListings}
        </Container>
      </main>
      // <>{this.props.isSearching ? searchResultListings : stockListings}</>
    );
  }
}

export default StockContainer;
