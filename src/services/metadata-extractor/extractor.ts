import * as metaparser from 'htmlmetaparser'
import * as htmlparser from 'htmlparser2'

export default class Extractor {
    public async getMetadata(url: string, html: string): Promise<metaparser.Result> {
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

            parser.write(html);
            parser.done();
        });
    }

    private baseUrl(url: string): string {
        const pathArray = url.split('/'),
            protocol = pathArray[0],
            host = pathArray[2],
            baseUrl = protocol + '//' + host;

        return baseUrl;
    }
}