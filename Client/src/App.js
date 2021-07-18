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
import AuthApi from './Components/aute/Auth';
import Protected from './Components/aute/Protected';
import UserProfile from './Components/UserProfile'

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
      <Route exact path='/'> 
        <HomePage/>
      </Route>
        <AuthApi.Provider value={{user,handleUser}} >
      <Route path='/HomePage'> 
        <HomePage/>
      </Route>
      
      <Route path='/places'> 
        <Place/>
      </Route>
      <Protected path='/profile' component={UserProfile}/>
     <Protected path='/Gallery' component={Gallery} />
     <Protected path='/LeaderBoard' component={LeaderBoard} />
     <Protected path='/Something' component={Something} />

      <Route path='/SignUp'> 
        <SignUp handleUser={handleUser}/>
      </Route>

      <Protected path='/add-place' component={AddPlace} />

    
      </AuthApi.Provider>
        </Switch>

      <Footer/>
    </div>
      </Router>
  );
}

export default App;
