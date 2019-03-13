import * as metaparser from 'htmlmetaparser'
import * as htmlparser from 'htmlparser2'
import Recipe from '../models/recipe';
import { isArray, isString } from 'util';
import { ninvoke } from 'q';

export default class RecipeExtractor {
    public async getRecipe(url: string): Promise<Recipe> {
        const meta = await this.getMetadata(url);

        return {
            avatar: this.getAvatar(meta),
            title: this.getTitle(meta),
            subheader: this.getSubheader(meta),
            image: this.getImage(meta),
            description: this.getDescription(meta),
            steps: this.getSteps(meta),
        };
    }
      
    //==============================================================================================================================

    private async getMetadata(url: string): Promise<metaparser.Result> {
        return new Promise(async (resolve) => {
            const handler = new metaparser.Handler(
                (err, result: metaparser.Result) => {
                    console.log(result);
                    resolve(result);
                },
                {
                    url: this.baseUrl(url) // The HTML pages URL is used to resolve relative URLs.
                }
            ),
            parser = new htmlparser.Parser(handler, { decodeEntities: true });

            parser.write(await this.getHtml(url));
            parser.done();
        });
    }

    private async getHtml(url: string): Promise<string> {
        const response = await fetch(url);

        return await response.text();
    }

    private baseUrl(url: string): string {
        const pathArray = url.split( '/' ),
            protocol = pathArray[0],
            host = pathArray[2],
            baseUrl = protocol + '//' + host;

        return baseUrl; 
    }

    //==============================================================================================================================


    private getAvatar(metadata: metaparser.Result): string {
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
            })

            return metadata.icons[0].href;
        }
        
        return 'recipe.png';
    }

    private getTitle(metadata: metaparser.Result): string {
        return 'Shrimp and Chorizo Paella';
    }

    private getSubheader(metadata: metaparser.Result): string {
        if (metadata.html) {
            const url = (metadata.html.canonical ? this.baseUrl(metadata.html.canonical) : metadata.html.author) || '';
            
            return url
                .replace('https://', '')
                .replace('http://', '')
                .replace('www.', '');
        }
        return '';
    }

    private getImage(metadata: metaparser.Result): string {
        if(metadata.jsonld) {
            let recipe = this.getSingleFromArray(metadata.jsonld, (item) => item['@type'] === 'Recipe');

            if(recipe) {
                return this.getActualImage(this.getSingleFromArray(recipe.image));
            }
        }

        if(metadata.microdata && metadata.microdata['@graph']) {
            let recipe = this.getSingleFromArray(metadata.microdata['@graph'], (item) => item['@type'] === 'Recipe');
        
            if(recipe) {
                return this.getActualImage(this.getSingleFromArray(recipe.image));
            }
        } 
        
        if(metadata.rdfa && metadata.rdfa['@graph']) {
            let recipe = this.getSingleFromArray(metadata.rdfa['@graph'], (item) => item['og:image'] !== undefined);
            
            if(recipe) {
                return this.getActualImage(recipe['og:image']);                 
            }
        }

        return 'paella.jpg';
    }

    private getDescription(metadata: metaparser.Result): string {
        return 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.';
    }

    private getSteps(metadata: metaparser.Result): Array<string> {
        return [
            'Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.',
            'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.',
            'Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)',
            'Set aside off of the heat to let rest for 10 minutes, and then serve.'
        ];
    }

    private getSingleFromArray<T>(items: T | Array<T>, filterPredicate?: (item: T) => boolean): T | null {
        if(!isArray(items)) {
            items = [items];
        }
    
        if(filterPredicate) {
            let filtered = items.filter((item) => {
                return filterPredicate(item);
            });

            return filtered.length > 0 ? filtered[0] : null;
        }

        return items[0];
    }

    private getActualImage(image: {[key: string]: string} | string): string {
        if(isString(image)) return image;

        if(image['@value']) return image['@value'];
        if(image['url']) return image['url'];

        return '';
    }
}