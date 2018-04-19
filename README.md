## 24Nettbutikk Currency Selector

A very simple React application that lets you view a list of currencies and choose your favorites to monitor.

**To run the app, first run**

    npm install

and then start the app by running  

    npm run start

this will start a webpack dev server to serve up the local files.

There are some basic unit tests for the action creators and snapshot tests for the components; to run the tests, run

    npm run test

**Notes:**

The application has all the business logic in the reducers (apart from the ajax call to the API). The API allowed you to fetch XML, CSV or JSON formatted data; I chose to retrieve XML and parse it into JSON because that provided a more sensible format than the JSON direct from the API, which had a rather complicated system of keys.

Test coverage is inadequate for the components and containers, but I decided it was more important to get you something to look at than to keep writing.

The App.jsx could be further componentized, and the asyc data fetch could be abstracted out to a utility function.
