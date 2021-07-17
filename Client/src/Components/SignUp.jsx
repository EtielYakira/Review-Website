import React, { useState, useEffect } from "react";
import { Formik, useFormik } from "formik";
import { Form, Button, Col } from "react-bootstrap";
import {getCategories, postUser} from '../DAL/api'
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'






function SignUp({handleUser}) {
  let SigninSchema = yup.object().shape({
    username: yup
      .string()
      .min(6, " username must contain 6 characters")
      .max(50, "Too long!")
      .required("Required"),
    password: yup
      .string()
      .min(8, "password must have at least 8 characters")
      .max(255,"how can you remember password so long??")
      .required("Required"),
    email: yup
      .string()
      .email('not sure its an email..')
      .required("Required"),
  });


  const [categories, setCategories] = useState([])
  const [file, setFile] = useState(null);
  let history = useHistory();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  useEffect(() => {
    getCategories().then(data => setCategories(data))
  }, [])
  


  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      subscription: false,
      preferredCategory: '1.restorant',
    },
    validationSchema:SigninSchema,
    validator: () => ({}),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("name", values.username);
      formData.append("password", values.password);
      formData.append("subscription", values.subscription);
      formData.append("preferredCategory", values.preferredCategory[0]);
      if(file) formData.append("profileImage", file) 

      postUser(formData).then((data) =>{
        console.log("USER added")
        if(Cookies.get('session_id')){
          history.push("/")
          handleUser(Cookies.get('session_id') ? JSON.parse(Cookies.get('session_id')) : '')
        }
      }).catch(err => console.log(err))

        
    },
  });
  return (
    <div className="component">
      <h1 className="text-center">SIGNUP AREA</h1>
      <p className="text-center">JOIN OUR SPCAEL WOWO AMAZING!!</p>

      <div
        className="d-flex justify-content-center align-items-center mb-1"
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
                {formik.errors.username ? <div className='alert-danger text-danger text-center'>{formik.errors.username}</div> : null}


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
                {formik.errors.email ? <div className='alert-danger text-danger text-center'>{formik.errors.email}</div> : null}

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder="Password" />
            </Form.Group>
            {formik.errors.password ? <div className='alert-danger text-danger text-center'>{formik.errors.password}</div> : null}
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Preferred Category</Form.Label>
              <Form.Control as="select" defaultValue="category" name='preferredCategory' onChange={formik.handleChange}>
                {categories.map(category => <option name='preferredCategory'>{category.id}.{category.name}</option>)}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Group>
          <Form.Label>Place Picture</Form.Label>

            <Form.Control
              type="file"
              filename="profileImage"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
            />
          </Form.Group>

          <Form.Switch
            type="switch"
            label="email subscription"
            name='subscription' 
            value={formik.values.subscription} 
            onChange={formik.handleChange} 
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
