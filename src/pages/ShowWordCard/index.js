
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ApiDictionary from "./components/apiDictionary";

import configData from "../../config.json";
import { useCookies } from 'react-cookie';
import RightClickArea from '../../../src/Components/RightClickArea';
import { Button, Col, Row, Alert, Container } from 'react-bootstrap';

import FrontCard from './components/FrontCard';
import BackCard from './components/BackCard';

const ShowWordCard = ({ token, onSearch }) => {
  const [show, setShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [process, setProcess] = useState('');
  const [cookies] = useCookies(['token'])
  const [isFlipped, setFlipped] = useState(false);
  
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [remainingWordIds, setRemainingWordIds] = useState(() => {
    return sessionStorage.getItem('myremainingWordIds') || [];
  });
  const [currentWordIndex, setCurrentWordIndex] = useState(() => {
    return sessionStorage.getItem('mycurrentWordIndex') || '';
  });
  const [currentword, setCurrentWord] = useState(() => {
    const savedWord = sessionStorage.getItem('currentword');
    return savedWord ? JSON.parse(savedWord) : {};
  });
  const [similiarWords, setSimiliarWords] = useState();
  const [Error, setError] = useState('');
  const [messages, setmessage] = useState(null);
  const [showFirst, setShowFirst] = useState(false);




  // Simulate fetching remaining word IDs (replace with actual API call)

  const fetchRemainingWordIds = async () => {
    try {
      // Replace with your API call to get remaining word IDs
      const response = await axios.post(`${configData.SERVER_URL}/api/Home/GetTodayWordsRemainingIds`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data.data;
      setRemainingWordIds(data); // Assuming an array of word IDs
      if (data.length > 0)
        setmessage(null);
    } catch (error) {
      console.error('Error fetching remaining word IDs:', error);
    }
  };



  // Simulate starting a new day (replace with actual logic)
  const startNewDay = async (force) => {

    try {
      const wordcount = 10;
      const response = await axios.post(`${configData.SERVER_URL}/api/Home/StartNewDay?wordcount=${wordcount}&Force=${force}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        }
      });

      if (response.ok) {
        const data = await response.json();

        //setCount(data.count); // Assuming the API returns an object with a 'count' property */
      } else {
        console.error('Error fetching data:', response.message);
      }
      if (response.data.data === 0)
        setmessage("کلاس امروز تمام شده است.برای ادامه آموزش فردا اقدام کنید");
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }

  };


  const fetchRandomWord = async () => {
    var data;
    sessionStorage.setItem('mycurrentWordIndex', currentWordIndex);
    var randomIndex = Math.floor(Math.random() * remainingWordIds.length);
    var wordId = remainingWordIds[randomIndex];
    try {
      if (remainingWordIds.length > 1) {
        while (randomIndex === (currentWordIndex === '' ? 0 : currentWordIndex)) {
          randomIndex = Math.floor(Math.random() * remainingWordIds.length);
        }
      }
      else
        randomIndex = Math.floor(Math.random() * remainingWordIds.length);

      wordId = remainingWordIds[randomIndex];
      setCurrentWordIndex(randomIndex);
      console.log("fetchRandomWord" + wordId + '    ' + randomIndex);
      // Replace with your API call to get a random word
      const response = await axios.post(`${configData.SERVER_URL}/api/Home/WordById/${wordId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      data = response.data.data;
      console.log(data);
      setCurrentWord(data); // Assuming the API response contains a 'word' property
    } catch (error) {
      console.error('Error fetching the random word: ' + wordId, error);
      setError('Error fetching the random word ' + wordId + '  ' + data);
    }
  };
  const fetchWord = async (wordId) => {
    var data;

    try {


      console.log("fetchWord" + wordId);
      // Replace with your API call to get a random word
      const response = await axios.post(`${configData.SERVER_URL}/api/Home/WordById/${wordId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      data = response.data.data;
      setCurrentWord(data); // Assuming the API response contains a 'word' property
    } catch (error) {
      console.error('Error fetching word: ' + wordId, error);
      setError('Error fetching word ' + wordId + '  ' + data);
    }
  };
  const fetchSimiliarWords = async (word) => {
    var data;
    try {

      const response = await axios.post(`${configData.SERVER_URL}/api/Home/GetsimiliarwordsinDataBase/${word}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      data = response.data.data;
      setSimiliarWords(data); // Assuming the API response contains a 'word' property
    } catch (error) {
      console.error('Error fetching Similiar words: ' + word, error);
      setError('Error fetching Similiar words ' + word + '  ' + data);
    }
  };
  const WordIsLearned = async (wordId) => {
    try {

      // Replace with your API call to get a random word
      const response = await axios.post(`${configData.SERVER_URL}/api/Home/CorrectAnswer?wordId=${wordId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,


        },
      });
      const data = response.data.data;

    } catch (error) {
      console.error('Error WordIsLearned:', error);
      setError('Error WordIsLearned');
    }
  };
  const WordIsNotLearned = async (wordId) => {
    try {

      // Replace with your API call to get a random word
      const response = await axios.post(`${configData.SERVER_URL}/api/Home/WrongAnswer?wordId=${wordId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;

    } catch (error) {
      console.error('Error WordIsNotLearned:', error);
      setError('Error WordIsNotLearned');
    }
  };

  useEffect(() => {
    sessionStorage.setItem('myremainingWordIds', remainingWordIds);
  }, [remainingWordIds]);
  useEffect(() => {
    if (currentword == null || Object.keys(currentword).length === 0) {
      setIsOpen(false);
      setRemainingWordIds([]);

      refreshPage();
    }
    else {
      sessionStorage.setItem('currentword', JSON.stringify(currentword));
      fetchSimiliarWords(currentword.word);

      setLoading(false);
    }
    setFlipped(false);
  }, [currentword]);
  const refreshPage = async () => {
    setSimiliarWords(null);
    setLoading(true);

    if (remainingWordIds.length < 2) {
      await startNewDay(false);
    }

    await fetchRemainingWordIds();

  };
  useEffect(() => {
    setSimiliarWords(null);

    setLoading(true);
    const initialize = async () => {
      if (remainingWordIds.length === 0) {
        await startNewDay(false);
      }
      await fetchRemainingWordIds();
      if (currentword.userBoxid !== undefined)
        await fetchWord(currentword.userBoxid);


    };
    initialize();
    setProcess('Refresh');
  }, []);

  useEffect(() => {
    const initialize = async () => {
      if (remainingWordIds.length > 0) {
        if (currentword.word === undefined || currentword.word === null) {
          await fetchRandomWord();
        }
      }



    };

    initialize();

  }, [remainingWordIds]);



  const handleLearnWord = async () => {
    setError(null);
    setLoading(true);
    setShowFirst(false);
    currentword.word = null;
    setSimiliarWords(null);
    await WordIsLearned(currentword.userBoxid)

    //setCurrentWord({});

    if (remainingWordIds.length === 1) {
      setCurrentWord({});
      await startNewDay(false);
      await fetchRemainingWordIds();

    }
    else {
      await fetchRemainingWordIds();
    }

    setIsOpen(false);
  };
  const handleNotLearnWord = async () => {
    setError(null);
    setLoading(true);
    setShowFirst(false);
    setSimiliarWords(null);
    await WordIsNotLearned(currentword.userBoxid)
    if (remainingWordIds.length === 0) {
      startNewDay(false);
    }
    //setCurrentWord({});
    await fetchRandomWord();

    setLoading(false);
    setIsOpen(false);
  };


  useEffect(() => {





    if (currentword.word !== null) {
      if (audioRef.current) {
        audioRef.current.load();
        var playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(_ => {
            playPromise.autoPlay();
            playPromise.pause();
          })
            .catch(error => {
              // Auto-play was prevented
              // Show paused UI.
            });
        }
      }
    }

  }, [currentword.audioFile]);


  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  const handlesearch = async (word) => {
    onSearch(word);
  }
  const habdlestartdaybyForce = async () => {
    setmessage(null);
    await startNewDay(true);
    await fetchRemainingWordIds();
  }

  const  handleFlip =async () => {
       setFlipped(!isFlipped);
  };
  return (
    <div>

      {/*  {process && <p>{process}</p>} */}
      {remainingWordIds && <p>لغات باقیمانده امروز: {remainingWordIds.length}</p>}
      {!messages && loading && <p>Loading...</p>}
      {messages && <p>{messages}<Button onClick={habdlestartdaybyForce}>لغات بیشتری برای امروز</Button></p>}
      {
        Error && <p>
          <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
            خطایی رخ داد : {Error}
          </Alert>

        </p>}
      <div className='row justify-content-center'>
        {!messages && !loading &&
          <Container>
            <RightClickArea children={
              <Row>
                
                <Col sm>
                  <div
                    className={`flip-card ${isFlipped ? "flipped" : ""
                      }`}
                  >
                    <div className="flip-card-inner">
                    {!isFlipped &&<div className="flip-card-front">
                        <div className="card-content">
                          <FrontCard setCurrentWord={setCurrentWord}
                            currentword={currentword}
                            similiarWords={similiarWords} />
                        </div>
                        <Button
                          className="flip-button"
                          onClick={handleFlip}
                        >
                          <span>مشاهده پشت کارت   </span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><i class="fa-solid fa-retweet"></i>

                        </Button>
                      </div>}
                      {isFlipped &&
                      <div className="flip-card-back">
                        <div className="card-content">
                          <BackCard setCurrentWord={setCurrentWord}
                            currentword={currentword}
                            toggleCollapse={toggleCollapse}
                            handleLearnWord={handleLearnWord}
                            handleNotLearnWord={handleNotLearnWord}
                            isOpen={isOpen} token={token} handleFlip={handleFlip} />
                        </div>
                        
                      </div>}
                    </div>
                  </div>


                </Col>

                <Col sm>
                  <ApiDictionary meanings={currentword.meanings}></ApiDictionary>
                </Col>
              </Row>
            } onSearch={handlesearch} />


          </Container>
        }
      </div>
    </div>
  );
};

export default ShowWordCard;
