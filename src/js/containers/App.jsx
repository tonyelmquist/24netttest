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
import convert from "xml-js";
import SelectedList from "../components/SelectedList";
import {setCurrencies} from '../actions/currencies';

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
        const parsedData = this.parseCurrencyData(response.data);
        this.props.dispatch(setCurrencies(parsedData));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  parseCurrencyData = currencyData => {
    const result = convert.xml2js(currencyData, {
      compact: true,
      spaces: 4
    });
    const dataSet =
      result["message:StructureSpecificData"]["message:DataSet"]["Series"];
    let parsedData = dataSet.map(item => {
      const quoteItem = {
        baseCurrency: item._attributes.BASE_CUR,
        quoteCurrency: item._attributes.QUOTE_CUR,
        timePeriod: item.Obs._attributes.TIME_PERIOD,
        rate: item.Obs._attributes.OBS_VALUE,
        selected: false
      };
      return quoteItem;
    });
    const filterTime = parsedData[parsedData.length - 1].timePeriod;
    parsedData = parsedData.filter(item => item.timePeriod === filterTime);
    return parsedData;
  };

  selectCurrency = currency => {
    const oldCurrencies = this.props.currencies;
    const newCurrencies = oldCurrencies.map(currencyItem => {
      return currencyItem.baseCurrency === currency
        ? {
            baseCurrency: currencyItem.baseCurrency,
            quoteCurrency: currencyItem.quoteCurrency,
            timePeriod: currencyItem.timePeriod,
            rate: currencyItem.rate,
            selected: true
          }
        : currencyItem;
    });
    this.props.dispatch(setCurrencies(newCurrencies));
  };

  deselectCurrency = currency => {
    const oldCurrencies = this.props.currencies;
    const newCurrencies = oldCurrencies.map(currencyItem => {
      return currencyItem.baseCurrency === currency
        ? {
            baseCurrency: currencyItem.baseCurrency,
            quoteCurrency: currencyItem.quoteCurrency,
            timePeriod: currencyItem.timePeriod,
            rate: currencyItem.rate,
            selected: false
          }
        : currencyItem;
    });
    this.props.dispatch(setCurrencies(newCurrencies));
  };

  deselectAll = () => {
    const oldCurrencies = this.props.currencies;
    const newCurrencies = oldCurrencies.map(currencyItem => {
      return {
        baseCurrency: currencyItem.baseCurrency,
        quoteCurrency: currencyItem.quoteCurrency,
        timePeriod: currencyItem.timePeriod,
        rate: currencyItem.rate,
        selected: false
      };
    });
    this.props.dispatch(setCurrencies(newCurrencies));
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
