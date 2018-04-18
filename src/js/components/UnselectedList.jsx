import React from 'react';
import PropTypes from 'prop-types';
import {
  Segment,
} from "semantic-ui-react";
import currencyCodes from "../constants/currencyCodes";
import UnselectedButton from './UnselectedButton';

const UnselectedList = props => (
    <Segment>
        {props.currencies.filter(
        currency => currencyCodes[currency.baseCurrency] && currency.selected === false
      ).map(currency => (
       <UnselectedButton currency={currency} handleClick={props.handleClick} />
      ))}
    </Segment>
);

UnselectedList.defaultProps = {
    currencies: [],
};


UnselectedList.propTypes = {
    currencies: PropTypes.array,
    handleClick: PropTypes.func,
};

export default UnselectedList;
