import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import {
  Button,
  Segment,
  Container,
  Grid,
} from "semantic-ui-react";
import PropTypes from 'prop-types';
import axios from "axios";
import SelectedList from "../components/SelectedList";
import {setCurrencies, selectCurrency, deselectCurrency, deselectAll} from '../actions/currencies';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    axios
      .get(`https://data.norges-bank.no/api/data/EXR?lastNObservations=1`) // fetch the current XKCD comic. The site does not support CORS requests, so we make the request via a pass-through node server
      .then(response => {
        console.log(response.data);
        this.props.dispatch(setCurrencies(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  selectCurrency = currency => {
    this.props.dispatch(selectCurrency(currency));
  };

  deselectCurrency = currency => {
    this.props.dispatch(deselectCurrency(currency));
  };

  deselectAll = () => {
    this.props.dispatch(deselectAll());
  };

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={6}>
              <h1>Currencies</h1>
              <p>click to select</p>
            </Grid.Column>
            <Grid.Column width={2} />
            <Grid.Column width={6}>
              <h1>Selected Currencies</h1>
              <span>click to de-select</span>
              <Button
                className="deselect-button"
                onClick={() => this.deselectAll()}
                color="blue"
              >
                deselect all
              </Button>
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={6}>
             <SelectedList
                currencies={this.props.currencies}
                handleClick={this.selectCurrency}
                returnSelected={false}
              />
            </Grid.Column>
            <Grid.Column width={2} />
            <Grid.Column width={6}>
              <SelectedList
                currencies={this.props.currencies}
                handleClick={this.deselectCurrency}
                returnSelected={true}
              />
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    currencies: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    currencies: state.currencies,
});

export default connect(mapStateToProps)(App);
