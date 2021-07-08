import React from 'react'
import {getImagesOfReviewsWithImageLikes} from '../../DAL/api'

function Gallery() {

    return (
        <div className='component'>
            <h1>i am Gallary</h1>

            {getImagesOfReviewsWithImageLikes().then(data => data.map())}
        </div>
    )
}

export default Gallery
