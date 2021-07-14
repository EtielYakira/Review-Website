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
import { TableBody, TableRow ,TableCell, TableContainer, Paper, makeStyles, Toolbar, InputAdornment} from '@material-ui/core';
import MUIplaceCard from './All-Places-Components/MUIplaceCard';
import PlacePage from './All-Places-Components/PlacePage';
import Controls from './controls/Control';
import { Search } from '@material-ui/icons';
import {GiArchiveResearch} from 'react-icons/gi'
import AddPlace from './AddPlace'

const useStyles = makeStyles((theme) => ({
    image: {
      maxWidth: 250,
      maxHeight: 250
    },
    searchInput:{
        width:'75%',
        margin: theme.spacing(5),
    },
    tableCell: {
        paddingRight: 4,
        paddingLeft: 5
      },

}));

const headCells = [
    {id:'image' ,label:"Image"},
    {id:'name' ,label:"Name"},
    {id:'summeryText' ,label:"Summery"},
    {id:'rating' ,label:"Rating"},
    {id:'reviewNumber' ,label:"Timed Reviewed"},
    {id:'link' ,label:"Link"},
]

function Places() {
    let match = useRouteMatch();
    let classes = useStyles()
    const [places, setPlaces] = useState([])
    const [filterFn, setFilterFn] = useState({fn: places => {return places;}})
    // console.log(order,categoryId,orderBy);
function getAvgRating(place) {
    return place.reviews.reduce((acc,curVal) => acc + curVal.rating,0)/place.reviews.length || 0
}
const {TblContainer,TblHead,TblPagination,recordAfterPaginationAndSorting} = useTable(places,headCells,filterFn)

const handleSearch = e =>{
    let target = e.target
    setFilterFn({
        fn: places =>{
            if(target.value == "")
                return places;
                else
                return places.filter(place => place.name.toLowerCase().includes(target.value.toLowerCase()))

        }
    })
}


    useEffect(() => {
        console.log(getPlaces())
        getPlaces().then(data => {
            console.log(data, 'data')
            let order = new URLSearchParams(window.location.search).get('order') || 'desc'
            let categoryId = new URLSearchParams(window.location.search).get('categoryId')
            let orderBy = new URLSearchParams(window.location.search).get('orderBy') || 'rating'
            data = data.map(place => { return {...place,reviewNumber:(place.reviews.length), rating:(place.reviews.reduce((acc,curVal) => acc + curVal.rating,0)/place.reviews.length || 0)}})
            let dataToSend;
            if(order.toLowerCase() === 'desc' || order.toLowerCase() === 'asc' ){
                if(order.toLowerCase() === 'desc'){
                // dataToSend = data.sort((a,b) => b[orderBy] - a[orderBy])
                dataToSend = data.sort((a,b) => getAvgRating(b) - getAvgRating(a))

                }else if(order.toLowerCase() === 'asc'){

                // dataToSend = data.sort((a,b) => a[orderBy] - b[orderBy])
                dataToSend = data.sort((a,b) => getAvgRating(a) - getAvgRating(b))
                }
            }else{
                dataToSend = data
            }
            
            dataToSend = !!categoryId ? dataToSend.filter(ele => ele.categoryID === +categoryId) : dataToSend; 

            setPlaces(dataToSend)
            // setPlaces(data)
        })
        
    }, [])

  
   
    return (
        <TableContainer component={Paper}>
            <Container>
        <div className='component  mt-4'>
            {/* <Row className='mx-auto p-5'>
            {places.map(place => <Col lg={4} md={6} sm={12} xs={12}>
            <PlaceCard place={place}/>
            </Col>
            )}
            </Row> */}



            <Toolbar>
                <Controls.Input
                className='w-100'
                    label='Search Place'
                    onChange={handleSearch}
                />
            </Toolbar>
            <TblContainer>
                <TblHead/>
                <TableBody>
                    {recordAfterPaginationAndSorting().length > 0 ?
                    recordAfterPaginationAndSorting().map(place => (
                        <TableRow as={Link} to={`Places/${place.id}`} key={place.id}>
                            <TableCell><img src={place.image.split("-")[0] === 'image' ? `../uploads/${place.image}` : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.McCWaBPppsmGXSo0wC6XtAHaHa%26pid%3DApi&f=1'} alt='asd' className={classes.image}/></TableCell>
                            <TableCell className=''>{place.name}</TableCell>
                            <TableCell>{place.summeryText.substr(0,100)+"..."}</TableCell>
                            <TableCell>{place.rating|| 'no rating yet'}</TableCell>
                            <TableCell>{place.reviewNumber}</TableCell>
                            <TableCell><Link to={`Places/${place.id}`}>go to place</Link></TableCell>
                        </TableRow> 
                        ))
                        :
                        <TableRow >
                        <TableCell colSpan={6}>
                            <div className='text-center' style={{fontSize:'44px'}}>
                            <span className='text-center mx-auto'>Opps! We don't have your place yet 
                            </span> 
                            {" "}
                                <span className='text-center'>
                                    <Link to='/add-place'> Add your Place Here</Link>
                                </span>
                                </div>

                        </TableCell>

                           </TableRow> 

                    }
                </TableBody>
            </TblContainer>
            {/* <Route path="places/:id" component={PlacePage} /> */}    <TblPagination />
        </div>

        </Container>
        </TableContainer>
        
    )
}

export default Places