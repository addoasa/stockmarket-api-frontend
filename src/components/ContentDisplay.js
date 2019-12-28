import React from 'react';
import StockContainer from './StockContainer';
import StockPage from './StockPage';

class ContentDisplay extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        {true ? 
        <StockContainer 
          isSearching={this.props.isSearching}
          stocksToRender={this.props.stocksToRender}
          searchResultsToRender={this.props.searchResultsToRender}
          sortStocksToRender= {this.props.sortStocksToRender}
          sortSearchResultsToRender={this.props.sortSearchResultsToRender}
          setSortBy = {this.props.setSortBy}
          currentlySortingBy={this.props.currentlySortingBy}
        /> 
        : 
        <StockPage />}
      </>
    );
  }
}

export default ContentDisplay;
