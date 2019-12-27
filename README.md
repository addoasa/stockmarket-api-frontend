 <div class="center">
<p align="center"><img src="https://user-images.githubusercontent.com/523933/49741959-91a1da00-fc65-11e8-911f-521331f87174.png" align="center" width="20%" height="20%"></p>
  <h3 align="center">Clear Street</h3>
  <p align="center">
  Frontend Developer Screening
</p>
</div>

---

This repository contains parts of your interview. Your repository is private; only you and Clear Street team members can view it.

Please create a new branch of `master` to complete your work. Once you are satisfied, create a pull request to merge your work into `master`. The pull request will let us know you are finished.

## Background:

This repository comes with a [React](https://reactjs.org/) project already set up for you (created using [create-react-app](https://create-react-app.dev/)). In addition to the frontend boilerplate, we've created a simple mock API for you to use with your browser application. Since we exclusively use React at Clear Street, we want to see that you're comfortable using the framework.

If you're new to React, use this exercise as an opportunity to evaluate whether or not you'd like to use it in a fulltime position.

In addition to using React, we would like you to use the [Bootstrap](https://getbootstrap.com/) design framework. Bootstrap and two React/Bootstrap libraries ([reactstrap](http://reactstrap.github.io/) and [react-bootstrap](https://react-bootstrap.github.io/)) are already included in the project's dependencies. While we would like for you to use Bootstrap to style your app, using the React/Bootstrap libraries is optional.

Feel free to use `sass`/`scss` or `less` for your stylesheets. If you would like to upgrade the project to use `typescript` or `flow` you may do so as well. Apart from React and Bootstrap there are no restrictions on the libraries/frameworks that you may use.

We've added ESLint to save you time in setting up your environment, but feel free to change/disable rules to your liking.

## Goals:

The goal of this exercise is to provide an opportunity for you to demonstrate your skills in React, UX/UI, design and architecting frontend applications.

There aren't good or bad solutions; rather, there are solutions that match the requirements and some that don't. There are solutions that might be considered elegant by some and solutions that would be considered clever. We want to see you iterate on this and show us the best of what you do!

## Getting started:

1. Please use Node version `12.13.0` to avoid any issues with the boilerplate dependencies.

2. Clone the repository, `cd` to the project directory and install dependencies in the root of the project and the server directory:
   ```bash
   $ npm i
   $ npm --prefix=$PWD/server i
   ```
3. Start the mock API server by running `npm run server`:

   ```bash
   $ npm run server

     Loaded 364 stocks
     Server running on http://localhost:4000
   ```

4. Documentation on the API is at [http://localhost:4000/documentation#/](http://localhost:4000/documentation#/):

   ![documentation](/documentation.png)

5. To start a CRA development build run `npm run start` and your default browser should open up to [http://localhost:3000](http://localhost:3000):

   ```bash
   $ npm run start

     Compiled successfully!

     You can now view frontend-screening in the browser.

       Local:            http://localhost:3000/
       On Your Network:  http://10.91.90.111:3000/

     Note that the development build is not optimized.
     To create a production build, use npm run build.

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

## Expectations:

We estimate that a working product will take ~4 hours to build, however, there is no time limitation. Please feel free to spend as little or as much time as you would like. If you are struggling to find sufficient time in your schedule, please let us know, and we will do our best to help.

Please include a README explaining your process and providing clear instructions for compiling and running your project.

Don't stress out over this exercise, it's a chance to open a conversation about your work on a real project.

The most important aspect of this take-home is to demonstrate that you can write clean, understandable and error/bug-free code that meets the specifications.

In addition to the above please take the following into consideration:

- Have you checked your code for linting errors, bugs, edge cases and misc. `console.log`s used during development?
- How is the UX with respect to data fetching? Does the UI indicate loading when making requests to the API?
- How efficient is your code? Do you make any unnecessary requests to the backend? Do you use throttling to reduce API calls?
- Are values, inputs and links clearly labeled?

## Clear Street Evaluation:

- How much time did you spend on the exercise, what parts took longer?
- What were the hard parts, what parts did you enjoy most?
- What parts of the code are you proud of, were there any novel solutions you created?
- Is your code tested? Why/why not? How would you test it (or test it better)?
