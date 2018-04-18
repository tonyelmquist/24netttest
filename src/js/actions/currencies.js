import Actions from '../constants/reduxConstants';

export function setCurrencies(currencies) {
    return { type: Actions.SET_CURRENCIES, currencies };
}

export function selectCurrency(currencyName) {
    return { type: Actions.SELECT_CURRENCY, currencyName };
}

export function deselectCurrency(currencyName) {
    return { type: Actions.SELECT_CURRENCY, currencyName };
}

export function deselectAll() {
    return { type: Actions.DESELECT_ALL };
}