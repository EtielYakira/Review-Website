import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { Row, Col } from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { postReview } from "../DAL/api";

function AddReview({ handleShowAddReview, placeId }) {
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
      rating: 5,
      reviewBody: "",
    },
    onSubmit: (values) => {
      const formDataToSend = new FormData();
      formDataToSend.append("rating", +values.rating);
      formDataToSend.append("reviewBody", values.reviewBody);
      formDataToSend.append("placeId", placeId);
      
      for(let i = 0; i < files.length; i++ ){
        formDataToSend.append("reviewImages", files[i]);
      }
      console.log(formDataToSend);

      postReview(formDataToSend).then((data) => console.log("review added"));
      // handleShowAddReview(false);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="border border-3 container"
      encType="multipart/form-data"
    >
      <Row>
        <Col>
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
          <input
            type="file"
            name="reviewImages"
            multiple
            onChange={handleFilesChange}
          />
        </Col>
        <Col>
          <button type="submit">Submit</button>
        </Col>
      </Row>
    </form>
  );
}

export default AddReview;
