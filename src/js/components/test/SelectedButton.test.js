import React from "react";
import renderer from 'react-test-renderer'
import SelectedButton from '../SelectedButton'

const currency = {"baseCurrency": "USD", "quoteCurrency": "NOK", "rate": "7.75", "selected": false, "timePeriod": "2017"};

it('should render correctly', () => {
  const component = renderer.create(<SelectedButton currency={currency}/>)
  expect(component.toJSON()).toMatchSnapshot()
})