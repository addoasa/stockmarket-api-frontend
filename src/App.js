import React from 'react';
import Header from './components/Header.js';
import ContentDisplay from './components/ContentDisplay.js';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stocksToRender: {},
      searchTerm: '',
      searchResultsToRender: {},
      isSearching: false,
    };
    this.searchForStock = this.searchForStock.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:4000/stocks?limit=20&skip=0&sort=name&increasing=true', {
      method: 'get',
		  headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((gotStockData) => gotStockData.json())
      .then((readableStockData) => {
        this.setState({ stocksToRender: readableStockData });
      });
  }

  searchForStock(query) {
    fetch(`http://localhost:4000/stocks?limit=20&skip=0&search=${query}&sort=name&increasing=true`, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((gotSearchResults) => {
        gotSearchResults.json();
      })
      .then((readableSearchResults) => {
        this.setState({ searchResultsToRender: readableSearchResults });
      });
  }

  render() {
    console.log('RenderedStocks', this.state.stocksToRender);
    return (
      <div className="App p-4">
        <Header
          searchTerm={this.state.searchTerm}
          searchForStock={this.searchForStock}
        />
        <ContentDisplay
          isSearching={this.state.isSearching}
          stocksToRender={this.state.stocksToRender}
          searchResultsToRender={this.state.searchResultsToRender}
        />
      </div>
    );
  }
}

export default App;
