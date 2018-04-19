import * as actions from '../currencies';
import Actions from '../../constants/ReduxConstants';

describe('actions', () => {
  it('should create an action to set currencies', () => {
    const currencies = [{baseCurrency: 'USD',
              quoteCurrency: 'NOK',
              timePeriod: '2017',
              rate: 7.75,
              selected: false}]
    const expectedAction = {
      type: Actions.SET_CURRENCIES,
      currencyData: currencies,
    }
    expect(actions.setCurrencies(currencies)).toEqual(expectedAction)
  })

    it('should create an action to select a currency', () => {
    const currency = 'USD'
    const expectedAction = {
      type: Actions.SELECT_CURRENCY,
      currencyName: currency,
    }
    expect(actions.selectCurrency(currency)).toEqual(expectedAction)
  })

    it('should create an action to deselect a currency', () => {
    const currency = 'USD'
    const expectedAction = {
      type: Actions.DESELECT_CURRENCY,
      currencyName: currency,
    }
    expect(actions.deselectCurrency(currency)).toEqual(expectedAction)
  })


  it('should create an action to deselect all', () => {
    const expectedAction = {
      type: Actions.DESELECT_ALL,
    }
    expect(actions.deselectAll()).toEqual(expectedAction)
  })

})