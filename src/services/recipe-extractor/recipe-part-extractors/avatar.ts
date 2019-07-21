import { Result } from 'htmlmetaparser'
import BaseExtractor from './base';

export default class AvatarExtractor extends BaseExtractor {
    public extract(metadata: Result): string {
        // TODO icons can be better populated. Check out https://www.bbcgoodfood.com/recipes/easy-chicken-burritos example
        if (metadata.icons && metadata.icons.length > 0) {
            const icons = metadata.icons.filter((icon) => {
                return icon.href.indexOf('data:') === -1;
            });

            icons.sort((icon1, icon2) => {
                const icon1Size = icon1.sizes ? parseInt(icon1.sizes) : 0,
                    icon2Size = icon2.sizes ? parseInt(icon2.sizes) : 0;

                if (icon1Size < icon2Size) {
                    return 1;
                }
                if (icon1Size > icon2Size) {
                    return -1;
                }

                return 0;
            });

            return icons[0].href;
        }

        return 'recipe.png';
    }
}