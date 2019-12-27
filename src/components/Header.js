import React from 'react';
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
  }

  render() {
    return (
      <>
        <header>
          <Navbar color="light" light expand="md">
            <Nav className="py-4 header-nav-content">
            <NavbarBrand>
              <img className="mb-0" src={logo} alt="logo" />
            </NavbarBrand>
              <Form>
                <Input type="text" name="text" placeholder="search..." />
                <Button>Search</Button>
              </Form>
            </Nav>
          </Navbar>
        </header>
      </>
    );
  }
}

export default Header;
