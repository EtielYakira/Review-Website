import React from "react";
import { Modal,Form, InputGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { getUserByUserName } from "../DAL/api";
import { useState } from "react";
import { useEffect } from "react";

function SignArea({ show, handleClose, handleUser, user }) {

  const [showUserExisted, setShowIsUserExisted] = useState("")
  const handleUserExisted = (msg) => setShowIsUserExisted(msg)



  let SigninSchema = yup.object().shape({
    userName: yup
      .string()
      .min(6, " username must contain 6 characters")
      .max(50, "Too long!")
      .required("Required"),
    password: yup
      .string()
      .min(8, "password must have at least 8 characters")
      .max(255,"how can you remember password so long??")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: ""
    },
    validationSchema:SigninSchema,
    validator: () => ({}),
    onSubmit: (values,actions) => {
      let userDetails = getUserByUserName(values)
      userDetails.then((userDetails) => { 
      console.log(userDetails);
      if(userDetails.message || userDetails.password !== values.password){
        setTimeout(handleUserExisted("Username/password are Wrong, Try Again"),1000)
      }else{
        handleUserExisted("")
        handleUser(userDetails)
        handleClose()
      }
      
    })
    },
  });
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>LOGIN TO YIUR ACCOUBT</Modal.Title>
        </Modal.Header>


        <Form className="p-4" onSubmit={formik.handleSubmit}>

            {formik.errors.userName ? <div className='alert-danger text-danger text-center'>{formik.errors.userName}</div> : null}
          <InputGroup className="mb-4">
            <InputGroup.Prepend>
              <InputGroup.Text>📧</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control name="userName" type="text" onChange={formik.handleChange} value={formik.values.userName} onBlur={formik.handleBlur}/>
          </InputGroup>
            
            {formik.errors.password ? <div className='alert-danger text-danger text-center'>{formik.errors.password}</div> : null}
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>🔑</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control name="password" type='password' onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
          </InputGroup>
          <div className='alert-danger text-danger text-center my-4'>{showUserExisted}</div>
        <h6 className="mx-4">
          Not a Member? Sign-in{" "}
          <Link to="/SignUp" className="" onClick={handleClose}>
            HERE 🖊
          </Link>
        </h6>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            handleUserExisted("")
            handleClose();
          }}>
            Close
          </Button>
          <Button
            type='submit'
            variant="primary"
              >
            Login
          </Button>
        </Modal.Footer>
            </Form>
      </Modal>
    </div>
  );
}

export default SignArea;
