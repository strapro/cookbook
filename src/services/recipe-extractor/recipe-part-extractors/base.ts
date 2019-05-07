import { Result } from 'htmlmetaparser'
import { isArray, isString, isNull, isUndefined, isObject } from 'util';

export default abstract class BaseExtractor {
    protected element: HTMLDivElement;

    constructor() { 
        this.element = document.createElement('div');
    }

    abstract extract(metadata: Result): string | Array<string>;

    protected getSingleFromArray<T>(items: T | Array<T>, filterPredicate?: (item: T) => boolean): T | null {
        if (!isArray(items)) {
            items = [items];
        }

        if (filterPredicate) {
            let filtered = items.filter((item) => {
                return filterPredicate(item);
            });

            return filtered.length > 0 ? filtered[0] : null;
        }

        return items[0];
    }

    protected getArrayFromSingle(steps: Array<string> | string | { [key: string]: string } ): Array<string> {
        if (isArray(steps)) return steps;
        if (isString(steps)) return steps.split(/\r\n|\n\r|\r|\n|<br\/>/);
        if (isObject(steps)) return this.getActualValue(steps).split(/\r\n|\n\r|\r|\n|<br\/>/);

        return [];
    }

    protected getActualValue(object: { [key: string]: string } | string, keysToCheck: Array<string> = ['@value', 'url', 'text']): string {
        if (isNull(object) || isUndefined(object)) return '';
        if (isString(object)) return this.decodeEntities(object);

        for(let i = 0; i < keysToCheck.length; i++) {
            if (object[keysToCheck[i]]) return this.decodeEntities(object[keysToCheck[i]]);
        }
        
        return '';
    }

    private decodeEntities(text: string) {
        if(text && typeof text === 'string') {
          // strip script/html tags
          text = text.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
          text = text.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
          this.element.innerHTML = text;
          text = this.element.textContent ? this.element.textContent : '' ;
          this.element.textContent = '';
        }
    
        return text;
  }
}