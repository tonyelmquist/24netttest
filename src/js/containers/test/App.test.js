import React from "react";
import renderer from 'react-test-renderer';
import {createStore} from 'redux';
import App from '../App';
import rootReducer from '../../reducers/rootReducer';

const store = createStore(rootReducer);

it('should render correctly', () => {
  const component = renderer.create(<App store={store} />)
  expect(component.toJSON()).toMatchSnapshot()
})