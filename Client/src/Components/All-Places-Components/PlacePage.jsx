import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { getPlaceById } from '../../DAL/api'
import ReviewsList from './ReviewsList'
import {Button} from 'react-bootstrap'
import AddReview from '../AddReview'
import {BsStarFill} from 'react-icons/bs'
import {GoVerified} from 'react-icons/go'
import {BiCheckSquare} from 'react-icons/bi'
import {FcCheckmark} from 'react-icons/fc'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function PlacePage() {
    const [addReview,setAddReview] = useState(false)
    const handleShowAddReview = () => addReview ? setAddReview(false) :setAddReview(true)
    const {placeId} = useParams()
    const [place, setPlace] = useState({tags:[],image:'',averageRating:""})

    const handlePlace = (data) => setPlace(data)
    useEffect(() => {
        getPlaceById(placeId).then(data => {
            data['averageRating'] = Math.ceil(data.reviews.reduce((acc,curVal) => acc + curVal.rating,0)/data.reviews.length) || 'no rating yet'
            handlePlace(data)
        })
        
    }, [placeId])

        
    

    return (
        <div className='component'>



<div className="container row mt-5 mx-auto">
  <div className="col-md-6 mb-4">
    <div id=""></div>
    <div className="">
      <div className="row mx-1">
        <div className="col-12 mb-0">
          <figure className="">
              <img src={place.image.split("-")[0] === 'image' ? `../uploads/${place.image}` : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.McCWaBPppsmGXSo0wC6XtAHaHa%26pid%3DApi&f=1'} className="img-fluid rounded border border-dark" alt={place.name}/>
          </figure>
        </div>
      </div>
    </div>

  </div>
  <div className="col-md-6 container">

    <h5 className='bolder' style={{fontSize:'10vh'}}>{place.name}</h5>
    <p className="mb-2 text-muted small">owned by: {place.owner}</p>
    <h3 className="">
        {<Box component="fieldset"  borderColor="transparent">
        <Rating name="read-only" size='large' value={place.averageRating} readOnly />
      </Box>}  
    </h3>
    <p><span className="mr-1"><strong> {place.verified ? <GoVerified/> : 'Not '}Verified</strong></span></p>

    <p className="pt-1" style={{wordBreak:'break-all'}}>{place.summeryText}</p>
    <div className="">
      <table className="table table-sm table-borderless mb-0">
        <tbody>
          <tr>
            <th className="pl-0 w-25" scope="row"><strong>Address</strong></th>
            <td>{(place.streetName+" "+ place.streetNumber+"," + place.country).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</td>
          </tr>
          <tr>
            <th className="pl-0 w-25" scope="row"><strong>Opens at:</strong></th>
            <td>{place.openingHour}</td>
          </tr>
          <tr>
            <th className="pl-0 w-25" scope="row"><strong>Closes at:</strong></th>
            <td>{place.closingHour}</td>
          </tr>
          <tr>
            <th className="pl-0 w-25" scope="row"><strong>Establish at:</strong></th>
            <td>{place.establishDate}</td>
          </tr>
          <tr>
            <th className="pl-0 w-25" scope="row"></th>
            <td>{place.tags.map(tag => <span className='mx-1 fw-bolder text-decoration-underline'><FcCheckmark/>{tag.name}</span>)}</td>
            
          </tr>
        </tbody>
      </table>
    </div>
    

  </div>
</div>










            <br/>
            <br/>






            <h1 className="text-secondary text-center">Reviews</h1>
             <Button className='position-fixed' style={{bottom:'15px',right:'15px',zIndex:'3000'}} onClick={handleShowAddReview}>Add Review</Button>
             {addReview && <AddReview handleShowAddReview={handleShowAddReview} placeId={placeId}/>}
            {place.reviews ? <ReviewsList reviews={place.reviews} className='container'/> : 'no reviews yey'}
        </div>
    )
}

export default PlacePage
