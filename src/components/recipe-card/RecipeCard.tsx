import React, { Component, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import template from './RecipeCard.view'
import Recipe from "../../models/recipe";

interface RecipeCardProps {
    loading: boolean,
    error: boolean,
    recipe: Recipe,
}

interface RecipeCardState {
    previousHeight: number,
    expanded: boolean
}

export default class RecipeCard extends Component<RecipeCardProps, RecipeCardState> {
    domElement: HTMLElement;

    state = {
        previousHeight: 365,
        expanded: false,
    };

    // =================================================================================================================

    public componentDidMount() {
        this.domElement = ReactDOM.findDOMNode(this) as HTMLElement;
    }

    public componentDidUpdate() {
        if (this.props.recipe === undefined) {
            this.state.expanded = false;
        }

        setTimeout(() => {
            let height = this.domElement.offsetHeight ? this.domElement.offsetHeight : 365;

            if (this.state.previousHeight != height) {
                this.setState(state => ({ previousHeight: height }));
            }
        }, 500);
    };

    public render() {
        return template.bind(this)();
    }

    // =================================================================================================================

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !this.state.expanded }));
    };
}