import React from 'react';

class StockPage extends React.Component {
  constructor() {
    super();
  }
  componentDidMount(){
    console.log(this.props.match.params.cusip)
    
  }

  render() {
    return (
      <main>
        <h1></h1>
      </main>
    );
  }
}

export default StockPage;