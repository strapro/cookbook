import { Result } from 'htmlmetaparser'
import BaseExtractor from './base';

export default class ImageExtractor extends BaseExtractor {
    public extract(metadata: Result): string {
        if (metadata.jsonld) {
            let recipe = this.getSingleFromArray(metadata.jsonld, (item) => item['@type'] === 'Recipe');

            if (recipe) {
                return this.getActualValue(this.getSingleFromArray(recipe.image));
            }
        }

        if (metadata.microdata && metadata.microdata['@graph']) {
            let recipe = this.getSingleFromArray(metadata.microdata['@graph'], (item) => item['@type'] === 'Recipe');

            if (recipe) {
                return this.getActualValue(this.getSingleFromArray(recipe.image));
            }
        }

        if (metadata.rdfa && metadata.rdfa['@graph']) {
            let recipe = this.getSingleFromArray(metadata.rdfa['@graph'], (item) => item['og:image'] !== undefined);

            if (recipe) {
                return this.getActualValue(this.getSingleFromArray(recipe['og:image']));
            }
        }

        return 'recipe_cover.png';
    }
}