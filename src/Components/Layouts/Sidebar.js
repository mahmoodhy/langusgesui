import { Nav } from 'react-bootstrap';  

function Sidebar() {  
    return (  
        <div className="sidebar bg-light mt-20">  
            <Nav defaultActiveKey="/" className="flex-column">  
                <Nav.Link href="/">خانه</Nav.Link>  
                <Nav.Link href="/Statistics">آمار</Nav.Link>  
                <Nav.Link href="/products">Products</Nav.Link>  
                <Nav.Link href="/customers">Customers</Nav.Link>  
            </Nav>  
        </div>  
    );  
}  

export default Sidebar;  