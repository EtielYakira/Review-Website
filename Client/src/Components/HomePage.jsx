import React, { useEffect, useState, useRef } from "react";
import { getPlaceById, getPlaces } from "../DAL/api";
import { Row, Col, Table, Carousel } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

function HomePage() {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  let history = useHistory();
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

        <Row className="justify-content-center">
          <Carousel className="">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VCU6DnChG08YSvVgmAhQYgHaE8%26pid%3DApi&f=1"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VCU6DnChG08YSvVgmAhQYgHaE8%26pid%3DApi&f=1"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VCU6DnChG08YSvVgmAhQYgHaE8%26pid%3DApi&f=1"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
