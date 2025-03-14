import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SimiliarWords from './similiarWords';
import MeaningWord from './meaningWord';
import AudioPlayer from '../../../Components/AudioPlayer'
import AImeaningWord from './AImeaningWord';
import configData from "../../../config.json";
import { Button, Card ,Row,Col   } from 'react-bootstrap';


const BackCard = ({setCurrentWord,currentword,handleLearnWord,handleNotLearnWord, toggleCollapse,token ,handleFlip}) => {
    const [isFullyLearnWordClicked, setFullyLearnWordClicked] = useState(false);    
   
    const setTheWordLearned = async () => {
        try {
    
          const response = await axios.post(`${configData.SERVER_URL}/api/Home/SetWordLearnedPermanently/${currentword.userBoxid}`, {}, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
       
        } catch (error) {
          console.error('Error FindsimiliarWords:', error);
          
        }
      };

    
    const handleFullyLearnWordClicked = async () => {
        setFullyLearnWordClicked(true);
    };
    const handleFullyLearnWord = async () => {
        setFullyLearnWordClicked(false);
        if (window.confirm('ایا از اینکه این کلمه را بلدید مطمئن هستید ؟'))
        {
            setTheWordLearned();
            setCurrentWord({});
        }
           
    };
    const handleFullyLearnWordCancel = async () => {
        setFullyLearnWordClicked(false);

    };

   
    return (<>
       
       <Card>
                <Card.Header>
                <Button
                          className="flip-button"
                          onClick={handleFlip}
                        >
                          <span>برگشت به روی کارت</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><i class="fa-solid fa-retweet"></i>
                        </Button>

                </Card.Header>
                <Card.Body>
                  <MeaningWord 
                  setCurrentWord={setCurrentWord} 
                    currentword={currentword}                    
                    toggleCollapse={toggleCollapse}
                    handleLearnWord={handleLearnWord}
                    handleNotLearnWord={handleNotLearnWord}
                     token={token}  ></MeaningWord>
                 
                  <AImeaningWord currentword={currentword}  token={token}></AImeaningWord>
                  </Card.Body>
                  </Card>
                  </>
    );
};

export default BackCard;
