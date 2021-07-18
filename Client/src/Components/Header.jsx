import React from 'react'
import logo from '../logo.svg';
import SignArea from './SignArea';
import {Navbar,NavDropdown,Nav,Image} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import {useState} from 'react'
import Sginout from './Sginout';


function Header({expanded,handelExpanded,handleUser,user}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSignOut, setShowSignOut] = useState(false);
  const handleSignOutClose = () => setShowSignOut(false);
  const handleSignOutShow = () => setShowSignOut(true);

    return (
<Navbar sticky="top" variant='dark' expanded={expanded} expand="lg" className='shadow w-100 text-center' style={{minHeight:'14vh'}}>
    <Navbar.Brand as={Link} to='/' onClick={() => setTimeout(() => {handelExpanded(false)}, 150)}>

      <div className='mx-3 spinhov3D'>
      <Image className='App-logo' src={logo} alt='logo'/>
      <h5>G&Oslash;&Oslash;D</h5>
      </div>

      </Navbar.Brand>
    <Navbar.Toggle onClick={() => handelExpanded(expanded ? false :'expended')} aria-controls="basic-navbar-nav" className='m-3' />
    <Navbar.Collapse id="basic-navbar-nav" >

      <Nav id='mainNav' className="me-auto">
        <Nav.Link as={Link} to='/HomePage' onClick={() => setTimeout(() => {handelExpanded(false)}, 150)}>Home</Nav.Link>
        <Nav.Link as={Link} to='/places' onClick={() => setTimeout(() => {handelExpanded(false)}, 150)}>All Places</Nav.Link>
        {!!user.name&&<NavDropdown title="Community Area" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to='/Gallery' onClick={() => setTimeout(() => {handelExpanded(false)}, 150)}>Gallery</NavDropdown.Item>
          <NavDropdown.Item as={Link} to='/LeaderBoard' onClick={() => setTimeout(() => {handelExpanded(false)}, 150)}>Leader Board</NavDropdown.Item>
          <NavDropdown.Item as={Link} to='/Something' onClick={() => setTimeout(() => {handelExpanded(false)}, 150)}>Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item >My Reviews</NavDropdown.Item>
        </NavDropdown>}
      </Nav>

      <Nav className='ml-auto' activeKey={1} id='userNav'>
      {!user.name&&<Nav.Link  eventKey={1} onClick={handleShow}>Sign-in</Nav.Link>}
      {!!user.name&&<Nav.Link as={Link} to='/profile' eventKey={1} >hi,{user.name}</Nav.Link>}
        <SignArea user={user} show={show} handleClose={() => setTimeout(() => {handelExpanded(false);handleClose()}, 50) } handleUser={handleUser} />
      {!!user.name&&<Nav.Link onClick={handleSignOutShow}>Logout</Nav.Link>}
      <Sginout  handleClose={handleSignOutClose} show={showSignOut} handleUser={handleUser}/>
    </Nav>
    
    </Navbar.Collapse>



</Navbar>
    )
}

export default Header
