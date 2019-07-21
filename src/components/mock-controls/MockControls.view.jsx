import React from 'react';
import styles from './MockControls.module.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import App from "../app/App";

export default function template() {
    return (
        <div className={styles.mockButton}>
            <div className={styles.main}>
                <TextField
                    id="standard-with-placeholder"
                    label="Recipe URL"
                    placeholder="http://allrecipes.com/most_tasty/recipe"
                    className={styles.textField}
                    margin="normal"
                    value={this.state.url}
                    onChange={this.handleInputChange}
                />
                <Button variant="contained" color="primary" onClick={() => this.handleMockClick(App.SUCCESS)}>
                    Scrap
                </Button>
                <Button variant="contained" onClick={() => this.handleMockClick(App.NO_METADATA)}>
                    Mock empty
                </Button>
                <Button variant="contained" color="secondary" onClick={() => this.handleMockClick(App.ERROR)}>
                    Mock error
                </Button>
            </div>
            <div className={styles.secondary}>
                <Button onClick={() => this.handlePopulateRandomClick('jsonld')}>
                    Random Jsonld
                </Button>
                <Button onClick={() => this.handlePopulateRandomClick('microdata')}>
                    Random Microdata
                </Button>
                <Button onClick={() => this.handlePopulateRandomClick('rfda')}>
                    Random Rfda
                </Button>
            </div>
        </div>
    );
};