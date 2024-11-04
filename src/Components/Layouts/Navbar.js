import { Navbar, Nav } from 'react-bootstrap';  
import Welcome from './Welcome';
import Logout from './Logout';

function NavBar({loggedIn}) {  
    return (  
        <Navbar bg="light" expand="lg">  
            <Navbar.Brand href="/">صفحه اصلی</Navbar.Brand>  
            <Navbar.Toggle aria-controls="basic-navbar-nav" />  
            <Navbar.Collapse id="basic-navbar-nav">  
                <Nav className="me-auto">  
                    <Nav.Item><Welcome loggedIn={loggedIn}></Welcome></Nav.Item>  
                    <Nav.Item><Logout loggedIn={loggedIn}></Logout> </Nav.Item>  
                </Nav>  
            </Navbar.Collapse>  
        </Navbar>  
    );  
}  

export default NavBar;  