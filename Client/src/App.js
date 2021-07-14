import './App.css';
import './CSS/Header.css';
import './CSS/Footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './Components/HomePage'
import Place from './Components/Places'
import Gallery from './Components/Community-Area/Gallery';
import LeaderBoard from './Components/Community-Area/LeaderBoard';
import Something from './Components/Community-Area/Something';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import SignUp from './Components/SignUp';
import PlacePage from './Components/All-Places-Components/PlacePage';
import Cookies from 'js-cookie'
import AddPlace from './Components/AddPlace'


function App() {
  const [user, setUser] = useState(Cookies.get('session_id') ? JSON.parse(Cookies.get('session_id')) : '')
  const [expanded, setExpanded] = useState(false);
  const handleUser = (userId) => setUser(userId) 
  console.log(user)


  const handelExpanded = (val) => setExpanded(val)
  return (
      <Router >
    <div className="App">
      
      <Header expanded={expanded} handelExpanded={handelExpanded} user={user} handleUser={handleUser}/>

      <Switch>
      <Route path='/HomePage'> 
        <HomePage/>
      </Route>
      
      <Route path='/places'> 
        <Place/>
      </Route>

      <Route path='/Gallery'> 
        <Gallery/>
      </Route>
      <Route path='/LeaderBoard'> 
        <LeaderBoard/>
      </Route>
      <Route path='/Something'> 
        <Something/>
      </Route>
      <Route path='/SignUp'> 
        <SignUp handleUser={handleUser}/>
      </Route>
      <Route path='/add-place'> 
        <AddPlace/>
      </Route>

      <Route path='/'> 
        <HomePage/>
      </Route>
        </Switch>

      <Footer/>
    </div>
      </Router>
  );
}

export default App;
