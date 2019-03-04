import React, { Component, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import template from './RecipeCard.view.jsx'
import RecipeExtractor from '../../services/recipe-extractor';

class RecipeCard extends Component {
  recipeExtractor: RecipeExtractor;
  domElement: HTMLElement;
  state = {
    url: '',
    previousHeight: 365,
    expanded: false,
    loading: true,
    error: false,
    recipe: null,
  }

  componentDidMount = () => {
    this.recipeExtractor = new RecipeExtractor();
    this.domElement = ReactDOM.findDOMNode(this) as HTMLElement;
  }

  componentDidUpdate = () => {
    setTimeout(() => {
      let height = this.domElement.offsetHeight ? this.domElement.offsetHeight : 365;
      
      if (this.state.previousHeight != height){
        this.setState(state => ({ previousHeight: height }));
      }
    }, 500); 
  }

  handleLoad = async (state: number) => {
    /* Set state to default. Loading, no error and no recipe */
    this.setState(state => ({ 
      loading: true,
      error: false,
      expanded: false,
      recipe: null,
    }));

    const parsedRecipe = await this.recipeExtractor.getRecipe(this.state.url);
    
    if (state == 1){ // Loaded recipe succesfully
      this.setState(state => ({ 
        loading: false,
        recipe: parsedRecipe 
      }));
    }
    else if (state == 2){ // No recipe found
      this.setState(state => ({ 
        loading: false,
        recipe: null
      }));
    } else { // Error
      this.setState(state => ({ 
        loading: false,
        error: true
      }));
    }
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !this.state.expanded }));
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newUrl = event.target.value;

    this.setState(state => ({url: newUrl}));
  }

  render = () => {
    return template.bind(this)();
  }
}

export default RecipeCard;
