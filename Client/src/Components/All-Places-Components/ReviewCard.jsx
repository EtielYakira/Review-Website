import React, { useState } from "react";
import { useEffect } from "react";
import { Accordion, Card, Button, Image, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { getUserByUserId } from "../../DAL/api";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Cookies from "js-cookie";
import EditIcon from "@material-ui/icons/Edit";

function ReviewCard({ review, index, handleEditReview, handleCurrentReview ,handleReview,handleOpenEdit, open ,handleCurrReview }) {
  const [user, setUser] = useState({ name: "" });
  const handleUser = (userDetailes) => setUser(userDetailes);

  useEffect(() => {
    getUserByUserId(review.userId).then((theUser) => {
      let { name, profileImage, ...rest } = theUser;
      handleUser({ name, profileImage });
    });
  }, []);
  return (
    <li className="" id={Cookies.get("session_id") ? JSON.parse(Cookies.get("session_id")).id : ''} >
      <Card>
        <Card.Header>
          <Row>
            <Col lg="11">
              <div className='d-md-flex d-sm-block'>
              <Avatar>{user.name[0]+user.name[3]}</Avatar>
              <h3>
                {new Array(review.rating).fill(<FaStar color='#FFB400' style={{textShadow:' 1px 1px 1px black,0px 0px 1px red'}}/>)}
              </h3>
              </div>
              <span className="">reviewed at {review.postDate}</span>
            </Col>
            <Col lg="1">
              {user.name === (Cookies.get("session_id") && JSON.parse(Cookies.get("session_id")).name) ? (
                <IconButton aria-label="edit" onClick={() => {
                  handleOpenEdit()
                  handleCurrReview(review)
                  handleCurrentReview(review)
                  }
                  } >
                  <EditIcon fontSize="large" />
                </IconButton>
              ) : null}
            </Col>
          </Row>
          <Row>
            <h6 className="col">
              {review.reviewBody.slice(0, 50)}
              {review.reviewBody.length > 49 || review.images.length > 0 ? (
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  className=""
                  eventKey={`${index + 1}`}
                >
                  Show Full Reviews
                </Accordion.Toggle>
              ) : (
                ""
              )}
            </h6>
          </Row>
        </Card.Header>
        <Accordion.Collapse eventKey={`${index + 1}`}>
          <Card.Body>
          <div className=''>
              <h3 className='mx-2'>
             {user.name}
              </h3>
              <span className="text-muted">reviewed at {review.postDate}</span>
              </div>
            <div>{review.reviewBody}</div>
            {review.images.map((image, index) => (
              <a
                href={`../uploads/${image.image}`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`../uploads/${image.image}`}
                  alt={`photo_number_${index}`}
                  className="m-2 reviewImg"
                />
              </a>
            ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </li>
  );
}

export default ReviewCard;
