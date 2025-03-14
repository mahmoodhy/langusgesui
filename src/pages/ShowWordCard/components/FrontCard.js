import React, { useState, useEffect, useRef } from 'react';
import SimiliarWords from './similiarWords';
import AudioPlayer from '../../../../src/Components/AudioPlayer'
import configData from "../../../config.json";
import { Button, Card, Row, Col } from 'react-bootstrap';


const FrontCard = ({  currentword, similiarWords }) => {
    

   


    return (<>
         <Card>
         <Card.Header>
            <Row>
            <div className='col-6'> <h1 className='text-3xl'>کلمه : {currentword.word}</h1></div>
            <div className='col-3'> {currentword.audioFile && <>
                <AudioPlayer src={`${configData.SERVER_URL}/audioFiles${currentword.audioFile}`} />

            </>}</div>
            <div className='col-3'><span className='text-blue-500'> روز: </span>{currentword.dayNo} ام</div>
            </Row>
            </Card.Header>
            <Card.Body></Card.Body>

            <Card.Footer>
        <SimiliarWords similiarWords={similiarWords}></SimiliarWords>
        </Card.Footer>
        </Card>
    </>
    );
};

export default FrontCard;
