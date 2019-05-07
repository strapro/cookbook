import { Result } from 'htmlmetaparser'
import AvatarExtractor from './recipe-part-extractors/avatar';
import TitleExtractor from './recipe-part-extractors/title';
import SubheaderExtractor from './recipe-part-extractors/subheader';
import ImageExtractor from './recipe-part-extractors/image';
import DescriptionExtractor from './recipe-part-extractors/description';
import StepsExtractor from './recipe-part-extractors/steps';
import Recipe from '../../models/recipe';

export default class Extractor {
    private avatarExtractor: AvatarExtractor;
    private titleExtractor: TitleExtractor;
    private subheaderExtractor: SubheaderExtractor;
    private imageExtractor: ImageExtractor;
    private descriptionExtractor: DescriptionExtractor;
    private stepsExtractor: StepsExtractor;

    constructor() {
        this.avatarExtractor =  new AvatarExtractor();
        this.titleExtractor = new TitleExtractor();
        this.subheaderExtractor = new SubheaderExtractor();
        this.imageExtractor =  new ImageExtractor();
        this.descriptionExtractor = new DescriptionExtractor();
        this.stepsExtractor =  new StepsExtractor();
    }

    public getRecipe(meta: Result): Recipe {
        return {
            avatar: this.avatarExtractor.extract(meta),
            title: this.titleExtractor.extract(meta),
            subheader: this.subheaderExtractor.extract(meta),
            image: this.imageExtractor.extract(meta),
            description: this.descriptionExtractor.extract(meta),
            steps: this.stepsExtractor.extract(meta),
        };
    }
}