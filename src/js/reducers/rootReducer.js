import Actions from "../constants/reduxConstants";

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
      return {
        currencies: action.currencies
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
