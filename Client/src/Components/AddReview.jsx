import React, { useState } from "react";
import { useFormik } from "formik";
import {Row,Col} from 'react-bootstrap'
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function AddReview({ handleShowAddReview }) {
  const [hover, setHover] = React.useState(-1);
  const labels = {
    1: "Not good",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };
  const formik = useFormik({
    initialValues: {
      rating: 5,
      reviewBody: "",
    },
    onSubmit: (values) => {
      // postReview(values);
      handleShowAddReview(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='border border-3 container'>
      <Row>

      <Col>
      <Row>
      <Box component="fieldset" className='' mb={3} borderColor="transparent">
      <Typography component="legend">Your Rating</Typography>
      <Rating
          name="rating"
          size="large"
          value={formik.values.rating}
          onChange={formik.handleChange}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          
        />
        
      {formik.values.rating !== null && <Box >{labels[hover !== -1 ? hover : formik.values.rating]}</Box>}
      </Box>
      </Row>
      </Col>


      <Col>
      <label htmlFor="reviewBody">Description</label>
      <input
        id="reviewBody"
        name="reviewBody"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.reviewBody}
      />
      </Col>
      <Col>
      <input type="file" name="multi-files" accept='image/*' multiple/>
      </Col>
      <Col>
      <button type="submit">Submit</button>
      </Col>
      </Row>
    </form>
  );
}

export default AddReview;
