import React from 'react';

import logo from './logo.svg';


class App extends React.Component {
  render() {
    return (
      <div className="App p-4">
        <img className="mb-4" src={logo} alt="logo" />
        <h1>Thanks for your interest in Clear Street!</h1>
        <h4>All the instructions you need to complete the assignment should be in the README</h4>
      </div>
    );
  };
};

export default App;
