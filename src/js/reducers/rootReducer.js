import Actions from '../constants/reduxConstants';

const defaultState = {
    currencies: []
};

export default function currencies(state = defaultState, action) {
    switch (action.type) {
    case Actions.SET_CURRENCIES:
        return {
            currencies: action.currencies
        };
    default:
        return state;
    }
}
