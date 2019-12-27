import React from 'react';
import Header from './components/Header.js';
import ContentDisplay from './components/ContentDisplay.js';


class App extends React.Component {
  render() {
    return (
      <div className="App p-4">
        <Header />
        <ContentDisplay />
      </div>
    );
  };
};

export default App;
