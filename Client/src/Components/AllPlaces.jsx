import React from 'react'
import { Col, Nav, Navbar,Button, Form,FormControl, Card, CardDeck, Row, NavDropdown } from 'react-bootstrap'
import { getPlaces } from '../DAL/api'
import PlaceCard from './All-Places-Components/PlaceCard'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
  import {useState, useEffect} from 'react'


function Places() {
    const [places, setPlaces] = useState([])
    // console.log(order,categoryId,orderBy);
    useEffect(() => {
        getPlaces().then(data => {
            let order = new URLSearchParams(window.location.search).get('order') || 'desc'
            let categoryId = new URLSearchParams(window.location.search).get('categoryId')
            let orderBy = new URLSearchParams(window.location.search).get('orderBy') || 'rating'
            let dataToSend
            if(order.toLowerCase() === 'desc' || order.toLowerCase() === 'asc' ){
                if(order.toLowerCase() === 'desc'){
                dataToSend = data.sort((a,b) => b[orderBy] - a[orderBy])
                }else if(order.toLowerCase() === 'asc'){
                dataToSend = data.sort((a,b) => a[orderBy] - b[orderBy])
                }
            }else{
                dataToSend = data
            }
            
            dataToSend = !!categoryId ? dataToSend.filter(ele => ele.categoryID === +categoryId) : dataToSend; 
            console.log(dataToSend);
            setPlaces(dataToSend)
            // setPlaces(data)
        })
        
    }, [])
   
    return (
        <div className='component '>
            <Row className='mx-auto p-5'>
            {places.map(place => <Col lg={4} md={6} sm={12} xs={12}>
            <PlaceCard place={place}/>
            </Col>
            )}
            </Row>
        </div>
    )
}

export default Places