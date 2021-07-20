import React, { useState, useEffect, useReducer } from "react";
import { useFormik } from "formik";
import { Row, Col, Button } from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { postReview,getReviewById,updateReview,deleteImageById} from "../DAL/api";
import { useHistory } from "react-router";

function AddReview({ handleShowAddReview, placeId, placeName,handleEndOfAdding,forceUpdate }) {
  const [reviewDetails, setReviewDetails] = useState({})

  const [files, setFiles] = useState("");

  const handleFilesChange = (e) => {
    setFiles(e.target.files);
  };

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
      rating: reviewDetails.rating || 5,
      reviewBody: reviewDetails.reviewBody || "",
    },
    onSubmit: (values) => {

      const formDataToSend = new FormData();
      formDataToSend.append("rating", +values.rating);
      formDataToSend.append("reviewBody", values.reviewBody);
      formDataToSend.append("placeId", placeId);
      for (let i = 0; i < files.length; i++) {
        formDataToSend.append("reviewImages", files[i]);
      }
      console.log(formDataToSend);

      postReview(formDataToSend).then((data) => console.log("review added"));
      handleShowAddReview(false);
      handleEndOfAdding(true)
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="container"
      encType="multipart/form-data"
    >
      <h2 className='text-center text-decoration-underline fw-bolder'>{placeName}</h2>
      <Row>
        <Col lg="12">
          <Row>
            <Box
              component="fieldset"
              className=""
              mb={3}
              borderColor="transparent"
            >
              <Typography component="legend">Your Rating</Typography>
              <Rating
                name="rating"
                size="large"
                value={formik.values.rating}
                precision={1}
                onChange={formik.handleChange}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />

              {formik.values.rating !== null && (
                <Box>{labels[hover !== -1 ? hover : formik.values.rating]}</Box>
              )}
            </Box>
          </Row>
        </Col>

        <Col lg="12" className="mb-3">
          <label htmlFor="reviewBody">Description: </label>
          <input
            id="reviewBody"
            name="reviewBody"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.reviewBody}
          />
        </Col>
        <Col lg="12" className="mb-3">
          <input
            type="file"
            name="reviewImages"
            multiple
            onChange={handleFilesChange}
          />
        </Col>
        {reviewDetails.images && <Col lg="12" className="mb-3">
          <input
            type="file"
            name="reviewImages"
            multiple
            onChange={handleFilesChange}
          />
        </Col>}
        <Col lg="12">
          <Button type="submit" onClick={forceUpdate}>Submit</Button>
        </Col>
      </Row>
    </form>
  );
}

export default AddReview;
