import React, { useState } from 'react'
import PropTypes from 'prop-types';
import loggedIn from '../pages/Home'
import configData from "../../src/config.json";
import pic from '../Learning-English-Made-Easier-Tips-To-Follow-2-1.jpg'
import { CookiesProvider, useCookies } from 'react-cookie'
import { Button, Form ,Row,Col, Container } from 'react-bootstrap';



async function loginUser(credentials) {
  return fetch(`${configData.SERVER_URL}/api/Authenticate/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())

}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [errors, setError] = useState([]);
  const [cookies, setCookie] = useCookies(['user', 'token'])
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = await loginUser({
      username,
      password
    });
    setLoading(false);
    if (!token) {
      setError( // Replace the state
        [ // with a new array
          //...errors, // that contains all the old items
          { error: "error", 0: "خطای سرور دوباره تلاش کنید" } // and one new item at the end
        ]
      );
    }
    else {

      setToken(token);
      setCookie('user', username);
      setCookie('token', token);

      if (token.status === 400)

        setError(token.errors);

      else if (token.status === 401) {
        setError( // Replace the state
          [ // with a new array
            //...errors, // that contains all the old items
            { error: "error", 0: token.title } // and one new item at the end
          ]
        );
      }
    }
  }

  return (

   
      <Container fluid>
        <Row>
  
          <Col sm='6'>
  
            <div className='d-flex flex-row ps-5 pt-5'>
            <i className="fa-solid fa-language me-3 fa-3x" style={{ color: '#709085' }}></i>
              <span className="h1 fw-bold mb-0">جعبه لایتنر</span>
            </div>
  
            <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
  
              <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>ورود</h3>
              {loading && <h1>در حال بررسی دسترسی کاربر</h1>}
              {!loading &&
              <Form onSubmit={handleSubmit}>

              <Form.Control className='mb-4 mx-5 w-100' label='نام کاربری' id='formControlLg' type='text' size="lg" 
              onChange={e => setUserName(e.target.value)} />
              <Form.Control className='mb-4 mx-5 w-100' label='کلمه عبور' id='formControlLg' type='password' size="lg"
              onChange={e => setPassword(e.target.value)} />
  
              <Button type="submit" className="mb-4 mx-5 w-100" variant='info' size='lg'>وارد شوید</Button>
              <p className="small mb-5 pb-lg-3 ms-5"><a className="text-muted" href="#!">رمز عبور را فراموش کردید?</a></p>
              <p className='ms-5'>تا به حال ثبت نام نکردید ؟ <a href="#!" className="link-info">ثبت نام کنید</a></p>
              </Form>}
            </div>
  
          </Col>
  
          <Col sm='6' className='d-none d-sm-block px-0'>
            <img src={pic}
              alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
          </Col>
  
        </Row>
  
      </Container> 
   














  );


}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};