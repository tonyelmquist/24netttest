import Actions from "../constants/reduxConstants";
import convert from "xml-js";

const defaultState = {
  currencies: []
};

export default function currencies(state = defaultState, action) {
  let newCurrencies;
  switch (action.type) {
    case Actions.SELECT_CURRENCY:
      newCurrencies = state.currencies.map(currencyItem => {
        return currencyItem.baseCurrency === action.currencyName
          ? {
              baseCurrency: currencyItem.baseCurrency,
              quoteCurrency: currencyItem.quoteCurrency,
              timePeriod: currencyItem.timePeriod,
              rate: currencyItem.rate,
              selected: true
            }
          : currencyItem;
      });
      return {
        currencies: newCurrencies
      };
    case Actions.DESELECT_CURRENCY:
      newCurrencies = state.currencies.map(currencyItem => {
        return currencyItem.baseCurrency === action.currencyName
          ? {
              baseCurrency: currencyItem.baseCurrency,
              quoteCurrency: currencyItem.quoteCurrency,
              timePeriod: currencyItem.timePeriod,
              rate: currencyItem.rate,
              selected: false
            }
          : currencyItem;
      });
      return {
        currencies: newCurrencies
      };
    case Actions.SET_CURRENCIES:
      const result = convert.xml2js(action.currencyData, { // converting XML to JSON rather than retrieving JSON directly because the JSON from the API was difficult to parse
        compact: true,
        spaces: 4
      });
      const dataSet =
        result["message:StructureSpecificData"]["message:DataSet"]["Series"]; //this is where the series are located in the JSON once the XML has been parsed
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
      return {
        currencies: parsedData
      };
    case Actions.DESELECT_ALL:
      newCurrencies = state.currencies.map(currencyItem => {
        return {
          baseCurrency: currencyItem.baseCurrency,
          quoteCurrency: currencyItem.quoteCurrency,
          timePeriod: currencyItem.timePeriod,
          rate: currencyItem.rate,
          selected: false
        };
      });
      return {
        currencies: newCurrencies
      };
    default:
      return state;
  }
}
