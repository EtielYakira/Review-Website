import React, { useEffect, useState, useRef } from "react";
import { getPlaceById, getPlaces, getUsers } from "../DAL/api";
import { Row, Col, Table, Carousel } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import {MdRateReview} from 'react-icons/md'
import {GoVerified} from 'react-icons/go'
import {FaUserFriends,FaMapMarked} from 'react-icons/fa'

function HomePage() {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const [NUMBERS_DATA,setNUMBERS_DATA] = useState({}) 
  let history = useHistory();
  const handleNumber = (values) => setNUMBERS_DATA({...NUMBERS_DATA,...values})

useEffect(() => {
  
  getUsers().then(data => handleNumber({users:data.length}))
  getPlaces().then(data => {
    let places = data.length
    let placesVerified = data.filter(place => place.verified === 1).length
    let reviews = data.reduce((acc,currValue) => acc + currValue.reviews.length,0) 
    handleNumber({places,placesVerified,reviews})
  })
}, [])



  useEffect(() => {
    let totalReviews = 0;
    const places = [];
    getPlaces().then((data) =>
      data.forEach((place) => {
        places.push({
          name: place.name,
          image: place.image,
          id: place.id,
          address: {
            street: place.streetName,
            streetNumber: place.streetNumber,
            country: place.country,
          },
        });
        totalReviews += place.reviews.length;
      })
    );
    setOptions(places);
  }, []);

  //   useEffect(() => {
  //     window.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       window.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   });

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updatePlace = (place) => {
    setSearch(place);
    setDisplay(false);
  };

  return (
    <div className="component">
    

      <div className="container mt-2">
        <div className="pagey">
            <div className='wrapTileHome d-flex flex-column justify-content-between'>




              <div
        ref={wrapperRef}
        className="container autocomplete"
        // className="container flex-column justify-content-center"
      >
        <input
          id="auto"
          className="w-100"
          placeholder="Type to search"
          onFocus={() => setDisplay(!display)}
        //   onSelect={() => setDisplay(true)}
          onBlur={() => setTimeout(() => setDisplay(!display),100)}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{height:'50px'}}
        />
        {display && (
          <Table className="" striped bordered hover>
              <div className='autocomplete-items'>
            {options.filter(
              ({ name }) =>
                name.toLowerCase().indexOf(search.toLowerCase()) > -1
            ).length > 0 ? (
              options
                .filter(
                  ({ name }) =>
                    name.toLowerCase().indexOf(search.toLowerCase()) > -1
                )
                .map((value, i) => {
                  return (
                    <div
                      onClick={() => {
                        updatePlace(value.name);
                        setTimeout(() => {
                          history.push(`/places/${value.id}`);
                        }, 1000);
                      }}
                      className="option"
                      key={i}
                      tabIndex="0"
                    >

                          <span>{value.name}{' '}
                            {value.address.street +
                              "," +
                              value.address.streetNumber +
                              "," +
                              value.address.country}
                          </span>

                      {/* <img src={`./uploads/${value.image}`} alt="place" /> */}
                    </div>
                  );
                })
                .slice(0, 5)
            ) : (
              <div className="text-center" style={{ fontSize: "44px" }}>
                <span className="text-center mx-auto">
                  Opps! We don't have your place yet
                </span>{" "}
                <span className="text-center">
                  <Link to="/add-place"> Add your Place Here</Link>
                </span>
              </div>
            )}
            </div>
          </Table>
        )}
      </div>



          <h1 className="homeTitle">
            GØØD connects people with great local businesses 
          </h1>
            </div>
        </div>

        <Row className="w-75 mx-auto">
        <div className="container mt-2">
    <div className="row">
        <div className="col-md-4 col-xl-3">
            <div className="card bg-c-blue order-card">
                <div className="card-block">
                    <h6 className="m-b-20">More Then</h6>
                    <h2 className="text-right"><i className="fa fa-credit-card f-left"></i><span>{NUMBERS_DATA.places-1}</span><span className="f-right"><FaMapMarked size='80px'/></span></h2>
                    <p className="m-b-0">Places Added<span className="f-right"></span></p>
                </div>
            </div>
        </div>
        
        <div className="col-md-4 col-xl-3">
            <div className="card bg-c-green order-card">
                <div className="card-block">
                    <h6 className="m-b-20">More Then</h6>
                    <h2 className="text-right"><i className="fa fa-credit-card f-left"></i><span>{NUMBERS_DATA.placesVerified-1}</span><span className="f-right"><GoVerified size='80px'/></span></h2>
                    <p className="m-b-0">Verified Places<span className="f-right"></span></p>
                </div>
            </div>
        </div>
        
        <div className="col-md-4 col-xl-3">
            <div className="card bg-c-yellow order-card">
                <div className="card-block">
                    <h6 className="m-b-20">More Then</h6>
                    <h2 className="text-right"><i className="fa fa-credit-card f-left"></i><span>{NUMBERS_DATA.users-1}</span><span className="f-right"><FaUserFriends size='80px'/></span></h2>
                    <p className="m-b-0">Signed Users<span className="f-right"></span></p>
                </div>
            </div>
        </div>
        
        <div className="col-md-4 col-xl-3">
            <div className="card bg-c-pink order-card">
                <div className="card-block">
                    <h6 className="m-b-20">More Then</h6>
                    <h2 className="text-right"><i className="fa fa-credit-card f-left"></i><span>{NUMBERS_DATA.reviews-1}</span><span className="f-right"><MdRateReview size='80px'/></span></h2>
                    <p className="m-b-0">Different Reviews<span className="f-right"></span></p>
                </div>
            </div>
        </div>
	</div>
</div>
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
