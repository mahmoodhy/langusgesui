import { Outlet, Link, useLocation } from "react-router-dom";
import { useCookies } from 'react-cookie'

import { useEffect, useState } from "react";
import NavBar from '../../src/Components/Layouts/Navbar';  
const Layout = (props) => {
  const { loggedIn, pageName,searchWord } = props
  
  const [path, setPath] = useState('صفحه اول');
  var location = useLocation();

 
  useEffect(() => {
    if (location.pathname === "/")
      setPath('صفحه اول');
    else
      setPath(location.pathname);
  }, [location.pathname]);
  return (
    <div className="">
      <div className="d-flex bg-light">  
      
            <div className='container-fluid'>  
                <NavBar loggedIn={loggedIn} searchWord={searchWord}  />  
                <main><Outlet /></main>  
            </div>  
        </div>  
      <header>
        
       
      </header>


     
    </div>
  )
};

export default Layout;