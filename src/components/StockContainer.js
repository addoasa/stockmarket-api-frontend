import React from 'react';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import StockListing from './StockListing';


class StockContainer extends React.Component {
  constructor() {
    super();
    this.state={
      sortBy:'name',
      dropdownOpen:false,
    }
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  toggleDropdown(){
    if(this.state.dropdownOpen){
      this.setState({dropdownOpen:false})
    }else{
      this.setState({dropdownOpen:true})
    }
  }

  handleClick(event){
    console.log(event.target.value)
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
          <h3>Sorted by {this.state.sortBy}</h3>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
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
            {this.props.isSearching ? searchResultListings : stockListings}
        </Container>
      </main>
      // <>{this.props.isSearching ? searchResultListings : stockListings}</>
    );
  }
}

export default StockContainer;
