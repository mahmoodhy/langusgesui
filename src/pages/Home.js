import {React,useState} from 'react'
import useToken from './Operates/useToken';
import Login from '../Login'
import { CookiesProvider, useCookies } from 'react-cookie'
import ShowWordCard from './ShowWordCard/index'
import SearchWord from './ShowWordCard/SearchWord'
import { Container } from 'react-bootstrap';




const Home = ({onSearch}) => {
  const [initialSearchText, setInitialSearchText] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['user', 'token'])
  const { token, setToken } = useToken();
  const onButtonClick = () => {
    removeCookie('user');
    removeCookie('token');

    setToken('');
    window.location.href = '/';
  }
  const handleSearch = async(word) => {
    onSearch(word);
  };
  return (
  
     
      
        <Container fluid>
            <ShowWordCard wordcount='20' token={cookies.token.token} onSearch={handleSearch}/>        

          </Container>
     

       

       
  )
}

export default Home