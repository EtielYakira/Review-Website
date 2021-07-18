import React, { useEffect } from 'react'
import { useState } from 'react'
import { Table, Image } from 'react-bootstrap'
import { getUsers } from '../../DAL/api'
import Podium from './Podium'

function LeaderBoard() {
    const [users, setUsers] = useState([1,2,3])

    const handleUsers = (data) => setUsers(data)

    useEffect(() => {
        getUsers().then(data =>{
            const newData = data.map(user => {
                return {name:user.name,numberOfReviews:user.reviews.length,img:user.profileImage}
            })
            .sort((a,b) => b.numberOfReviews - a.numberOfReviews)
            .slice(0,20)
            
            handleUsers(newData)
        })
        
    }, [])
    return (
        <div className='component'>
            <h1 className='text-center text-decoration-underline fw-bolder bg-info'>Leader Board</h1>
            {

              !!users && <Podium users={users}/>
           
            }
            <div className='container-fluid mt-4 mb-2'>
            {
                <Table>
                    <thead>
                        <tr>
                            <th>#Place</th>
                            <th>Name</th>
                            <th>Reviews</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user,index) => {
                                return (
                                    <tr className={index === 0 ? 'gold'
                                : index === 1 ? 'silver'
                                : index === 2 ? 'bronze'
                                : null}>
                                        <td >
                                            {index+1}
                                        </td>

                                        <td className='fw-bolder'>
                                            {user.name}
                                        {<img className='d-none d-lg-block' alt={index} style={{height:'100px',border:'1px solid black'}} src={`../uploads/${user.img}`} />}
                                        </td>
                                        <td className='text-primary' >
                                            {user.numberOfReviews}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            }
            </div>
        </div>
    )
}

export default LeaderBoard
