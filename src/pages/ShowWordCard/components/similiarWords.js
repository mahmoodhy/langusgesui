
import React, { useState, useEffect, useRef } from 'react';

import { Button,Table,Spinner,Accordion   } from 'react-bootstrap';


const SimiliarWords = (props) => {
    const { similiarWords } = props;

    

    return (


        <div className="d-grid gap-2 m-2">

           
            
                {/* <Button onClick={toggleFirst}><span>مشاهده کلمات مشابه</span></Button> */}
               
               
                <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="1">
        <Accordion.Header><span>مشاهده کلمات مشابه</span></Accordion.Header>
        <Accordion.Body>
            {!similiarWords &&
                    <Spinner role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                }
            {similiarWords &&
                <Table striped>
                    <thead>
                        <tr>
                            <th scope='col'>کلمه مشابه</th>
                            <th scope='col'>معنی</th>
                        </tr>
                    </thead>
                    <tbody>

                        {similiarWords &&
                            similiarWords.map((similiarWord) => (
                                <tr><td>{similiarWord.word}</td><td>{similiarWord.officialTranslate} </td></tr>
                            ))
                        }

                    </tbody>
                </Table>}
                </Accordion.Body>
      </Accordion.Item>
    </Accordion>
        </div>
    );

};

export default SimiliarWords;