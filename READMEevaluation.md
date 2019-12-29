
## Starting the Application:

 
1) Clone this repository while on the master branch and navigate to the root directory of the application.

2) Now you can install dependencies by running:
   ```bash
   $ npm i
   ```
3) However there are also dependencies within the server directory that you need to install. You can install them by running:

   ```bash
   $ npm --prefix=$PWD/server i
   ```
4) Concurrently is an npm package that allows you to run multiple scripts in a single script.  It allows us to run both the React application AND the mock API server at once. You can get started right away and run the application by running:

   ```bash
   $ npm run both
   ```

4.5) But if you'd like to run your React app and the mock server seperately you can start the mock API server by running:
   ```bash
   $ npm run server
   ```
   Mock API Documentation here [http://localhost:4000/documentation#/](http://localhost:4000/documentation#/):

 Then in another terminal window you can start up your create-react-app by running 
  ```bash
  $ npm run start
  ```



## Clear Street Evaluation:

- How much time did you spend on the exercise, what parts took longer?

> I spent quite sometime. Around 20 hours. I took a while working with bootstrap and reactstrap. I'm very used to writing the raw css by hand but since bootstrap was a requirement I aimed to learn and make use of react-strap. I've never used react-strap before. I disliked it for how heavy/dense it can make code look but found it useful for importing neat things like the loading spinner.

- What were the hard parts, what parts did you enjoy most?

> Getting the pagination to work correctly was tricky and took sometime. The scrolling solution I have now works but it isn't perfect. I'm sure there is a better way. I really enjoyed pushing through to get each feature to work, however much time it took.

- What parts of the code are you proud of, were there any novel solutions you created?

> I was pretty proud of getting the sorting feature to also work with search results. 

- Is your code tested? Why/why not? How would you test it (or test it better)?

> My code is not tested. This is purely because of the time constraint. I felt putting more energy toward thinking through the problems of the features to implement would have lead to more progress. If I had another day or two I would definitely implement jest testing and possibly some enzyme testing.

Thanks Clear Street 😀