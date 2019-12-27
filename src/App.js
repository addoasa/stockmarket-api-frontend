import React from 'react';
import Header from './components/Header.js';
import ContentDisplay from './components/ContentDisplay.js';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      stocksToRender: {},
    };
  }

  componentDidMount() {
    fetch('http://localhost:4000/stocks?limit=20&skip=0&sort=name&increasing=true', {
      method: 'get',
		  headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((gotStockData) => gotStockData.json())
      .then((readableStockData) => {
        this.setState({ stocksToRender: readableStockData });
      });
  }

  render() {
    console.log('RenderedStocks', this.state.stocksToRender);
    return (
      <div className="App p-4">
        <Header />
        <ContentDisplay />
      </div>
    );
  }
}

export default App;
