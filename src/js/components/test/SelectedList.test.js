import React from "react";
import renderer from 'react-test-renderer'
import SelectedList from '../SelectedList'

  const testState = {   
        currencies: [{"baseCurrency": "USD", "quoteCurrency": "NOK", "rate": "7.75", "selected": false, "timePeriod": "2017"}, {"baseCurrency": "NOK", "quoteCurrency": "NOK", "rate": "7.75", "selected": false, "timePeriod": "2017"}]     
    }

it('should render correctly', () => {
  const component = renderer.create(<SelectedList currencies={testState.currencies}/>)
  expect(component.toJSON()).toMatchSnapshot()
})