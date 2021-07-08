import React from "react";
import {Col,Row,Card} from 'react-bootstrap'
import {FcLike,FcLikePlaceholder,FcDislike} from 'react-icons/fc'


function PhotoCard(image) {
  return (
    <div>
      <Col lg={4} md={6} xs={12} className="my-2">
        <Card border="info">
          <Card.Img
            variant="top"
            src={image.image}
          />
          <Card.Footer style={{ padding: ".75rem 1.25rem" }}>
            <Row>
              <Col>
                {" "}
                <small className="">
                  <cite>
                    <strong>ETLusername</strong>
                  </cite>{" "}
                  on{" "}
                  <strong>
                    <a href="#1" alr="asd">
                      asdasd
                    </a>
                  </strong>
                </small>
              </Col>
              <Col className="text-right">
                <h3>
                  <FcLike />
                  244
                </h3>
              </Col>
            </Row>
            <Row className="justify-content-end">
              <h2>
                <FcLikePlaceholder />
              </h2>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
    </div>
  );
}

export default PhotoCard;
