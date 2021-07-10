import React from 'react'
import { Col, Row,Container } from 'react-bootstrap'
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
import useTable from './useFuunctions/useTable'
import { TableBody, TableRow ,TableCell, TableContainer, Paper, makeStyles} from '@material-ui/core';
import MUIplaceCard from './All-Places-Components/MUIplaceCard';
import PlacePage from './All-Places-Components/PlacePage';



const useStyles = makeStyles({
    image: {
      maxWidth: 200,
      maxHeight: 250
    }
});

function Places() {
    let match = useRouteMatch();
    let classes = useStyles()
    const {TblContainer} = useTable()
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
            console.log(dataToSend[5].image)
            setPlaces(dataToSend)
            // setPlaces(data)
        })
        
    }, [])
   
    return (
        <TableContainer component={Paper}>
            <Container>
        <div className='component '>
            <Row className='mx-auto p-5'>
            {places.map(place => <Col lg={4} md={6} sm={12} xs={12}>
            <PlaceCard place={place}/>
            </Col>
            )}
            </Row>



            
            <TblContainer>
                <TableBody>
                    {
                    places.map(place => (
                        <TableRow as={Link} to={`Places/${place.id}`} key={place.id}>
                            <TableCell><img src={place.image || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.McCWaBPppsmGXSo0wC6XtAHaHa%26pid%3DApi&f=1'} alt='asd' className={classes.image}/></TableCell>
                            <TableCell className=''>{place.name}</TableCell>
                            <TableCell>{place.summeryText}</TableCell>
                            <TableCell>{place.rating}</TableCell>
                            <TableCell><Link to={`Places/${place.id}`}>go to places</Link></TableCell>
                            
                        </TableRow>))
                    }
                </TableBody>
            </TblContainer>
            {/* <Route path="places/:id" component={PlacePage} /> */}
        </div>

        </Container>
        </TableContainer>
        
    )
}

export default Places