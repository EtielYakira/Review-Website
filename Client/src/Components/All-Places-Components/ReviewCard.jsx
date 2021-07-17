import React,{useState} from 'react'
import { useEffect } from 'react';
import { Accordion, Card, Button, Image, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import  {getUserByUserId} from '../../DAL/api'
import Avatar from '@material-ui/core/Avatar';

function ReviewCard({review,index}) {
    const [user,setUser] = useState({name:"",})
    const handleUser = (userDetailes) => setUser(userDetailes)
    
    useEffect(() => {
      getUserByUserId(review.userId).then(theUser => {
        let {name, profileImage,...rest} = theUser
        handleUser({name, profileImage})
      })
    }, [])
    return (
        <li className="">
      <Card>
        <Card.Header>
          <Row>
            <Col lg="11">
            <Avatar>{user.name[0]}</Avatar>
              <h3>
                {/* {" "}
                <Image
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  src={user.profileImage ? user.profileImage : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.SbgWngnmy4T-r5FV7oqq4wHaIi%26pid%3DApi&f=1'}
                  alt="asdas"
                /> */}
                 
                {user.name}
                {new Array(review.rating).fill( <FaStar/> )}
              </h3>
                <span>reviewed at {review.postDate}</span>
            </Col>
            <Col lg="1"></Col>
          </Row>
          <Row>
            <h6 className="col">
              {review.reviewBody.slice(0,50)}
              {review.reviewBody.length > 49 || review.images.length > 0 ? 
              <Accordion.Toggle
                as={Button}
                variant="link"
                className=""
                eventKey={`${index+1}`}
              >
                Show Full Reviews
              </Accordion.Toggle> : ''}
            </h6>
          </Row>
        </Card.Header>
        <Accordion.Collapse eventKey={`${index+1}`}>
          <Card.Body>
            <Row>
                {review.reviewBody}
            </Row>
           {review.images.map((image,index) => (
             <a href={`../uploads/${image.image}`} target='_blank' rel='noreferrer'><img src={`../uploads/${image.image}`} alt={`photo_number_${index}`} className="m-2 reviewImg" /></a>
           ))}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </li>
    )
}

export default ReviewCard
