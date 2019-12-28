import React from 'react';
import Header from './components/Header.js';
import ContentDisplay from './components/ContentDisplay.js';
import Footer from './components/Footer.js';
import './index.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stocksToRender: {},
      searchTerm: '',
      searchResultsToRender: {},
      isSearching: false,
      windowHeight: 0,
      totalHeight: 0,
      scrollAmount: 0,
      haveReachedBottom: false,
    };
    this.searchForStock = this.searchForStock.bind(this);
    this.checkHeight = this.checkHeight.bind(this);
  }

  componentDidMount() {
    // --------------------------------------------
    // Get Initial Stock Data
    // --------------------------------------------
    // Fetch first 20 stocks and store them in state 
    fetch('http://localhost:4000/stocks?limit=20&skip=0&sort=name&increasing=true', {
      method: 'get',
		  headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((gotStockData) => {
        return gotStockData.json();
      })
      .then((readableStockData) => {
        this.setState({ 
          stocksToRender: readableStockData 
        });
      });
    // --------------------------------------------
    // Monitor how much the user has scrolled 
    // --------------------------------------------
    // firing this event will call funtion onscroll for pagination
    window.addEventListener('scroll', this.checkHeight);
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

  checkHeight() {
    // --------------------------------------------
    // Store scroll amount, current viewport and document height in state
    // --------------------------------------------
    // This function will fire whenever a user scrolls
    this.setState({
      windowHeight: document.documentElement.clientHeight,
      totalHeight: document.documentElement.offsetHeight,
      scrollAmount: window.scrollY,
    });
  }


  render() {
    // console.log('RenderedStocks', this.state.stocksToRender);
    // --------------------------------------------
    // If the different between the total height and the scroll amount equals our viewport
    // we have hit the bottom of the page.
    // (This is a temporary solution does not work with mobile yet)
    // --------------------------------------------

    const viewport = Math.round(this.state.windowHeight);
    const totalHeight = Math.round(this.state.totalHeight);
    const scrolled = Math.round(this.state.scrollAmount);
    console.log(viewport, 'viewport');
    console.log(totalHeight, 'document height');
    console.log(scrolled, 'scrolled');

    if ((totalHeight - scrolled) === viewport) {
      console.log('You have reached the bottom of the page');
    }
    
    // --------------------------------------------

    return (
      <div className="App p-0">
        <Header
          searchTerm={this.state.searchTerm}
          searchForStock={this.searchForStock}
        />
        <ContentDisplay
          isSearching={this.state.isSearching}
          stocksToRender={this.state.stocksToRender}
          searchResultsToRender={this.state.searchResultsToRender}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
