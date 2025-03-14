import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Form ,Row,Col,Tooltip,OverlayTrigger  } from 'react-bootstrap';


const EditMainMeaning = ({ currentword }) => {
    
    const [isEditMainmeaning, setisEditMainmeaning] = useState(false);
    const [mainMeaningValue, setMainMeaningValue] = useState(currentword);
    
   

    const handleStartEditMainmeaning = async () => {
        setMainMeaningValue(currentword);
        setisEditMainmeaning(true);
    };
    const handleSendReport = async () => {
        window.alert('در دست انجام');
    };
    const handleSaveEditMainmeaning = async () => {
        setisEditMainmeaning(false);       
        await MainMeaningSave(mainMeaningValue);
               
    };

    async function MainMeaningSave  (mainMeaningValue)  {

}
    return (
        <>


            {!isEditMainmeaning &&
                <Row className='border mt-2 bg-gray-100 rounded-pill'>
                    <Col><span className='text-blue-500'>معنی فارسی : </span>{mainMeaningValue}</Col>
                    <Col className='d-flex justify-content-end'>
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">ویرایش</Tooltip>}>
      
                        <Button className='rounded-pill ' variant='success' onClick={handleStartEditMainmeaning}> <i className="fa-solid fa-pen-to-square"></i></Button>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">گزارش خطا</Tooltip>}>
                        <Button className='rounded-pill ' variant='warning' onClick={handleSendReport}> <i className="fa-sharp fa-regular fa-flag"></i></Button>
                        </OverlayTrigger>
                        
 
                    </Col></Row>
            }
            {isEditMainmeaning &&

                <Row className='border mt-2 bg-gray-100 rounded-pill'>
                    <Col>
                        <span className='text-blue-500'>معنی فارسی : </span>
                        <Form.Control id='form4Example1' value={mainMeaningValue} onChange={e => setMainMeaningValue(e.target.value)} />

                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Button className='rounded-pill' variant='danger' onClick={handleSaveEditMainmeaning} >ذخیره <i className="fa-solid fa-pen-to-square"></i></Button>
                    </Col></Row>

            }



        </>
    );
};

export default EditMainMeaning;
