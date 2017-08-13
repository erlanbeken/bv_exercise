import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { HashRouter, Route } from 'react-router-dom'

import Overview from './Overview';
import Review from './Review';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <HashRouter>
            <div>
                <Route exact path="/" component={Overview} />
                <Route path="/review" component={Review} />
            </div>
          </HashRouter>
        </div>
      </div>
    );
  }
}

export default App;
