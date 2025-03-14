import React, { useState, useEffect } from 'react';
import axios from 'axios';
import configData from "../../config.json";
import SearchedWord from '../../api/api';
import { Button, Form ,Row,Col,Table ,Card,Spinner } from 'react-bootstrap';
import PlayhtAudioPlayer from '../../Components/PlayhtAudioPlayer';

const SearchWord = ({ token, startword }) => {
  const [searchWord, setSearchWord] = useState('');
  const [initialsearchWord, setinitialSearchWord] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
  const FindWord = async () => {
    try {
      const response = await axios.post(`${configData.SERVER_URL}/api/Home/FindSearchedWord?word=${searchWord}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      console.log(data);
      setResult(data);
    } catch (error) {
      console.error('Error FindWord:', error);
      setError('Error FindWord');
    }
  };
  const FindsimiliarWords = async () => {
    try {

      const response = await axios.post(`${configData.SERVER_URL}/api/Home/FindSimiliarWordsSoundex/${searchWord}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      console.log(data);
      setResult(prevState => ({
        ...prevState,
        similiarWords: data 
    }));
    } catch (error) {
      console.error('Error FindsimiliarWords:', error);
      setError('Error FindsimiliarWords');
    }
  };
  const handleClear = () => {
   
    setinitialSearchWord('');
    setSearchWord('');
    setResult('');
    
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handlesearch();
    }
  };
  const handlesearch = async () => {
    // e.preventDefault();
    setLoading(true);

    await FindWord();
    setLoading(false);
  };
  const handlesimiliarWords = async () => {
    await FindsimiliarWords();
  }
  const handleAddtoUserBox = async () => {
    window.alert('در حال انجام');
  }
  const handleAddtoBox = async () => {
    window.alert('در حال انجام');
  }
  useEffect(() => {
       setSearchWord(startword);
    setinitialSearchWord(startword);
  }, [startword]);

  useEffect(() => {
    const initialize = async () => {
      if (initialsearchWord !== '') {
        setinitialSearchWord('');
        setLoading(true);
        await FindWord();
        setLoading(false);
      }
      setinitialSearchWord('');
    };
    initialize();

  }, [searchWord]);


  return (
    <div className='p-1 w-50'>
      <Row>
        <Row>
          <Form.Group className='d-flex'>
            <Form.Control className='w-100' type='text' value={searchWord} placeholder="جستجو"
              onChange={e => setSearchWord(e.target.value)} onKeyDown={handleKeyDown} />
              
                 <Button  variant='outline-secondary'  className="search-icon rounded-pill" size='sm' onClick={handlesearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
            <Button  variant='outline-danger'  className="close-icon rounded-pill" size='sm' onClick={handleClear}>
            <i className="fa-solid fa-ban"></i>
            </Button>
           
            {result &&
                <PlayhtAudioPlayer className='' word={searchWord} token={token}/>
                }
          </Form.Group>
          
        </Row>
        {loading && <Spinner role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>}


        {!loading && result && <><Row className=''>
          <Card className="bg-green-200 m-2">
            <Card.Body className=''>
              <Card.Text className='display-7'><strong>{result.officialTranslate}</strong></Card.Text>
            </Card.Body>
          </Card>
        </Row></>
        }


      </Row>

      {!loading && result &&
        <div>
          <Row className='mt-3'>
            <hr className='mt-1'></hr>
            {result.boxday && <p className='text-success'>این کلمه در حال حاضر در جعبه یادگیری شما وجود دارد</p>}
            {result.boxid > 0 && !result.boxday &&
              <Row className='d-flex align-items-center'>
                <Col className='m-2 bg-success'><p className='text-warning'>این کلمه در فرهنگ لغات سیستم وجود دارد. آیا میخواهید اکنون آن را به جعبه یادگیری خود اضافه کنید ؟
                </p></Col>
                <Col className='d-flex justify-content-end'>
                  <Button type="submit" className='mt-2' color='success' size='md' onClick={handleAddtoUserBox}>اضافه کردن</Button>
                </Col>
                
              </Row>
            }
            {result.boxid === null &&
              <Row className='d-flex align-items-center'>
                <Col><p className='text-danger'>این کلمه در فرهنگ لغات سیستم وجود ندارد. آیا میخواهید آن را به فرهنگ لغات اضافه کنید ؟</p>
                </Col>
                <Col className='d-flex justify-content-end'>
                  <Button type="submit" className='' color='success' size='md' onClick={handleAddtoBox}>اضافه کردن</Button>
                </Col>
              </Row>}
              {!result.similiarWords &&
              <Button type="submit" className='w-75 m-auto' variant='info' size='md' onClick={handlesimiliarWords}>
                  برای مشاهده کلمات مشابه در فرهنگ لغات کلیک کنید
                  </Button>}
            <hr className='mt-2'></hr>

          </Row>

          {result.similiarWords && <div><div>ممکن است منظور شما این بوده باشد !؟ </div>
            <Table striped>
              <thead>
                <tr>
                  <th scope='col'>کلمه مشابه</th>
                  <th scope='col'>معنی</th>
                </tr>
              </thead>
              <tbody>
                {
                  result.similiarWords.map((similiarWord) => (
                    <tr key={similiarWord.word}>
                      <td>{similiarWord.word}</td>
                      <td> {!similiarWord.officialTranslate && <Button>ترجمه</Button>}
                        {similiarWord.officialTranslate && similiarWord.officialTranslate} </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>

          </div>
          }
        </div>
      }
    </div>
  );

};

export default SearchWord;
