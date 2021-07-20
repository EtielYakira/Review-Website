import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Row, Col } from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import {
  updateReview,
  deleteImageById,
} from "../../DAL/api";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function EditReview({ review, handleClose, open }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [files, setFiles] = useState("");
//   const [images, setImages] = useState([])

const [imagesToDelete, setImagesToDelete] = useState([])
const handleFilesChange = (e) => {
  setFiles(e.target.files);
};
  const handleDelete = (target) => {
    //   console.log(target.parentElement.attributes[3].value);
    // imagesToDelete.push(target.parentElement.attributes[3].value)
    setImagesToDelete([...imagesToDelete,target.parentElement.attributes[3].value])
    target.parentNode.parentNode.className = 'd-none'
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
      rating: +review.rating || 1,
      reviewBody: review.reviewBody || "",
    },
    onSubmit: (values) => {
      const formDataToSend = new FormData();
        formDataToSend.append("rating", +values.rating);
        formDataToSend.append("reviewBody", values.reviewBody);
        for (let i = 0; i < files.length; i++) {
          formDataToSend.append("reviewImages", files[i]);
        }
        console.log(imagesToDelete);
      imagesToDelete.forEach(image => deleteImageById(image))
        updateReview(review.id,formDataToSend).then(data => console.log('UPDATE REVIEW'))
      handleClose(false);
    },
  });

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"What You Whant To Change?"}
      </DialogTitle>
      <DialogContent>
        <form
          onSubmit={formik.handleSubmit}
          className="container"
          encType="multipart/form-data"
        >
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
                    // value={formik.values.rating}
                    defaultValue={+review.rating}
                    onChange={formik.handleChange}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                  />

                  {formik.values.rating !== null && (
                    <Box>
                      {labels[hover !== -1 ? hover : formik.values.rating]}
                    </Box>
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
                // value={formik.values.reviewBody}
                defaultValue={review.reviewBody}
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
            {review.images && (
              <Col lg="12" className="mb-3">
                <Row>
                  {review.images.map((image) => {
                    return (
                      <Col name={image.id}>
                        <Chip
                          label="Delete Image"
                          name={image.id}
                          key={image.id}
                          onClick={(e) => {
                            console.log('DELETE');
                            //   handleDelete(image.id)
                              handleDelete(e.target)
                            }
                          }
                          color="primary"
                        />
                        <img src={`../uploads/${image.image}`} alt={image.id} />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            )}
            <Col lg="12">
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </form>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Submit Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditReview;
