import { Outlet, Link, useLocation } from "react-router-dom";
import { useCookies } from 'react-cookie'

import { useEffect, useState } from "react";
import NavBar from '../../src/Components/Layouts/Navbar';  
import Sidebar from '../../src/Components/Layouts/Sidebar';
const Layout = (props) => {
  const { loggedIn, pageName } = props
  
  const [path, setPath] = useState('صفحه اول');
  var location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);  
  const toggleSidebar = () => {  
    setSidebarOpen(!isSidebarOpen);  
};  
 
  useEffect(() => {
    if (location.pathname === "/")
      setPath('صفحه اول');
    else
      setPath(location.pathname);
  }, [location.pathname]);
  return (
    <div className="">
      <div className="d-flex bg-light">  
      <button className="btn btn-primary h-25" onClick={toggleSidebar}>  
                ☰  
            </button>  
            {isSidebarOpen && <Sidebar />}  
            <div className={`container-fluid ${isSidebarOpen ? 'content-expanded' : ''}`}>  
                <NavBar loggedIn={loggedIn} toggleSidebar={toggleSidebar} />  
                <main><Outlet /></main>  
            </div>  
        </div>  
      <header>
        
       
      </header>


     
    </div>
  )
};

export default Layout;