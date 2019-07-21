import React from 'react';
import styles from './App.module.scss';
import RecipeCard from '../recipe-card/RecipeCard';
import MockControls from "../mock-controls/MockControls";

export default function template() {
    return (
        <div>
            <header className={styles.header}>
                <MockControls
                    onGetHtmlStart={this.parseRecipeStart}
                    onGetHtmlComplete={this.parseRecipeSuccess}
                    onGetHtmlError={this.parseRecipeError}/>
                <RecipeCard
                    loading={this.state.loading}
                    error={this.state.error}
                    recipe={this.state.recipe}/>
            </header>
        </div>
    );
};
