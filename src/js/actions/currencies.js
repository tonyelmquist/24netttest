import Actions from '../constants/reduxConstants';

export function setCurrencies(currencies) {
    return { type: Actions.SET_CURRENCIES, currencies };
}