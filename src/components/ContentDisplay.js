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
          resetPagination = {this.props.resetPagination}
          paginationSkip = {this.props.paginationSkip}
          isSearching={this.props.isSearching}
          searchTerm = {this.props.searchTerm}
          stocksToRender={this.props.stocksToRender}
          searchResultsToRender={this.props.searchResultsToRender}
          sortStocksToRender= {this.props.sortStocksToRender}
          sortSearchResultsToRender={this.props.sortSearchResultsToRender}
          setSortBy = {this.props.setSortBy}
          currentlySortingBy={this.props.currentlySortingBy}
          sortIncrease= {this.props.sortIncrease}
          toggleSortIncrease={this.props.toggleSortIncrease}

        /> 
        : 
        <StockPage />}
      </>
    );
  }
}

export default ContentDisplay;
