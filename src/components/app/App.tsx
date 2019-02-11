import React, { Component } from 'react';
import template from './App.view.jsx'

class App extends Component {
  render() {
    return template.bind(this)();
  }
}

export default App;
