import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import EditMainMeaning from "./EditMainMeaning";
import EditYourMeaning from './EditYourMeaning';
import configData from "../../../../src/config.json";
import { Button, Card ,Row,Col   } from 'react-bootstrap';


const MeaningWord = ({setCurrentWord,currentword,handleLearnWord,handleNotLearnWord, toggleCollapse, isOpen,token }) => {
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
    return (
        <Row>
            <Card>
                <Card.Header>

                    {!isOpen && <Button rounded className='mx-2 m-2 w-100' color='secondary' onClick={toggleCollapse}>مشاهده معنی   <i fas icon="expand" />    </Button>}
                    {isOpen && <Button rounded className='mx-2 m-2 w-100' color='secondary' onClick={toggleCollapse}>مخفی کردن محتوا    <i fas icon="compress" /> </Button>}

                </Card.Header>
                {isOpen && (
                    <div id="Meanings">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Button className='mx-2 w-75' variant='success' onClick={handleLearnWord}>یاد گرفتم <i class="fa-duotone fa-solid fa-check"></i></Button>
                                </Col>
                                <Col>
                                    <Button className='mx-2 w-75' variant='danger' onClick={handleNotLearnWord}>معنیش رو نمیدونستم <i icon="times" /></Button>
                                </Col>
                            </Row>
                            
                            <EditMainMeaning currentword={currentword.farsi} ></EditMainMeaning>
                            <EditYourMeaning currentword={currentword} ></EditYourMeaning>

                            <Row className='border mt-2 bg-gray-100 rounded-pill'>
                                <Col><span className='text-blue-500'>ترجمه گوگل: </span>{currentword.gtAnswer}</Col>
                                <Col className='d-flex justify-content-end'>
                                    <Button className='rounded-pill' variant='success'>ویرایش <i class="fa-solid fa-pen-to-square"></i></Button>
                                </Col>
                            </Row>

                        </Card.Body>
                        <Card.Footer>
                            <Button className='mx-2 w-100' variant='info' onClick={handleFullyLearnWordClicked}>این لغت رو بلدم<i class="fa-duotone fa-solid fa-check-double"></i></Button>
                            {isFullyLearnWordClicked && <><div>این لغت به لغات فراگرفته شما منتقل می شود و دیگر از شما پرسیده نخواهد شد آیا مطمئن هستید ؟
                                </div><div className='d-flex justify-content-between'><Button className='mx-2' variant='success' onClick={handleFullyLearnWord}>بله <i fas icon="check" />
                            </Button><Button className='mx-2' variant='danger' onClick={handleFullyLearnWordCancel}>خیر منصرف شدم <i fas icon="times" /></Button></div>
                            </>}
                        </Card.Footer>
                       
                    </div>
                )}
            </Card>
            


        </Row>
    );
};

export default MeaningWord;
