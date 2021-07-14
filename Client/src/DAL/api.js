const axios = require('axios');
const config = { headers: {'Content-Type' : 'application/json','Access-Control-Allow-Origin': 'http://localhost:9000'},withCredentials: true}

//Places

////GET FUNCTIONS
const getPlaces = async () => {
    const data = await axios.get('http://localhost:9000/places',config)
    return data.data
    
        // let places = await fetch('http://localhost:9000/places')
        // let response =  places.json()
        // return response
} 
const getPlaceById = async (placeId) => {
        let place = await fetch(`http://localhost:9000/places/${placeId}`)
        let response =  place.json()
        return response
} 
const postPlace = async (values) => {
    const data = await axios.post('http://localhost:9000/places',values,config)
    .catch(err => console.log(err))

}


//Users
////GET FUNCTIONS
const getUsers = async () => {
    let users = await fetch('http://localhost:9000/users')
    let response =  users.json()
    return response
}
const getUserByUserName = async (values) => {
     return await axios.post('http://localhost:9000/users/signin', values, config)
    //   .then(function(response) {
    //       console.log(response.data)
    //     return response.data
    //   })
      .catch(function(error) {
        return {message:"something wet wrong"}
      });

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Accept': 'application/json','Content-Type': 'application/json' }
       
    // };
    // try{
    // let user = await fetch('http://localhost:9000/users/signin',{ ...requestOptions,  body:JSON.stringify(values)})
    // let response =  user.json()
    // return response 
    // }catch{
    //     console.log('rerer');
    // }
}

const getUserByUserId = async (userId) => {
    try{
    let user = await fetch(`http://localhost:9000/users/${userId}`)
    let response =  user.json()
    return response 
    }catch{
        console.log('rerer');
    }


    // let user = await fetch(`http://localhost:9000/users`,)
    // let response =  user.json()
    // return response
}

//Images
////GET FUNCTIONS
const getImagesOfReviewsWithImageLikes = async () =>{
    let images = await fetch(`http://localhost:9000/images`)
    let response =  images.json()
    return response
}

const getImagesOfReviewsByReviewId = async (reviewId) =>{
    let images = await fetch(`http://localhost:9000/images`)
    let response =  images.json()
    return response
}



//Categories
////GET FUNCTIONS
const getCategoryById = async (categoryId) => {
    let category = await fetch(`http://localhost:9000/categories/${categoryId}`)
    let response =  category.json()
    return response
}
const getTags = async () => {
    let tags = await fetch(`http://localhost:9000/tags`)
    let response =  tags.json()
    return response
}


const getCategories = async () => {
    let categories = await fetch(`http://localhost:9000/categories`)
    let response =  categories.json()
    return response
}


const getReviewsOfPlaceByPlaceId = async (placeId) => {
    let reviews = await fetch(`http://localhost:9000/reviews/${placeId}`)
    let response =  reviews.json()
    return response
}



//// POST FUNCTIONS

//// DELETE FUNCTIONS

//// PUT FUNCTIONS




// pagination

// const Pagination = async (pageToShow = 1, numberOfObjectsInPage = 25)

export {postPlace,getCategories,getPlaces,getUserByUserName,getImagesOfReviewsWithImageLikes,getPlaceById,getUserByUserId,getTags}
