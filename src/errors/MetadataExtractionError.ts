export default class MetadataExtractionError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = MetadataExtractionError.name;
    }
}