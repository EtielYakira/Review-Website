import React, { useState, useEffect } from "react";
import { Modal, Form, InputGroup, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { getTags, getCategories, postPlace } from "../DAL/api";

function AddPlace() {
  const [tagsFromDb, setTagsFromDb] = useState([]);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  let today = () => {
    let todayDate = new Date(Date.now())
      .toLocaleDateString()
      .split("/")
      .reverse();
    return [
      todayDate[0],
      todayDate[2].length === 1 ? "0" + todayDate[2] : todayDate[2],
      todayDate[1],
    ].join("-");
  };
  const schema = yup.object().shape({
    placeName: yup.string().required("And You dont have a name?"),
    ownerName: yup.string(),
    city: yup.string().required("i guess its in the sea so.."),
    country: yup.string().required("i dont know places in space!"),
    streetName: yup.string().required("i dont know places in space!"),
    summeryText: yup
      .string()
      .min(40, "tell just a little bit more")
      .max(5000, "too muach")
      .required("tell something about the place"),
    streetNumber: yup
      .number("its must to be number")
      .min(1)
      .required("place must have street number!"),
    image: yup.mixed(),
    establishDate: yup.date(),
  });
  const formik = useFormik({
    initialValues: {
      placeName: "",
      ownerName: "",
      city: "",
      country: "",
      streetNumber: "",
      streetName: "",
      tags: [],
      category: 1,
      establishDate: "",
      openingHour: "",
      closingHour: "",
      summeryText: "",
    },
    validationSchema: schema,
    validator: () => ({}),
    onSubmit: async (values, actions) => {
      const formData = new FormData();
      formData.append("name", values.placeName);
      formData.append("owner", values.ownerName);
      formData.append("city", values.city);
      formData.append("country", values.country);
      formData.append("streetName", values.streetName);
      formData.append("streetNumber", values.streetNumber);
      formData.append("image", file);
      formData.append("category", values.category);
      formData.append("establishDate", values.establishDate);
      formData.append("openingHour", values.openingHour);
      formData.append("closingHour", values.closingHour);
      formData.append("summeryText", values.summeryText);
      formData.append("tags", values.tags);

      postPlace(formData).then((data) => console.log("place added"));
    },
  });

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
    getTags().then((data) =>
      setTagsFromDb(
        data.filter((tag) => tag.categotyId === +formik.values.category)
      )
    );
  }, [formik.values.category]);

  return (
    <div className="component justify-content-center">
      <h2 className="text-center mt-4 text-decoration-underline fw-bolder">
        New Place
      </h2>
      <Form
        onSubmit={formik.handleSubmit}
        className="p-5 container"
        enctype="multipart/form-data"
      >
        <Row>
          <Col lg="6" md="12">
            {formik.errors.placeName ? (
              <div className="alert-danger text-danger text-center">
                {formik.errors.placeName}
              </div>
            ) : null}
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text>Place name</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="placeName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.placeName}
                onBlur={formik.handleBlur}
                isValid={formik.touched.placeName && !formik.errors.placeName}
              />
            </InputGroup>
          </Col>
          <Col lg="6" md="12">
            {formik.errors.ownerName ? (
              <div className="alert-danger text-danger text-center">
                {formik.errors.ownerName}
              </div>
            ) : null}
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text>Owner name</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="ownerName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.ownerName}
                onBlur={formik.handleBlur}
              />
            </InputGroup>
          </Col>
          <Col lg="3" md="6" sm="12">
            {formik.errors.city ? (
              <div className="alert-danger text-danger text-center">
                {formik.errors.city}
              </div>
            ) : null}
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text>City</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="city"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.city}
                onBlur={formik.handleBlur}
                isValid={formik.touched.city && !formik.errors.city}
              />
            </InputGroup>
          </Col>

          <Col lg="3" md="6" sm="12">
            {formik.errors.country ? (
              <div className="alert-danger text-danger text-center">
                {formik.errors.country}
              </div>
            ) : null}
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text>Country</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="country"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.country}
                onBlur={formik.handleBlur}
                isValid={formik.touched.country && !formik.errors.country}
              />
            </InputGroup>
          </Col>

          <Col lg="3" md="6" sm="12">
            {formik.errors.streetName ? (
              <div className="alert-danger text-danger text-center">
                {formik.errors.streetName}
              </div>
            ) : null}
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text>Street Name</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="streetName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.streetName}
                onBlur={formik.handleBlur}
                isValid={formik.touched.streetName && !formik.errors.streetName}
              />
            </InputGroup>
          </Col>

          <Col lg="3" md="6" sm="12">
            {formik.errors.streetNumber ? (
              <div className="alert-danger text-danger text-center">
                {formik.errors.streetNumber}
              </div>
            ) : null}
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text>Street Number</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="streetNumber"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.streetNumber}
                onBlur={formik.handleBlur}
                isValid={
                  formik.touched.streetNumber && !formik.errors.streetNumber
                }
              />
            </InputGroup>
          </Col>

          <Col lg="4" md="8">
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text>establish Date</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="establishDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.establishDate}
                onBlur={formik.handleBlur}
                max={today()}
                // max={'2021-07-15'}
                isValid={
                  formik.touched.establishDate && !formik.errors.establishDate
                }
              />
            </InputGroup>
          </Col>

          <Col lg="4" md="8">
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text>Opening Hour</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="openingHour"
                type="time"
                onChange={formik.handleChange}
                value={formik.values.openingHour}
                onBlur={formik.handleBlur}
                isValid={
                  formik.touched.openingHour && !formik.errors.openingHour
                }
              />
            </InputGroup>
          </Col>

          <Col lg="4" md="8">
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text>Closing Hour</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                name="closingHour"
                type="time"
                onChange={formik.handleChange}
                value={formik.values.closingHour}
                onBlur={formik.handleBlur}
                isValid={
                  formik.touched.closingHour && !formik.errors.closingHour
                }
              />
            </InputGroup>
          </Col>

          <Col lg="12">
            {formik.errors.summeryText ? (
              <div className="alert-danger text-danger text-center">
                {formik.errors.summeryText}
              </div>
            ) : null}
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text className="py-5">Summery Text</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                as="textarea"
                rows={3}
                name="summeryText"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.summeryText}
                onBlur={formik.handleBlur}
                isValid={
                  formik.touched.summeryText && !formik.errors.summeryText
                }
              />
            </InputGroup>
          </Col>

          <Col>
            <Form.Group className="mb-4">
              <Form.Label>Place Picture</Form.Label>

              <Form.Control
                type="file"
                filename="image"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Row>
                {tagsFromDb.map((tag) => (
                  <Col>
                    <Form.Check
                      name="tags"
                      type="checkbox"
                      value={tag.id}
                      onChange={formik.handleChange}
                      label={tag.name}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>
          </Col>

          <Col>
            <Form.Label
              className="my-1 mr-5"
              htmlFor="inlineFormCustomSelectPref"
            >
              Category
            </Form.Label>
            <Form.Control
              as="select"
              name="category"
              onChange={formik.handleChange}
              className="my-1 mx-2"
              id="inlineFormCustomSelectPref"
              custom
            >
              {categories.map((category) => (
                <option value={`${category.id}`}>{category.name}</option>
              ))}
            </Form.Control>
          </Col>
        </Row>
        <Row>
          <Button type="submit">Submit form</Button>
        </Row>
      </Form>
    </div>
  );
}

export default AddPlace;
