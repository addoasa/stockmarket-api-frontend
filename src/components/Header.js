import React from 'react';
import logo from '../logo.svg';

class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <header>
          <img className="mb-4" src={logo} alt="logo" />
          <input type="text" placeholder="search"></input>
        </header>
      </>
    );
  }
}

export default Header;