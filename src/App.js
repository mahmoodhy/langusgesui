import { BrowserRouter, Route,Routes } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie'
import Sidebar from './Components/Layouts/SidebarDeleteIt';

import Home from './pages/Home'
import Login from './Login'
import './App.css'
import { useEffect, useState } from 'react'
import useToken from './pages/Operates/useToken';
import Layout from "./pages/Layout";
import Statistics from "./pages/Statistics";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

function App() {
  const [initialSearchText, setInitialSearchText] = useState('');
  const { token, setToken } = useToken();
  if(!token) {
        return <Login setToken={setToken} />
  }
  const handleSearch = (word) => {
    setInitialSearchText(word);
  };
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Layout pageName='path' searchWord={initialSearchText} loggedIn={true}  /> }>
          <Route index element={<Home onSearch={handleSearch}/>} />
         
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>       
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;