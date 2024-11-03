import { Outlet, Link, useLocation } from "react-router-dom";
import { CookiesProvider, useCookies } from 'react-cookie'
import useToken from './Operates/useToken';
import { useEffect, useState } from "react";

const Layout = (props) => {
  const { loggedIn, pageName } = props
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'token'])
  const { token, setToken } = useToken();
  const [path, setPath] = useState('صفحه اول');
  var location = useLocation();
  const onButtonClick = () => {
    removeCookie('user');
    removeCookie('token');
    sessionStorage.clear();
    setToken('');
    window.location.href = '/';
  }
  useEffect(() => {
    if (location.pathname === "/")
      setPath('صفحه اول');
    else
      setPath(location.pathname);
  }, [location.pathname]);
  return (
    <div className="">
      <header>
        <div className="row bg-green-100 w-screen fixed z-1">
          <div className="col-2"><h1>{path}</h1></div>

          <div className="col-6">
            {loggedIn ? <div>خوش آمدید {cookies.user}</div> : <div />}</div>
          <div className="col-4">
            <input
              className="danger"
              type="button"
              onClick={onButtonClick}
              value={loggedIn ? 'خارج شوید' : 'Log in'} 
            /></div>
        </div>

      </header>
<nav>hello</nav>

      <main>
        <Outlet />
      </main>

    </div>
  )
};

export default Layout;