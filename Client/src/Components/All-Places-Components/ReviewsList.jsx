import React, { useState } from "react";
import { Accordion} from "react-bootstrap";
import { getPlaceById } from "../../DAL/api";
import EditReview from "./EditReview";
import ReviewCard from "./ReviewCard";

function ReviewsList({reviews,handleEditReview,handleCurrentReview,placeId,}) {
  
  const [allReviews, setAllReviews] = useState(reviews)
  const [currReview, setCurrReview] = useState({})
  const [open, setOpen] = useState(false)

  const handleCurrReview = (reviewData) => {
    setCurrReview(reviewData)
  }
  const handleCloseEdit = () => {
    setOpen(false)
  }
  const handleOpenEdit = () => {
    setOpen(true)
  }
  const handleReview = () =>{
    getPlaceById(placeId).then(data => setAllReviews(data.reviews))
    setAllReviews()
  } 
  return (<>

    {/* <EditReview
    handleClose={handleCloseEdit}
    open={open}
    review={currReview}
  /> */}
    <Accordion className='m-5'>
      <ol>
        {allReviews.map((review,index) => <ReviewCard  open={open} handleOpenEdit={handleOpenEdit} handleCurrReview={handleCurrReview}      handleReview={handleReview} review={review} index={index} handleEditReview={handleEditReview} handleCurrentReview={handleCurrentReview} />)}
      </ol>
      </Accordion>
  </>);
}

export default ReviewsList;
