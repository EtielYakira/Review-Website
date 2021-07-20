import React from "react";
import { Accordion} from "react-bootstrap";
import ReviewCard from "./ReviewCard";

function ReviewsList({reviews,handleEditReview,handleCurrentReview}) {
  return (
    <Accordion className='m-5'>
      <ol>
        {reviews.map((review,index) => <ReviewCard review={review} index={index} handleEditReview={handleEditReview} handleCurrentReview={handleCurrentReview} />)}
      </ol>
      </Accordion>
  );
}

export default ReviewsList;
