import React from 'react';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner } from 'reactstrap';
import StockListing from './StockListing';


class StockContainer extends React.Component {
  constructor() {
    super();
    this.state={
      dropdownOpenSort:false,
      isSorting: false,
    }
    this.toggleDropdownSort = this.toggleDropdownSort.bind(this);
    this.toggleDropdownOrderBy = this.toggleDropdownOrderBy.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.setSortIncrease = this.setSortIncrease.bind(this);
  }

  componentDidMount(){
    this.props.toggleStockPageIsActive(false);

  }
  toggleDropdownSort(){
    if(this.state.dropdownOpenSort){
      this.setState({dropdownOpenSort:false})
    }else{
      this.setState({dropdownOpenSort:true})
    }
  }
  toggleDropdownOrderBy(){
    if(this.state.dropdownOpenOrderBy){
      this.setState({dropdownOpenOrderBy:false})
    }else{
      this.setState({dropdownOpenOrderBy:true})
    }
  }
  setSortIncrease(event){
    this.props.toggleSortIncrease(event.target.value);
  }

  handleClick(event){
    this.setState({isSorting:true})
    console.log(event.target.value);
    this.props.setSortBy(event.target.value);
    this.props.resetPagination();
    // --------------------------------------------
    // Fetch sorted data based on dropdown choice and give response data to <App /> 
    // --------------------------------------------
    if(this.props.isSearching){
      // ----------------------
      // Sort Search Results
      // ----------------------
      //fetch for what the user wanted AND sort results
      fetch(`http://localhost:4000/stocks?limit=20&skip=0&search=${this.props.searchTerm}&sort=${event.target.value}&increasing=${this.props.sortIncrease}`, {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((gotSortedStockData) => {
        return gotSortedStockData.json();
      })
      .then((readableSortedStockData) => {
        this.props.sortSearchResultsToRender(readableSortedStockData);
        this.setState({isSorting:false})
      }); 
    }else{
      // ----------------------
      // Sort ordinary results
      // ----------------------
      fetch(`http://localhost:4000/stocks?limit=20&skip=0&sort=${event.target.value}&increasing=${this.props.sortIncrease}`, {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then((gotSortedStockData) => {
        return gotSortedStockData.json();
      })
      .then((readableSortedStockData) => {
        this.props.sortStocksToRender(readableSortedStockData);
        this.setState({isSorting:false})
      });  

    }
      
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
        <StockListing key={`stock${index}`} stockData={stock}  />);
    }

    let listToRender;
    if(this.props.isSearching){
      if(this.props.searchResultsToRender === "{}"){
        listToRender = <Spinner />
      }else{
        listToRender = searchResultListings;
      }
    }else{
      if(this.props.stocksToRender === "{}"){
        listToRender = <Spinner />
      }else{
        listToRender = stockListings;
      }
    }
    return (
      <main>
        <Container>
          {
            this.props.isSearching ? 
            <></> 
            :
            <div>
              <h3>Showing {this.props.paginationSkip} out of {this.props.stocksToRender.total} results</h3>
              <h3>Sorted by {this.props.currentlySortingBy} in {this.props.sortIncrease ? "increasing" : "decreasing"} order.</h3>
            </div> 
          }
          <Dropdown isOpen={this.state.dropdownOpenSort} toggle={this.toggleDropdownSort}>
            <DropdownToggle caret>
              Sort
              </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Choose criteria</DropdownItem>
              <DropdownItem value = "name" onClick={this.handleClick}>name</DropdownItem>
              <DropdownItem divider />
              <DropdownItem value = "symbol" onClick={this.handleClick}>symbol</DropdownItem>
              <DropdownItem divider />
              <DropdownItem value = "cusip" onClick={this.handleClick}>cusip</DropdownItem>
              <DropdownItem divider />
              <DropdownItem value = "isin" onClick={this.handleClick}>isin</DropdownItem>
              <DropdownItem divider />
              <DropdownItem value = "open" onClick={this.handleClick}>open</DropdownItem>
              <DropdownItem divider />
              <DropdownItem value = "close" onClick={this.handleClick}>close</DropdownItem>
              <DropdownItem divider />
              <DropdownItem value = "high" onClick={this.handleClick}>high</DropdownItem>
              <DropdownItem divider />
              <DropdownItem value = "low" onClick={this.handleClick}>low</DropdownItem>
              <DropdownItem divider />
              <DropdownItem value = "change" onClick={this.handleClick}>change</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown isOpen={this.state.dropdownOpenOrderBy} toggle={this.toggleDropdownOrderBy}>
            <DropdownToggle caret>
            {this.props.sortIncrease ? "increasing" : "decreasing"}
              </DropdownToggle>
            <DropdownMenu>
              <DropdownItem value = {true} onClick={this.setSortIncrease}>increasing</DropdownItem>
              <DropdownItem value = {false} onClick={this.setSortIncrease}>decreasing</DropdownItem>
              <DropdownItem divider />
            </DropdownMenu>
          </Dropdown>
            {listToRender && !this.state.isSorting ? listToRender : <Spinner color="primary" />}
        </Container>
      </main>
    );
  }
}

export default StockContainer;
