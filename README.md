![alt text](./public/assets/stock-pagination.gif)

## Background:
A simple frontend user interface for interacting with a mock stock API.
A user is able to fetch data through searching, pagination and sorting by triggering the endpoints of the stock API.

## Getting started:


1. Clone the repository, `cd` to the project directory and install dependencies in the root of the project and the server directory:
   ```bash
   $ npm i
   $ npm --prefix=$PWD/server i
   ```
2. Start the mock API server by running `npm run server`:

   ```bash
   $ npm run server

     Loaded 364 stocks
     Server running on http://localhost:4000
   ```

3. Documentation on the API is at [http://localhost:4000/documentation#/](http://localhost:4000/documentation#/):

   ![documentation](/documentation.png)

4. To start a CRA development build run `npm run start` and your default browser should open up to [http://localhost:3000](http://localhost:3000):

   ```bash
   $ npm run start
   ```

5. To run both the server and the react app enter the following into your terminal while at root directory:

 ```bash
   $ npm run both 
 ```

## Requirements

Please create a sample application that resembles the mockups and meets the requirements below:
Your application should consist of two pages:

1. Home page `/`

   ![home_page](/page_home.jpeg)

   - Should present a list of stocks fetched from the mock API with the open, close, high, low and percentage change in price (from open to close) visible for each stock.
   - List should be paginated (either infinite-scroll or pagination buttons are acceptable)
   - List should be sortable by the exposed `sort` parameter (see API documentation)
   - The user should be able to search after a specific stock using an input in the navbar and the list should filter accordingly.
   - Clicking on a stock row should navigate the user to a detailed view (see below).

2. Stock detail page `/{cusip}`
   ![stock_page](/page_stock.jpeg)

   - Should be located at `/{cusip}` for the given stock
   - Name, symbol, open, close, change, high and low should be clearly visible
   - The navbar should include a button which returns the user back to the homepage





