export default interface Scrapper {
    getHtml(url: string): Promise<string>;
}