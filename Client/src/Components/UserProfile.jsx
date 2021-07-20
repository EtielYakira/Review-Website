import React from "react";
import { useEffect } from "react";
import { getUserByUserId, getCategories, updateUser } from "../DAL/api";
import Table from "react-bootstrap/Table";
import Nav from "react-bootstrap/Nav";
import { Button, Col, Form, Row } from "react-bootstrap";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { useState, useContext } from "react";
import AuthApi from "./aute/Auth";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

import { LineChart, Line,CartesianGrid,Tooltip,XAxis,ResponsiveContainer  } from 'recharts';


function UserProfile() {
  const [move, setMove] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [categories, setCategories] = useState([]);
  const [oldPassMatch, setOldPassMatch] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleShowSuccess = (showSuccess) => setShowSuccess(!showSuccess);
  const changeTo1 = () => {
    setMove(false);
  };
  const changeTo2 = () => {
    setMove(true);
  };
  const { user } = useContext(AuthApi);
  useEffect(() => {
    getUserByUserId(user.id).then((data) =>{
      setUserDetails(data)
    })
    getCategories().then((data) => setCategories(data));
  }, []);
  let SigninSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "password must have at least 8 characters")
      .max(255, "how can you remember password so long??")
      .required("Required"),
    oldPassword: yup
      .string()
      .min(8, "password must have at least 8 characters")
      .max(255, "how can you remember password so long??")
      .oneOf([userDetails.password],'password not match')
      .required("Required"),
      
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      oldPassword: "",
      preferredCategory: "1.restorant",
    },
    validationSchema: SigninSchema,
    validator: () => ({}),
    onSubmit: (values) => {
      updateUser(user.id, {
        preferredCategory: values.preferredCategory[0],
        password: values.password,
      })
        .then((data) => {
          console.log("USER Changed");
          handleShowSuccess(showSuccess);
        })
        .catch((err) => console.log(err));
    },
  });



  

  


  return (
    <div className="component container">
      <h1 className="text-center">{userDetails.name} PROFILE</h1>

      <Nav variant="tabs" defaultActiveKey="/profile">
        <Nav.Item>
          <Nav.Link onClick={changeTo1} eventKey="POSTS">
            Your Analytics
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={changeTo2} eventKey="settings">
            Settings
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {!move ? (

<Row className='container-fluid'>
  <Col className='mx-auto text-center w-100 h-100'>
    <h2>Rating Over Time</h2>
    <ResponsiveContainer   width={'100%'} height={400}>
<LineChart

  style={{width:'100%'}}
  data={userDetails.reviews}
  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
>
  <Line type="monotone" dataKey="rating" stroke="#387908" yAxisId={1} />
  <CartesianGrid stroke="#ccc" />
  <XAxis dataKey="postDate" />
  <Tooltip />
</LineChart>
</ResponsiveContainer>
</Col>
</Row>

        // <Table striped bordered hover className="w-50 mx-auto m-5">
        //   <thead>
        //     <tr>
        //       <th>#</th>
        //       <th>place</th>
        //       <th>date posted</th>
        //       <th>Edit</th>
        //       <th>Delete</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     <tr>
        //       <td>1</td>
        //       <td>Havana</td>
        //       <td>23/23/23</td>
        //       <td>
        //         <Button variant="link">
        //           <HiOutlinePencilAlt />
        //         </Button>
        //       </td>
        //       <td>
        //         <Button variant="link">
        //           <AiFillDelete />
        //         </Button>
        //       </td>
        //     </tr>
        //     <tr>
        //       <td>2</td>
        //       <td>Rome</td>
        //       <td>23/23/23</td>
        //       <td>
        //         <Button variant="link">
        //           <HiOutlinePencilAlt />
        //         </Button>
        //       </td>
        //       <td>
        //         <Button variant="link">
        //           <AiFillDelete />
        //         </Button>
        //       </td>
        //     </tr>
        //     <tr>
        //       <td>3</td>
        //       <td>ISRAEL</td>
        //       <td>23/23/23</td>
        //       <td>
        //         <Button variant="link">
        //           <HiOutlinePencilAlt />
        //         </Button>
        //       </td>
        //       <td>
        //         <Button variant="link">
        //           <AiFillDelete />
        //         </Button>
        //       </td>
        //     </tr>
        //   </tbody>
        // </Table>
      ) : (
        <Form className="m-5" onSubmit={formik.handleSubmit}>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly
                defaultValue={`${userDetails.email}`}
              />
            </Col>
          </Form.Group>
          <h3>change password</h3>

          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Old Password
            </Form.Label>
            <Col sm="10">
            {formik.errors.oldPassword || formik.values.oldPassword === userDetails.password ? (
                <div className="alert-danger text-danger text-center">
                  {formik.errors.oldPassword}
                </div>
              ) : null}
              {/* {!oldPassMatch && formik.touched.oldPassword &&
              formik.values.oldPassword === userDetails.password ? null : (
                <div className="alert-danger text-danger text-center">
                  its not the as your old password
                </div>
              )} */}
              <Form.Control
                type="password"
                placeholder="Old Password"
                name="oldPassword"
                onChange={formik.handleChange}
                value={formik.values.oldPassword}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              New Password
            </Form.Label>
            <Col sm="10">
              {formik.errors.password ? (
                <div className="alert-danger text-danger text-center">
                  {formik.errors.password}
                </div>
              ) : null}
              <Form.Control
                type="password"
                name="password"
                placeholder=" New Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Col>
            <h4>Main instres category</h4>
            <Col xs="auto" className="my-1">
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                custom
              >
                {categories.map((category) => (
                  <option name="preferredCategory">
                    {category.id}.{category.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
          {showSuccess ?  <div>YOUR DETAILS WERE UPDATED</div>  : <button type='submit'>Change</button>}
        </Form>
      )}
    </div>
  );
}

export default UserProfile;
