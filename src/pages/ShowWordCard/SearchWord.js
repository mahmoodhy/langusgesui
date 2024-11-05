import React, { useState, useEffect } from 'react';
import axios from 'axios';
import configData from "../../config.json";
import SearchedWord from '../../api/api';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBIcon,
  MDBCol, MDBSpinner, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBTable, MDBTableHead, MDBTableBody,
  MDBInput,
  MDBInputGroup
} from 'mdb-react-ui-kit';
import PlayhtAudioPlayer from '../../Components/PlayhtAudioPlayer';

const SearchWord = ({ token, startword, onSearch }) => {
  const [searchWord, setSearchWord] = useState('');
  const [initialsearchWord, setinitialSearchWord] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const getFromTranslator = async (word) => {
    try {
      const response = await axios.post(`${configData.SERVER_URL}/api/Home/GetTranslation/${word}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error getFromTranslator:', error);
      return null;
    }
  };
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
    setResult(null);
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
    <div className='bg-orange-300 p-1'>
      <MDBRow>
        <MDBRow>
          <MDBInputGroup className='block'>
            <MDBInput className='' type='text' value={searchWord} placeholder="جستجو"
              onChange={e => setSearchWord(e.target.value)} onKeyDown={handleKeyDown} />
              {result &&
                <PlayhtAudioPlayer className='' word={searchWord} token={token}/>
                }
            <MDBBtn outline color='danger' size='sm' className="close-icon rounded-pill" onClick={handleClear}>
              <MDBIcon fas icon='times' />
            </MDBBtn>
            <MDBBtn outline color='secondary' size='sm' className="search-icon rounded-pill" onClick={handlesearch}>
              <MDBIcon fas icon='search' />
            </MDBBtn>
            
          </MDBInputGroup>
          
        </MDBRow>
        {loading && <MDBSpinner role='status'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>}


        {!loading && result && <><MDBRow className=''>
          <MDBCard className="bg-green-200 m-2">
            <MDBCardBody className=''>
              <MDBCardText className='display-7'><strong>{result.officialTranslate}</strong></MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBRow></>
        }


      </MDBRow>

      {!loading && result &&
        <div>
          <MDBRow className='mt-3'>
            <hr className='mt-1'></hr>
            {result.boxday && <p className='text-success'>این کلمه در حال حاضر در جعبه یادگیری شما وجود دارد</p>}
            {result.boxid > 0 && !result.boxday &&
              <MDBRow className='d-flex align-items-center'>
                <MDBCol className='m-2 bg-success'><p className='text-warning'>این کلمه در فرهنگ لغات سیستم وجود دارد. آیا میخواهید اکنون آن را به جعبه یادگیری خود اضافه کنید ؟
                </p></MDBCol>
                <MDBCol className='d-flex justify-content-end'>
                  <MDBBtn type="submit" className='mt-2' color='success' size='md' onClick={handleAddtoUserBox}>اضافه کردن</MDBBtn>
                </MDBCol>
                
              </MDBRow>
            }
            {result.boxid === null &&
              <MDBRow className='d-flex align-items-center'>
                <MDBCol><p className='text-danger'>این کلمه در فرهنگ لغات سیستم وجود ندارد. آیا میخواهید آن را به فرهنگ لغات اضافه کنید ؟</p></MDBCol>
                <MDBCol className='d-flex justify-content-end'>
                  <MDBBtn type="submit" className='' color='success' size='md' onClick={handleAddtoBox}>اضافه کردن</MDBBtn>
                </MDBCol>
              </MDBRow>}
              {!result.similiarWords &&<MDBBtn type="submit" className='w-75 m-auto' color='info' size='md' onClick={handlesimiliarWords}>
                  برای مشاهده کلمات مشابه در فرهنگ لغات کلیک کنید
                  </MDBBtn>}
            <hr className='mt-2'></hr>

          </MDBRow>

          {result.similiarWords && <div><div>ممکن است منظور شما این بوده باشد !؟ </div>
            <MDBTable striped>
              <MDBTableHead>
                <tr>
                  <th scope='col'>کلمه مشابه</th>
                  <th scope='col'>معنی</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {
                  result.similiarWords.map((similiarWord) => (
                    <tr key={similiarWord.word}>
                      <td>{similiarWord.word}</td>
                      <td> {!similiarWord.officialTranslate && <MDBBtn>ترجمه</MDBBtn>}
                        {similiarWord.officialTranslate && similiarWord.officialTranslate} </td>
                    </tr>
                  ))
                }
              </MDBTableBody>
            </MDBTable>

          </div>
          }
        </div>
      }
    </div>
  );

};

export default SearchWord;
