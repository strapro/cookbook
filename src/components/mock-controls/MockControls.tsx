import React, { Component, ChangeEvent } from 'react';
import template from './MockControls.view'
import Scrapper from '../../services/html-scrapper/scrapper';
import NetworkScrapper from '../../services/html-scrapper/network';

interface MockControlsProps {
    onGetHtmlStart: Function,
    onGetHtmlComplete: Function,
    onGetHtmlError: Function
}

interface MockControlsState {
    url: string
}

export default class MockControls extends Component<MockControlsProps, MockControlsState> {
    pools: { [category:string]: string[]} = {
        'jsonld': [
            'https://www.mamapeinao.gr/xoirines-mprizoles-sto-fourno',
            'https://akispetretzikis.com/el/categories/kreas/choirino-me-glykoxinh-saltsa',
            'http://www.foodnetwork.co.uk/recipes/totally-lazy-mini-sausage-rolls.html',
            'https://www.taste.com.au/recipes/spicy-chicken-chickpea-hotpot/t5yne9e9',
            'https://www.hellofresh.ca/recipes/miso-pesto-shrimp-ramen-5bd1f0e7ae08b512564a9a22?locale=en-CA'
        ],
        'microdata': [
            'http://www.funkycook.gr/xorta-tsigariasta-auga-feta',
            'https://cookpad.com/gr/sintages/7248593-almuro-keik-manitarion',
            'https://www.argiro.gr/recipe/banoffee-dipli-apolausi',
            'https://www.allrecipes.com/recipe/233259/surf-and-turf-for-two'
        ],
        'rfda': [
            'https://www.yiannislucacos.gr/recipe/kotopoylo-poylerika-eortastiko-geyma/7555/kotopoylo-ston-foyrno-me-hristoygenniatiki-gemisi',
            'https://www.chefoulis.gr/ζυγούρι-στη-λαδόκολλα-με',
            'https://www.star.gr/lifestyle/syntages/451248/syntagh-agioy-balentinoy-rolakia-kanelas',
            'https://www.queen.gr/mageirikh/syntages/story/172766/kremmydopita-me-tyri-kai-mpeikon'
        ]
    };
    htmlScrapper: Scrapper;

    state = {
        url: '',
    };

    // =================================================================================================================

    public componentDidMount() {
        this.htmlScrapper =  new NetworkScrapper();
    }

    public render() {
        return template.bind(this)();
    }

    // =================================================================================================================

    private setUrl(newUrl: string) {
        this.setState(state => ({ url: newUrl }));
    }

    // =================================================================================================================

    handleMockClick = async (mockedStatus: number) => {
        this.props.onGetHtmlStart && this.props.onGetHtmlStart();

        try {
            const html = await this.htmlScrapper.getHtml(this.state.url);

            this.props.onGetHtmlComplete && this.props.onGetHtmlComplete(this.state.url, html, mockedStatus);
        } catch (e) {
            this.props.onGetHtmlError && this.props.onGetHtmlError();
        }
    };

    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newUrl = event.target.value;

        this.setUrl(newUrl);
    };

    handlePopulateRandomClick = (category: string) => {
        const randomUrl = this.pools[category][Math.floor(Math.random()*this.pools[category].length)];

        this.setUrl(randomUrl);
    }
}
