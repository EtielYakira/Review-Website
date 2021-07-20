import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { HashLink as Link } from 'react-router-hash-link';
import { getPlaces, getUserByUserId } from "../../DAL/api";

function MyReviews() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getPlaces().then((data) => {
      const newDate = data.map((place) => {
        const [userReview] = place.reviews.filter(
          review => review.userId === +JSON.parse(Cookies.get("session_id")).id 
        );
       
        return { placeId: place.id, placeName: place.name, ...userReview };
      }).filter(place => place.userId)
      setReviews(newDate);
    });
  }, []);
  return (
    <div className="component">
      <h2 className="text-center mt-3">My Reviews</h2>
      <Table striped bordered hover className="w-50 mx-auto m-5">
        <thead>
          <tr>
            <th className="">#</th>
            <th className="text-decoration-underline">Place Name</th>
            <th className="text-decoration-underline">Post Date</th>
            <th className="text-decoration-underline">Link</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{review.placeName}</td>
              <td>{review.postDate}</td>
              <td>
                <Link
                // to={{
                //     pathname:`/Places/${review.placeId}`,
                //     hash:`#${JSON.parse(Cookies.get("session_id")).id}`
                // }}
                  to={`/Places/${review.placeId}#${
                    JSON.parse(Cookies.get("session_id")).id
                  }`}
                >
                  Go to Review
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MyReviews;
