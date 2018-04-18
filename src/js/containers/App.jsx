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
  Menu,
  Flag
} from "semantic-ui-react";
import axios from "axios";
import convert from "xml-js";
import currencyCodes from "../constants/currencyCodes";

import NoDataMessage from "../components/NoData";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      isLoading: true
    };
  }

  componentDidMount() {
    axios
      .get(`https://data.norges-bank.no/api/data/EXR?lastNObservations=1`) // fetch the current XKCD comic. The site does not support CORS requests, so we make the request via a pass-through node server
      .then(response => {
        const result = convert.xml2js(response.data, {
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
        this.setState({ currencies: parsedData });
        console.log(parsedData);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  parseCurrencyData = currencyData => {
    return "hello";
  };

  selectCurrency = currency => {
    const oldCurrencies = this.state.currencies;
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
    this.setState({ currencies: newCurrencies });
  };

  deselectCurrency = currency => {
    const oldCurrencies = this.state.currencies;
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
    this.setState({ currencies: newCurrencies });
  };

  deselectAll = () => {
    const oldCurrencies = this.state.currencies;
    const newCurrencies = oldCurrencies.map(currencyItem => {
      return  {
            baseCurrency: currencyItem.baseCurrency,
            quoteCurrency: currencyItem.quoteCurrency,
            timePeriod: currencyItem.timePeriod,
            rate: currencyItem.rate,
            selected: false
          }
    });
    this.setState({ currencies: newCurrencies });
  }

  renderCurrenciesNotSelected = currencies => {
    return currencies
      .filter(
        currency => currencyCodes[currency.baseCurrency] && currency.selected === false
      )
      .map(currency => (
        <Button
          key={currency.baseCurrency}
          className="currency-button"
          onClick={() => this.selectCurrency(currency.baseCurrency)}
        >
          <span className="currency-name">{currency.baseCurrency}</span>
          <span className="flag-span">
            <Flag name={currencyCodes[currency.baseCurrency].toLowerCase()} />
          </span>
          <span className="currency-rate">
            current rate in NOK: {currency.rate}
          </span>
          <span className="currency-star">
            <Icon name="star" size="small" />
          </span>
        </Button>
      ));
  };

  renderCurrenciesSelected = currencies => {
    return currencies
      .filter(
        currency => currencyCodes[currency.baseCurrency] && currency.selected
      )
      .map(currency => (
        <Button
          key={currency.baseCurrency}
          className="currency-button"
          onClick={() => this.deselectCurrency(currency.baseCurrency)}
          color="green"
        >
          <span className="currency-name">{currency.baseCurrency}</span>
          <span className="flag-span">
            <Flag name={currencyCodes[currency.baseCurrency].toLowerCase()} />
          </span>
          <span className="currency-rate">
            current rate in NOK: {currency.rate}
          </span>
          <span className="currency-star">
            <Icon name="star" size="small" className="selected"/>
          </span>
        </Button>
      ));
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
              <span>click to de-select</span><Button className="deselect-button" small onClick={() => this.deselectAll()} color="blue">deselect all</Button>
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={1} />
            <Grid.Column width={6}>
              <Segment>
                {this.renderCurrenciesNotSelected(this.state.currencies)}
              </Segment>
            </Grid.Column>
            <Grid.Column width={2} />
            <Grid.Column width={6}>
              <Segment>
                {this.renderCurrenciesSelected(this.state.currencies)}
              </Segment>
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
