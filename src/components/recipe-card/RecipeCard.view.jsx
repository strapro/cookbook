import React from 'react';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import styles from './RecipeCard.module.scss';

export default function template() {
  return (
    <Card className={styles.card}>
      <Collapse in={!this.state.loading} collapsedHeight="365px">
          {(() => { 
            if (this.state.loading) {
              return (
                <div className={styles.loadingContainer} style={{height: this.state.previousHeight}}>
                  <CircularProgress className={styles.loading}/>
                </div>
              )
            } else {
              return (
                <Fade in={!this.state.loading}>
                  <div>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="Recipe" src={this.state.recipe.avatar} className={styles.avatar}/>
                      }
                      action={
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={this.state.recipe.title}
                      subheader={this.state.recipe.subheader}
                    />
                    <CardMedia
                      className={styles.media}
                      image={this.state.recipe.image}
                      title={this.state.recipe.title}
                    />
                    <CardContent className={styles.description}>
                      <Typography component="p">
                        {this.state.recipe.description}
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
                          [styles.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                      <CardContent className={styles.steps}>
                        {this.state.recipe.steps.map((step, index) => {
                          return <Typography key={index} paragraph>{step}</Typography>
                        })}
                      </CardContent>
                    </Collapse>
                  </div>
                </Fade>
              )
            }
          })()}
      </Collapse>
    </Card>
  );
};