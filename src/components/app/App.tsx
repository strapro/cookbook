import React, { Component } from 'react';
import template from './App.view'
import MetadataExtractor from "../../services/metadata-extractor/extractor";
import RecipeExtractor from "../../services/recipe-extractor/extractor";
import Recipe from "../../models/recipe";
import RecipeExtractionError from "../../errors/RecipeExtractionError";
import MetadataExtractionError from "../../errors/MetadataExtractionError";
import ScrappingError from "../../errors/ScrappingError";

interface AppProps {

}

interface AppState {
    loading: boolean,
    error: boolean,
    recipe?: Recipe,
}

export default class App extends Component<AppProps, AppState> {
    public static readonly SUCCESS: number = 1;
    public static readonly NO_METADATA: number = 2;
    public static readonly ERROR: number = 3;

    metadataExtractor: MetadataExtractor;
    recipeExtractor: RecipeExtractor;

    state = {
        loading: true,
        error: false,
        recipe: undefined,
    };

    // =================================================================================================================

    public componentDidMount() {
        this.metadataExtractor = new MetadataExtractor();
        this.recipeExtractor = new RecipeExtractor();
    }

    public render() {
        return template.bind(this)();
    }

    // =================================================================================================================

    private setStatusToDefault() {
        this.setState(state => ({
            loading: true,
            error: false,
            recipe: undefined,
        }));
    }

    private setStatusToRecipe(recipe: Recipe) {
        this.setState(state => ({
            loading: false,
            recipe: recipe
        }));
    }

    private setStatusToNoMetadata() {
        this.setState(state => ({
            loading: false,
            recipe: undefined
        }));
    }

    private setStatusToError() {
        this.setState(state => ({
            loading: false,
            error: true
        }));
    }

    private mockError(mockedStatus: number) {
        if (mockedStatus === App.NO_METADATA) {
            throw new MetadataExtractionError("No metadata")
        } else if (mockedStatus === App.ERROR) {
            throw new ScrappingError("Couldn't get HTML")
        }
    }

    // =================================================================================================================

    parseRecipeStart = () => {
       this.setStatusToDefault();
    };

    parseRecipeSuccess = async (url: string, html: string, mockedStatus: number) => {
        try {
            if (mockedStatus !== undefined) this.mockError(mockedStatus);

            const metadata = await this.metadataExtractor.getMetadata(url, html);
            const parsedRecipe = this.recipeExtractor.getRecipe(metadata);

            this.setStatusToRecipe(parsedRecipe)
        } catch (e) {
            if (e instanceof RecipeExtractionError || e instanceof MetadataExtractionError) {
                this.setStatusToNoMetadata();
            }
            else {
                this.setStatusToError();
            }
        }
    };

    parseRecipeError = () => {
        this.setStatusToError();
    };
}