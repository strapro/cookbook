import React from 'react';
import ReactDOM from 'react-dom';
import RecipeCard from './RecipeCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RecipeCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
