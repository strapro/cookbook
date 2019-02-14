import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as metaparser from 'htmlmetaparser'
import * as htmlparser from 'htmlparser2'
import template from './RecipeCard.view.jsx'

class RecipeCard extends Component {
  domElement: HTMLElement;
  state = {
    previousHeight: 365,
    expanded: false,
    loading: true,
    error: false,
    recipe: null,
    recipeTpl: {
      avatar: 'allrecipes.png',
      title: 'Shrimp and Chorizo Paella',
      subheader: 'September 14, 2016',
      image: 'paella.jpg',
      description: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      steps: [
        'Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.',
        'Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.',
        'Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)',
        'Set aside off of the heat to let rest for 10 minutes, and then serve.'
      ]
    },
  }

  componentDidMount = () => {
    this.domElement = ReactDOM.findDOMNode(this) as HTMLElement;
  }

  componentDidUpdate = () => {
    setTimeout(() => {
      let height = this.domElement.offsetHeight ? this.domElement.offsetHeight : 365;
      
      if (this.state.previousHeight != height){
        this.setState(state => ({ previousHeight: height }));
      }
    }, 500); 
  }

  mockUrl = async () => {
    const url = "https://cookpad.com/gr/sintages/7248593-almuro-keik-manitarion?via=guest_feed", 
    //const url = "https://www.yiannislucacos.gr/recipe/kotopoylo-poylerika-eortastiko-geyma/7555/kotopoylo-ston-foyrno-me-hristoygenniatiki-gemisi", 
    //const url = "https://www.chefoulis.gr/ζυγούρι-στη-λαδόκολλα-με/", 
    //const url = "https://www.star.gr/lifestyle/syntages/451248/syntagh-agioy-balentinoy-rolakia-kanelas", 
    //const url = "https://www.sintagesmamas.com/μακαρονόπιτα-με-τυριά", // Barely any metadata
    //const url = "http://www.funkycook.gr/xorta-tsigariasta-auga-feta/",
    //const url = "https://www.mamapeinao.gr/xoirines-mprizoles-sto-fourno/",
    //const url = "https://www.argiro.gr/recipe/banoffee-dipli-apolausi/",
    //const url = "https://www.queen.gr/mageirikh/syntages/story/172766/kremmydopita-me-tyri-kai-mpeikon",
    //const url = "http://mageirikikaisintages.blogspot.com/2019/01/blog-post.html",
    //const url = "https://www.supersyntages.gr/sintagi/vasilopita-tsoyreki-i-klasiki-politiki-syntagi-me-ola-ta-aromata",
    //const url = "https://akispetretzikis.com/el/categories/kreas/choirino-me-glykoxinh-saltsa",
    //const url = "https://www.allrecipes.com/recipe/233259/surf-and-turf-for-two/",
    //const url = "http://www.foodnetwork.co.uk/recipes/totally-lazy-mini-sausage-rolls.html",
    //const url = "https://www.jamieoliver.com/videos/family-fish-pie/",
    //const url = "https://www.myrecipes.com/how-to/how-to-make-lemony-chicken-soup",
    //const url = "https://www.taste.com.au/recipes/spicy-chicken-chickpea-hotpot/t5yne9e9",
    //const url = "https://www.woolworths.com.au/shop/recipedetail/7362/healthy-popcorn-rocky-road", // Not working, site has bugs
    //const url = "https://www.hellofresh.ca/recipes/miso-pesto-shrimp-ramen-5bd1f0e7ae08b512564a9a22?locale=en-CA",
    //const url = "https://www.delish.com/cooking/recipe-ideas/a20534727/lemon-poppy-seed-pancakes-recipe/",
    //const url = "https://www.skinnytaste.com/banana-foster-crepes/",
    //const url = "https://www.thekitchn.com/mahogany-chocolate-cake-265853",
    //const url = "https://www.bbcgoodfood.com/recipes/easy-chicken-burritos",
        baseUrl = this.baseUrl(url),
        response = await fetch(url),
        html = await response.text();

        this.parse(html, baseUrl)
  }
  
  baseUrl = (url: string) => {
    const pathArray = url.split( '/' ),
        protocol = pathArray[0],
        host = pathArray[2],
        baseUrl = protocol + '//' + host;

    return baseUrl; 
  }

  parse = (html: string, url: string) => {
    const handler = new metaparser.Handler(
      (err, result) => {
        console.log(result)
      },
      {
        url // The HTML pages URL is used to resolve relative URLs.
      }
    )
    const parser = new htmlparser.Parser(handler, { decodeEntities: true })

    parser.write(html)
    parser.done()
  }

  mockLoad = (state: number) => {
    this.mockUrl();

    /* Set state to default. Loading, no error and no recipe */
    this.setState(state => ({ 
      loading: true,
      error: false,
      expanded: false,
      recipe: null,
    }));
    
    setTimeout(() => {
      if (state == 1){ // Loaded recipe succesfully
        this.setState(state => ({ 
          loading: false,
          recipe: this.state.recipeTpl 
        }));
      }
      else if (state == 2){ // No recipe found
        this.setState(state => ({ 
          loading: false,
          recipe: null
        }));
      } else { // Error
        this.setState(state => ({ 
          loading: false,
          error: true
        }));
      }
    }, 2000); 
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !this.state.expanded }));
  };

  render = () => {
    return template.bind(this)();
  }
}

export default RecipeCard;
