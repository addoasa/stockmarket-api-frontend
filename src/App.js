import React from 'react';
import { Router} from 'react-router';
import {BrowserRouter, Route, Switch , Link} from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Header from './components/Header.js';
import './index.css';
import StockContainer from './components/StockContainer.js';
import StockPage from './components/StockPage.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stocksToRender: {},
      searchTerm: '',
      searchResultsToRender: {},
      isFetchingMoreStocks:false,
      isSearching: false,
      windowHeight: null,
      totalHeight: 9,
      scrollAmount: null,
      haveReachedBottom: false,
      paginationSkip : 20,
      currentlySortingBy:"name",
      sortIncrease: true,
      isStockPageActive: false,
      
    };
    this.startSearch = this.startSearch.bind(this); 
    this.stopSearch = this.stopSearch.bind(this); 
    this.searchForStock = this.searchForStock.bind(this);
    this.checkHeight = this.checkHeight.bind(this);
    this.checkIfUserReachesBottom = this.checkIfUserReachesBottom.bind(this);
    this.getMoreStocks = this.getMoreStocks.bind(this);
    this.resetPagination = this.resetPagination.bind(this);
    this.setSortBy = this.setSortBy.bind(this);
    this.sortStocksToRender = this.sortStocksToRender.bind(this);
    this.sortSearchResultsToRender = this.sortSearchResultsToRender.bind(this);
    this.toggleSortIncrease = this.toggleSortIncrease.bind(this);
    this.toggleStockPageIsActive = this.toggleStockPageIsActive.bind(this);
  }

  componentDidMount() {
    // --------------------------------------------
    // Get Initial Stock Data
    // --------------------------------------------
    // Fetch first 20 stocks and store them in state 
    fetch(`http://localhost:4000/stocks?limit=20&skip=0&sort=${this.state.currentlySortingBy}&increasing=true`, {
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
 
  // --------------------------------------------------------------------------------
  // Search Methods
  // --------------------------------------------------------------------------------
  startSearch(){
    this.setState({
      isSearching:true,
    })
  }

  stopSearch(){
    this.setState({
      isSearching:false,
    })
  }

  searchForStock(query) {
    
    fetch(`http://localhost:4000/stocks?limit=20&skip=0&search=${query}&sort=${this.state.currentlySortingBy}&increasing=true`, {
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
      this.setState({
        searchTerm:query,
      })
  }

  // --------------------------------------------------------------------------------
  // Pagination Methods
  // --------------------------------------------------------------------------------
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

    if ((totalHeight - scrolled) === viewport && !this.state.isSearching) {
      console.log('You have reached the bottom of the page');
      this.setState({isFetchingMoreStocks:true})
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
    fetch(`http://localhost:4000/stocks?limit=20&skip=${this.state.paginationSkip}&sort=${this.state.currentlySortingBy}&increasing=${this.state.sortIncrease}`, {
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
      return {
        paginationSkip: state.paginationSkip + 20, 
        isFetchingMoreStocks:false,
      };
    });  
  }

  resetPagination(){
    // Reset pagination to 20 when user attemots to sort
    this.setState({paginationSkip: 20});   
  }
 
  // --------------------------------------------------------------------------------
  // Sort Methods
  // --------------------------------------------------------------------------------
  setSortBy(chosenCriteria){
    this.setState({
      currentlySortingBy:chosenCriteria,
    })
  }

  sortStocksToRender(sortedStocks){
    this.setState({
      stocksToRender:sortedStocks,
    })
  }
  sortSearchResultsToRender(sortedStocks){
    this.setState({
      searchResultsToRender:sortedStocks,
    })
  }

  toggleSortIncrease(boolean){
    this.setState({
      sortIncrease: boolean,
    })
    
  }

  // --------------------------------------------------------------------------------
  // Routing Methods
  // --------------------------------------------------------------------------------

  toggleStockPageIsActive(boolean){
      this.setState({
        isStockPageActive: boolean,
      })
  }
  

  render() {
    console.log('RenderedStocks', this.state.stocksToRender);
   
  
    return (
      <BrowserRouter>        
        <div className="App p-0">
          <Header
            startSearch={this.startSearch}
            stopSearch={this.stopSearch}
            searchForStock={this.searchForStock}
            isStockPageActive={this.state.isStockPageActive}
          />
          <Switch>
            <Route 
              exact path='/' 
              render={(props) => {
                return(
                  <StockContainer {...props} 
                    resetPagination = {this.resetPagination}
                    paginationSkip = {this.state.paginationSkip}
                    isSearching={this.state.isSearching}
                    searchTerm={this.state.searchTerm}
                    stocksToRender={this.state.stocksToRender}
                    searchResultsToRender={this.state.searchResultsToRender}
                    sortStocksToRender= {this.sortStocksToRender}
                    sortSearchResultsToRender={this.sortSearchResultsToRender}
                    setSortBy = {this.setSortBy}
                    currentlySortingBy={this.state.currentlySortingBy}
                    toggleSortIncrease={this.toggleSortIncrease}         
                    sortIncrease ={this.state.sortIncrease}
                    toggleStockPageIsActive={this.toggleStockPageIsActive}
                  />
                )
              }
              }  
            />   
            <Route path='/:cusip' 
              render={(props) => {
                return(
                  <StockPage {...props} 
                    toggleStockPageIsActive={this.toggleStockPageIsActive}
                  />
                )
                }
              }  
            />  
          </Switch>   
          {this.state.isFetchingMoreStocks ? <Spinner /> : <></>}
        </div>
      </BrowserRouter> 
    );
  }
}

export default App;
