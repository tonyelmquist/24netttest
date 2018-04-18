import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import rootReducer from '../reducers/rootReducer';
import App from './App';

class Root extends Component {

  constructor(props) {
    super(props);
  }

    render() {
        const store = createStore(rootReducer);
        return (
            <Provider store={store}>
                    <App />
            </Provider>
        );
    }
}

ReactDOM.render(<Root/>, document.getElementById("root"));

export default Root;