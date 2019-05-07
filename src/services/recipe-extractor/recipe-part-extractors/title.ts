import { Result } from 'htmlmetaparser'
import BaseExtractor from './base';

export default class TitleExtractor extends BaseExtractor {
    public extract(metadata: Result): string {
        if (metadata.jsonld) {
            let recipe = this.getSingleFromArray(metadata.jsonld, (item) => item['@type'] === 'Recipe');

            if (recipe) {
                return this.getActualValue(recipe.name);
            }
        }

        if (metadata.microdata && metadata.microdata['@graph']) {
            let recipe = this.getSingleFromArray(metadata.microdata['@graph'], (item) => item['@type'] === 'Recipe');

            if (recipe) {
                return this.getActualValue(recipe.name);
            }
        }

        if (metadata.rdfa && metadata.rdfa['@graph']) {
            let recipe = this.getSingleFromArray(metadata.rdfa['@graph'], (item) => item['og:image'] !== undefined);

            if (recipe) {
                return this.getActualValue(this.getSingleFromArray(recipe['og:title']));
            }
        }

        return 'Recipe';
    }
}