import React from 'react';
import styles from './App.module.scss';
import logo from '../../logo.svg';
import RecipeCard from '../../components/recipe-card/RecipeCard';

export default function template() {
    return (
        <div className={styles.App}>
            <header className={styles["App-header"]}>
                <img src={logo} className={styles["App-logo"]} alt="logo" />
                <RecipeCard></RecipeCard>
            </header>
        </div>
    );
};
