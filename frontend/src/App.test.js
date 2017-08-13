import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Overview from './Overview';
import Review from './Review';

import ReactTestUtils from 'react-dom/test-utils';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('shows 2 lists on the main page', () => {
    var component = ReactTestUtils.renderIntoDocument(
       <Overview />
    );

    var best = ReactTestUtils.findRenderedDOMComponentWithClass(
      component,
      'best_products'
    )

    var recent = ReactTestUtils.findRenderedDOMComponentWithClass(
      component,
      'recent_products'
    )
});