import React from "react";
import { Formik, useFormik } from "formik";
import { Form, Button, Col } from "react-bootstrap";

function SignUp({handleUser}) {
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      preferredCategory: "",
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="component">
      <h1 className="text-center">SIGNUP AREA</h1>
      <p className="text-center">JOIN OUR SPCAEL WOWO AMAZING!!</p>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "99vw", height: "70vh" }}
      >
        <Formik>
        <Form  className="" onSubmit={formik.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder="Password" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Preferred Category</Form.Label>
              <Form.Control as="select" defaultValue="category" name='preferredCategory' onChange={formik.handleChange}>
                <option>None</option>
                <option name="1">restorant</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Group>
            <Form.File id="" label="proplie pic" />
          </Form.Group>

          <Form.Check
            type="switch"
            id="custom-switch"
            label="email subscbstion"
          />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
