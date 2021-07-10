import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { getPlaceById } from '../../DAL/api'

function PlacePage() {
    const {placeId} = useParams()
    const [place, setPlace] = useState('')
    useEffect(() => {
        getPlaceById(placeId).then(data => setPlace(data))
    }, [placeId])

    return (
        <div className='component'>
            <h1 className="text-center"> {place.name}</h1>
            <h1 className="text-center"> {place.id}</h1>
        </div>
    )
}

export default PlacePage
