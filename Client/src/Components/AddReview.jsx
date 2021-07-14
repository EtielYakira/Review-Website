import React from 'react'
import { useFormik } from 'formik';

function AddReview({handleShowAddReview}) {
  const formik = useFormik({
    initialValues: {
      rating: 5,
      reviewBody:""
    },
    onSubmit: values => {
      // postReview(values);
      handleShowAddReview(false)
    },
  });

  return (

    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="rating">Your rating</label>
      <input
        id="rating"
        name="rating"
        type="number"
        min='1'
        max='5'
        onChange={formik.handleChange}
        value={formik.values.rating}
      />
      <label htmlFor="reviewBody">Description</label>
      <input
        id="reviewBody"
        name="reviewBody"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.reviewBody}
      />
      <button type="submit">Submit</button>

    </form>

  );
}

export default AddReview
