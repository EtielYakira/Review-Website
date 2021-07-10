import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


function MUIplaceCard(places) {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <ImageList rowHeight={350} className={classes.imageList}>
          <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          </ImageListItem>
          {places.map((place) => (
            <ImageListItem key={place.name}>
              <img src={place.image  || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.vG3Wv2tc0RsHsJA9QtaQtAAAAA%26pid%3DApi&f=1'} alt={place.name} />
              <ImageListItemBar
                title={place.name}
                subtitle={<span>by: {place.username}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${place.name}`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }

export default MUIplaceCard
