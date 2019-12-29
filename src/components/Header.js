import React from 'react';
import {BrowserRouter, Route, Switch , Link} from 'react-router-dom'
import '../styles/Header.css';
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  Button,
  Form,
  Input,
  Container, 
  Row, Col 

} from 'reactstrap';
import logo from '../logo.svg';

class Header extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event){
    if(event.target.value === ""){
      this.props.stopSearch();
    }else{
      this.props.startSearch();
      this.props.searchForStock(event.target.value);
    }
  }

  render() {
    return (
      <>
        <header>
          <Navbar color="light" light expand="lg">
            <Nav className="py-4 header-navbar ">
            {
              this.props.isStockPageActive ? 
              <Link to= "/" className="header-nav-backbtn-wrapper"><button className ="header-nav-backbtn">Go Back</button></Link>
              :

            <div className="header-nav-content">
            <NavbarBrand>
              <img className="mb-0 header-nav-logo" src={logo} alt="logo" />
            </NavbarBrand>
          
           
              <Form className="header-nav-form">
                <Input type="text" name="text" onChange = {this.handleChange} placeholder="search..." />
              </Form>
            </div>
            }
            </Nav>
          </Navbar>
        </header>
      </>
    );
  }
}

export default Header;
