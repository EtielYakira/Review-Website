import React from 'react'
import { Image } from 'react-bootstrap';

function Podium({users}) {
    console.log(users);
    return (

        <div  className = 'container d-none d-lg-block'>
                   
          <div className = 'd-flex'>
           <div>
            <div className = 'podium silver'>
              <div className = 'position'>
                <div>
                  2
                </div>
              </div>
              <div className = 'class-information'>
                <div className = 'title'>
                  {users[1].name}
                </div>
                <div className = 'year-group'>
                contributed <strong style={{color:'blue',fontSize:'25px'}}>{users[1].numberOfReviews}</strong> reviews
                </div>

              </div>  
          </div>
        </div>
          
       <div>
          <div className = 'podium gold'>
            <div className = 'position'>
              <div>
                1
              </div>  
            </div>
            <div className = 'class-information'>
              <div className = 'title'>
                {users[0].name}
              </div>
              <div className = 'year-group'>
              contributed <strong style={{color:'blue',fontSize:'40px'}}>{users[0].numberOfReviews}</strong> reviews
            <Image style={{width:'100px'}} src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpurepng.com%2Fpublic%2Fuploads%2Flarge%2Fgold-medal-l3u.png&f=1&nofb=1' alt='first'/>
              </div>
            </div> 
          </div>
        </div>
          
          
        <div>
          <div className = 'podium bronze'>
            <div className = 'position'>
              <div>
              3
              </div>
            </div>
            <div className = 'class-information'>
              <div className = 'title'>
                {users[2].name}
              </div>
              <div className = 'year-group'>
              contributed <strong style={{color:'blue',fontSize:'25px'}}>{users[2].numberOfReviews}</strong> reviews
              </div>

            </div>
          </div>
         </div> 
      </div> 
      
        </div>
    )
}

export default Podium
