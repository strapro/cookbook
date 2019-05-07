import { Result } from 'htmlmetaparser'
import BaseExtractor from './base';

export default class SubheaderExtractor extends BaseExtractor {
    public extract(metadata: Result): string {
        if (metadata.html) {
            const url = (metadata.html.canonical ? this.baseUrl(metadata.html.canonical) : metadata.html.author) || '';

            return url
                .replace('https://', '')
                .replace('http://', '')
                .replace('www.', '');
        }

        return '';
    }

    private baseUrl(url: string): string {
        const pathArray = url.split('/'),
            protocol = pathArray[0],
            host = pathArray[2],
            baseUrl = protocol + '//' + host;

        return baseUrl;
    }
}