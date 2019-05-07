import { Result } from 'htmlmetaparser'
import BaseExtractor from './base';

export default class StepsExtractor extends BaseExtractor {
    public extract(metadata: Result): Array<string> {
        if (metadata.jsonld) {
            let recipe = this.getSingleFromArray(metadata.jsonld, (item) => item['@type'] === 'Recipe');

            if (recipe && recipe.recipeInstructions) {
                return this.getArrayFromSingle(recipe.recipeInstructions)
                                .map( (step: { [key: string]: string } | string) => {
                                    return this.getActualValue(step);
                                });
            }
        }

        if (metadata.microdata && metadata.microdata['@graph']) {
            let recipe = this.getSingleFromArray(metadata.microdata['@graph'], (item) => item['@type'] === 'Recipe');

            if (recipe && recipe.recipeInstructions) {
                return this.getArrayFromSingle(recipe.recipeInstructions)
                                .map( (step: { [key: string]: string } | string) => {
                                    return this.getActualValue(step);
                                });
            }
        }

        return [];
    }
}