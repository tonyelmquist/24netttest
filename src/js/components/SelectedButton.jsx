import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Icon,
  Flag
} from "semantic-ui-react";

import currencyCodes from "../constants/currencyCodes";

const SelectedButton = props => (
  <Button
    key={props.currency.baseCurrency}
    className="currency-button"
    onClick={() => props.handleClick(props.currency.baseCurrency)}
    color={props.returnSelected ? "green" : "grey"}
  >
    <span className="currency-name">{props.currency.baseCurrency}</span>
    <span className="flag-span">
      <Flag
        name={currencyCodes[props.currency.baseCurrency].toLowerCase()}
      />
    </span>
    <span className="currency-rate">
      current rate in NOK: {props.currency.rate}
    </span>
    <span className="currency-star">
      <Icon name="star" size="small" className={props.returnSelected ? "selected" : "unselected"} />
    </span>
  </Button>
);

SelectedButton.propTypes = {
  currency: PropTypes.object,
  handleClick: PropTypes.func,
  returnSelected: PropTypes.bool,
};

export default SelectedButton;
