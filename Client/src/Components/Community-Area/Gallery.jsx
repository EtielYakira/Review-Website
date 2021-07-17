import React, { useEffect } from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { getImagesOfReviewsWithImageLikes } from "../../DAL/api";
import PhotoCard from './PhotoCard.gallery'





import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';
import CallMadeIcon from '@material-ui/icons/CallMade';
import {FcLike,FcLikePlaceholder,FcDislike} from 'react-icons/fc'


import { useHistory } from "react-router-dom";



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
      // Promote the list into its own layer in Chrome. This cost memory, but helps keep FPS high.
      transform: 'translateZ(0)',
    },
    titleBar: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
      color: 'white',
    },
  }));
  

function Gallery() {
    const [galleryData, setGalleryData] = useState([])
    const classes = useStyles();
    let history = useHistory();

  useEffect(() => {
      let newData = []
    getImagesOfReviewsWithImageLikes().then((data) => {
        data.forEach(place => {
            place.reviews.forEach(review =>{
                if(review.images.length > 0){
                    review.images.forEach(image =>{
                        newData.push({id:image.id,placeId:place.id,image:image.image,userName:review.user.name,placeName:place.name})
                    })
                }
            })
        })
        console.log(newData);
        setGalleryData(newData)
    });
  }, []);


  const takeToPalce = (placeId) => {

  }

  return (
    <div className="component container my-2">
      <h1 className='text-center bg-warning bolder' style={{fontFamily:'-moz-initial'}}>Eating With Your Eyes</h1>
      {/* <Row>
      {
          galleryData.map(img => <PhotoCard image={img}/>)
      }
      </Row> */}




<div className={classes.root}>
      <ImageList rowHeight={360} className={classes.imageList} cols={3}>
        {galleryData.map((item) => (
          <ImageListItem key={item.image}>
            <img src={`../uploads/${item.image}`} alt={item.placeName} />
            <ImageListItemBar
              title={item.placeName}
              subtitle={<span>by: {item.userName}</span>}
              actionIcon={
                  <IconButton aria-label={`info about ${item.placeName}`} className={classes.icon}>
                  <CallMadeIcon className='mx-3' style={{ color: '#ffffff' }} onClick={() => history.push(`/Places/${item.placeId}`)} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>



    </div>
  );
}

export default Gallery;
