import React from 'react';
import PropTypes from 'prop-types';
import {
  Segment,
} from "semantic-ui-react";
import currencyCodes from "../constants/currencyCodes";
import SelectedButton from './SelectedButton';

const SelectedList = props => (
    <Segment>
        {props.currencies.filter(
        currency => currencyCodes[currency.baseCurrency] && currency.selected === true
      ).map(currency => (
       <SelectedButton currency={currency} handleClick={props.handleClick} />
      ))}
    </Segment>
);

SelectedList.defaultProps = {
    currencies: [],
};


SelectedList.propTypes = {
    currencies: PropTypes.array,
    handleClick: PropTypes.func,
};

export default SelectedList;
