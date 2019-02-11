import React, { Component } from 'react';
import template from './RecipeCard.view.jsx'

class RecipeCard extends Component {
  state = {
    expanded: false,
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !this.state.expanded }));
  };

  render() {
    return template.bind(this)();
  }
}

export default RecipeCard;
