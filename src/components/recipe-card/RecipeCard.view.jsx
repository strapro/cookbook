import React from 'react';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ErrorIcon from '@material-ui/icons/Error';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import styles from './RecipeCard.module.scss';

function Recipe(props) {
    return (
        <Fade in={true}>
            <div className={styles.recipe}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" src={props.recipe.avatar} className={styles.avatar}/>
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    classes={{content: styles.content}}
                    title={props.recipe.title}
                    titleTypographyProps={{noWrap: true}}
                    subheader={props.recipe.subheader}
                />
                <CardMedia
                    className={styles.media}
                    image={props.recipe.image}
                    title={props.recipe.title}
                />
                <CardContent className={styles.description}>
                    <Typography component="p">
                        {props.recipe.description}
                    </Typography>
                </CardContent>
                <CardActions className={styles.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={classnames(styles.expand, {
                            [styles.expandOpen]: props.expanded,
                        })}
                        onClick={props.handleExpandClick}
                        aria-expanded={props.expanded}
                        aria-label="Show more"
                    >
                        <ExpandMoreIcon style={{display: props.recipe.steps.length > 0 ? 'block' : 'none' }}/>
                    </IconButton>
                </CardActions>
                <Collapse in={props.expanded} timeout="auto" unmountOnExit>
                    <CardContent className={styles.steps}>
                        {props.recipe.steps.map((step, index) => {
                            return <Typography key={index} paragraph>{step}</Typography>
                        })}
                    </CardContent>
                </Collapse>
            </div>
        </Fade>
    );
}

function Info(props) {
    return (
        <div className={styles.infoContainer} style={{height: props.previousHeight}}>
            {(() => {
                if (props.loading) {
                    return (
                        <CircularProgress className={styles.loading}/>
                    )
                } else if (props.error) {
                    return (
                        <React.Fragment>
                            <Typography variant="h2" align="center" gutterBottom color="secondary"><ErrorIcon fontSize="inherit" className={styles.errorIcon}/></Typography>
                            <Typography variant="subtitle2" align="center" gutterBottom>Something went wrong during the retrieval of the metadata. See the console for more info.</Typography>
                        </React.Fragment>
                    )
                } else {
                    return (
                        <React.Fragment>
                            <Typography variant="h6" align="center" gutterBottom color="primary">No recipes found on this page.</Typography>
                            <Typography variant="subtitle2" align="center" gutterBottom>Please try visiting another page with recipes</Typography>
                            <Typography variant="caption" gutterBottom className={styles.moreInfo}>
                                This extension works by looking for the <Link href="http://microformats.org/wiki/h-recipe" color="secondary" target="_blank">h-recipe microformat</Link>. If the site has not implemented this format then the extension will not pickup the needed metadata :(
                            </Typography>
                        </React.Fragment>
                    )
                }
            })()}
        </div>
    )
}

export default function template() {
    return (
        <Card className={styles.card}>
            <Collapse in={this.props.recipe !== undefined} collapsedHeight="365px">
                { this.props.recipe
                    ? <Recipe recipe={this.props.recipe} expanded={this.state.expanded} handleExpandClick={this.handleExpandClick}/>
                    : <Info previousHeight={this.state.previousHeight} loading={this.props.loading} error={this.props.error}/>
                }
            </Collapse>
        </Card>
    );
};