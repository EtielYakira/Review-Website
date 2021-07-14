import React from "react";
import { Accordion} from "react-bootstrap";
import ReviewCard from "./ReviewCard";

function ReviewsList({reviews}) {
  return (
    <Accordion className='m-4'>
      <ol>
        {reviews.map((review,index) => <ReviewCard review={review} index={index} />)}
      </ol>
      </Accordion>
  );
}

export default ReviewsList;
