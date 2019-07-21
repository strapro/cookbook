export default class RecipeExtractionError extends Error {
    constructor(message?: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = RecipeExtractionError.name;
    }
}