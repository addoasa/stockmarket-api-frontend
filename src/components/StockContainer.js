import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import StockListing from './StockListing';


class StockContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    // --------------------------------------------
    // Iterate through the stocks objects that were passed here from props
    // --------------------------------------------

    let searchResultListings;
    let stockListings;
  
    // Conditional to prevent .map() from running before stocks are recieved
    if (!this.props.searchResultsToRender.stocks) {
      searchResultListings = null;
    } else {
      searchResultListings = this.props.searchResultsToRender.stocks.map((searchedStock, index) =>
      // create a <StockListing /> component for every object in stockListings array
        <StockListing key={`stock${index}`} stockData={searchedStock} />);
    }
    
    // Conditional to prevent .map() from running before stocks are recieved
    if (!this.props.stocksToRender.stocks) {
      stockListings = null;
    } else {
      stockListings = this.props.stocksToRender.stocks.map((stock, index) =>
      // create a <StockListing /> component for every object in stockListings array
        <StockListing key={`stock${index}`} stockData={stock} />);
    }

    return (
      <main>
        <Container>
          {this.props.isSearching ? searchResultListings : stockListings}
        </Container>
      </main>
      // <>{this.props.isSearching ? searchResultListings : stockListings}</>
    );
  }
}

export default StockContainer;
