import React from 'react';
import '../styles/Header.css';
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Button,
  Form,
  Input,
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
              <img className="mb-0" src={logo} alt="logo" />
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
