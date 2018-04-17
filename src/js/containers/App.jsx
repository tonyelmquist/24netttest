import React from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Segment,
  Container,
  Header,
  Icon,
  Checkbox,
  Image,
  Grid,
  Sidebar,
  Menu
} from "semantic-ui-react";
import axios from "axios";

import NoDataMessage from "../components/NoData";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyNames: [],
      unselectedCurrencies: [],
      selectedCurrencies: [],
      currentRates: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get(`https://data.norges-bank.no/api/data/EXR?lastNObservations=1&format=sdmx-json`) // fetch the current XKCD comic. The site does not support CORS requests, so we make the request via a pass-through node server
      .then(response => {
        this.setState({});
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="app">         
            <Segment basic>
              <p>Hello</p>
            </Segment>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
