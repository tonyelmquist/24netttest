import Actions from '../constants/ReduxConstants';

export function setCurrencies(currencyData) {
    return { type: Actions.SET_CURRENCIES, currencyData };
}

export function selectCurrency(currencyName) {
    return { type: Actions.SELECT_CURRENCY, currencyName };
}

export function deselectCurrency(currencyName) {
    return { type: Actions.DESELECT_CURRENCY, currencyName };
}

export function deselectAll() {
    return { type: Actions.DESELECT_ALL };
}