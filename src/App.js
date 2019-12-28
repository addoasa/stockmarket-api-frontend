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
      windowHeight: null,
      totalHeight: 9,
      scrollAmount: null,
      haveReachedBottom: false,
      paginationSkip : 20,
    };
    this.searchForStock = this.searchForStock.bind(this);
    this.checkHeight = this.checkHeight.bind(this);
    this.checkIfUserReachesBottom = this.checkIfUserReachesBottom.bind(this);
    this.getMoreStocks = this.getMoreStocks.bind(this);
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
    window.addEventListener('scroll', ()=>{
      this.checkHeight();
      this.checkIfUserReachesBottom();
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
        return gotSearchResults.json();
      })
      .then((readableSearchResults) => {
        this.setState({ searchResultsToRender: readableSearchResults });
      });
  }

  checkHeight() {
    // --------------------------------------------
    // Store scroll amount, current viewport and document height in state
    // --------------------------------------------
    // This stored data will be used to determine where the user is on the page
    // This function will fire whenever a user scrolls

    this.setState({
      windowHeight: document.documentElement.clientHeight,
      totalHeight: document.documentElement.offsetHeight,
      scrollAmount: window.scrollY,
    });
  }

  checkIfUserReachesBottom(){
    // --------------------------------------------
    // If the difference between the total height and the scroll amount equals our viewport
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
      // Allow for some time to pass before proceeding to fetch for more data
      setTimeout(()=>{
        this.getMoreStocks();
      },2000)
    }
  }

  getMoreStocks(){
    // --------------------------------------------
    // Fetch next 20 items from stock api
    // --------------------------------------------
    // If we are here, that should mean that the user has scrolled to the bottom of the page
    // Use a field called paginationSkip in state to keep track of the number of 
    // results we want to skip in order to get the next set of stocks we want
    fetch(`http://localhost:4000/stocks?limit=20&skip=${this.state.paginationSkip}&sort=name&increasing=true`, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((gotMoreStocks) => {
      return gotMoreStocks.json();
    })
    .then((readableNewStocks) => {
      // --------------------------------------------
      // Update stocks in state with data we've just fetched
      // --------------------------------------------
      
      // Make a clone of the current stocks object in state
      let cloneOfCurrentStocksInState = JSON.parse(JSON.stringify(this.state.stocksToRender));
      
      // Create a new array that merges the stocks currently in state with the new stocks 
      // that we've recieved from this pagination fetch
      const updatedStocksToRender = cloneOfCurrentStocksInState.stocks.concat(readableNewStocks.stocks);

      // update the stocks array which is what is dynamically being used to create new <StockListing /> components
      cloneOfCurrentStocksInState.stocks = updatedStocksToRender;

      // update state object with modified clone
      this.setState((state, props) => {
        return {stocksToRender: cloneOfCurrentStocksInState};
      });
    });
    // increment the pagination count in preparation for the next time
    this.setState((state, props) => {
      return {paginationSkip: state.paginationSkip + 20};
    });  
  }
 

  render() {
    console.log('RenderedStocks', this.state.stocksToRender);
   
  
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
