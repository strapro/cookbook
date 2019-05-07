import { Result } from 'htmlmetaparser'
import BaseExtractor from './base';

export default class DescriptionExtractor extends BaseExtractor {
    public extract(metadata: Result): string {
        if (metadata.jsonld) {
            let recipe = this.getSingleFromArray(metadata.jsonld, (item) => item['@type'] === 'Recipe');

            if (recipe && recipe.description) {
                return this.getActualValue(recipe.description);
            }
        }

        if (metadata.microdata && metadata.microdata['@graph']) {
            let recipe = this.getSingleFromArray(metadata.microdata['@graph'], (item) => item['@type'] === 'Recipe');

            if (recipe && recipe.description) {
                return this.getActualValue(recipe.description);
            }
        }

        if (metadata.rdfa && metadata.rdfa['@graph']) {
            let recipe = this.getSingleFromArray(metadata.rdfa['@graph'], (item) => item['og:image'] !== undefined);

            if (recipe && recipe['og:description']) {
                return this.getActualValue(this.getSingleFromArray(recipe['og:description']));
            }
        }

        return '';
    }
}