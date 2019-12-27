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
        /> 
        : 
        <StockPage />}
      </>
    );
  }
}

export default ContentDisplay;
