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
        currency => currencyCodes[currency.baseCurrency] && currency.selected === props.returnSelected
      ).map(currency => (
       <SelectedButton key={currency.baseCurrency} returnSelected={props.returnSelected} currency={currency} handleClick={props.handleClick} />
      ))}
    </Segment>
);

SelectedList.defaultProps = {
    currencies: [],
};


SelectedList.propTypes = {
    currencies: PropTypes.array,
    handleClick: PropTypes.func,
    returnSelected: PropTypes.bool,
};

export default SelectedList;
