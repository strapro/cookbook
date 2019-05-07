import Scrapper from "./scrapper";

export default class Network implements Scrapper {
    public async getHtml(url: string): Promise<string> {
        const response = await fetch(url);

        return await response.text();
    }
}