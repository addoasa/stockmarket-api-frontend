import React from 'react';
import StockContainer from './StockContainer';
import StockPage from './StockPage';

class ContentDisplay extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>{true ? <StockContainer /> : <StockPage />}</>
    );
  }
}

export default ContentDisplay;
