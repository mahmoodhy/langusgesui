import { Navbar, Nav, Container, Offcanvas, Form, Button, NavDropdown } from 'react-bootstrap';
import Welcome from './Welcome';
import Logout from './Logout';
import SearchWord from '../../pages/ShowWordCard/SearchWord';
import { CookiesProvider, useCookies } from 'react-cookie'
import {React,useState} from 'react'

function NavBar({ loggedIn,searchWord }) {
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'token'])
    

    return (
        // <Navbar bg="light" expand="lg" className="bg-body-tertiary">  
        // <Container>
        //     <Navbar.Brand href="/">صفحه اصلی</Navbar.Brand>  
        //     <Navbar.Toggle aria-controls="basic-navbar-nav" />  
        //     <Nav className="me-auto">  
        //     <Nav.Link href="/">Home</Nav.Link>
        //     <Nav.Link href="/Statistics">Link</Nav.Link>
        //             <Nav.Item><Welcome loggedIn={loggedIn}></Welcome></Nav.Item>  
        //             <Nav.Item><Logout loggedIn={loggedIn}></Logout> </Nav.Item>  
        //         </Nav>  
        //     <Navbar.Collapse id="basic-navbar-nav">  
        //         <Sidebar></Sidebar>
        //     </Navbar.Collapse>  
        //     </Container>
        // </Navbar>  
        <Navbar expand='lg' className="bg-body-tertiary mb-3">
            <Container fluid>
            <Navbar.Brand href="#" className=""> <i class="fa-solid fa-language me-3 fa-3x" style={{ color: '#709085' }}></i></Navbar.Brand>

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand`}
                    aria-labelledby={`offcanvasNavbarLabel-expand`}
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                            بستن
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-start flex-grow-1 pe-3">
                            <Nav.Link href="/">خانه</Nav.Link>
                            <Nav.Link href="/statistics">آمار</Nav.Link>
                           

                        </Nav>
                        <SearchWord className="d-flex" token={cookies.token.token} startword={searchWord}/>
                        <NavDropdown title={<i class="fa-regular fa-user fa-2x"></i>} id="collapsible-nav-dropdown" className=' mx-5'>
                                <NavDropdown.Item href="#action/3.2">
                                <Welcome loggedIn={loggedIn}></Welcome>
                                </NavDropdown.Item>
                                <NavDropdown.Item><Logout loggedIn={loggedIn}></Logout></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    ؟
                                </NavDropdown.Item>
                            </NavDropdown>
                           
                        {/* <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

            </Container>
        </Navbar>
    );
}

export default NavBar;  