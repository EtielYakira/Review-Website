import React from 'react'
import {Card,Button} from 'react-bootstrap'
import { FaStar, FaGripLinesVertical } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { getPlaceCardByPlaceId } from '../../DAL/api';

function PlaceCard({place}) {
  // const place = getPlaceCardByPlaceId(placeID)

    return (
        <div>
            <Card className='text-center my-3'>
  <Card.Img  variant="top" src={place.image} />

  <Card.Body>
    <Card.Title className='fw-bolder'>{place.name}</Card.Title>
    <Card.Text>
      {place.summeryText}
    </Card.Text>
    <Button variant="primary">To Full Review</Button>
  </Card.Body>
  <Card.Footer>
      <footer className="fw-bolder">
    {/* {place.commentsAmount} <MdRateReview className='logo-outline' style={{color:'#45f01a'}}/> */}
    {/* <FaGripLinesVertical/> */}
    {place.rating} <FaStar className='logo-outline' style={{color:'yellow'}}/>
      </footer>
  </Card.Footer>
</Card>
        </div>
    )
}

export default PlaceCard
