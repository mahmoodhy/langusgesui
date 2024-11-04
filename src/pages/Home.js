import {React,useState} from 'react'
import useToken from './Operates/useToken';
import Login from '../Login'
import { CookiesProvider, useCookies } from 'react-cookie'
import ShowWordCard from './ShowWordCard/index'
import SearchWord from './ShowWordCard/SearchWord'




const Home = (props) => {
  const [initialSearchText, setInitialSearchText] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'token'])
  const { token, setToken } = useToken();
  const onButtonClick = () => {
    removeCookie('user');
    removeCookie('token');

    setToken('');
    window.location.href = '/';
  }
  const handleSearch = (word) => {
    setInitialSearchText(word);
  };
  return (
  
     
      
        <div className='p-2'>
           <SearchWord token={cookies.token.token} startword={initialSearchText} onSearch={handleSearch}/>

            <ShowWordCard wordcount='20' token={cookies.token.token} onSearch={handleSearch}/>
          

          </div>
     

       

       
  )
}

export default Home