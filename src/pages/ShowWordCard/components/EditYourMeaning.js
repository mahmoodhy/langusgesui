import React, { useState, useEffect, useRef } from 'react';
import configData from "../../../config.json";
import { useCookies } from 'react-cookie'
import { Button, Form ,Row,Col,Tooltip,OverlayTrigger  } from 'react-bootstrap';
import axios from 'axios';


const EditYourMeaning = ({ currentword }) => {

    const [isEditMainmeaning, setisEditMainmeaning] = useState(false);
    const [MeaningValue, setMeaningValue] = useState(currentword.yourTranslate);
    const [cookies] = useCookies(['token'])



    const handleStartEditMainmeaning = async () => {
        setMeaningValue(currentword.yourTranslate);
        setisEditMainmeaning(true);
    };
    const handleCancelSave = async () => {
        setisEditMainmeaning(false);
    };
    const handleSaveEditmeaning = async () => {
        setisEditMainmeaning(false);
        
        await MeaningSave(MeaningValue);

    };

    async function MeaningSave(MeaningValue) {
        try {
            const token=cookies.token.token;
            
            
            // Replace with your API call to get remaining word IDs
            const response = await axios.post(`${configData.SERVER_URL}/api/Home/EditYourTranslateMeaningofWord/${MeaningValue},${currentword.userBoxid}`, {}, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.data.data;
          } catch (error) {
            console.error('Error fetching remaining word IDs:', error);
          }
    }
    return (
        <>


            {!isEditMainmeaning &&
                <Row className='border mt-2 bg-gray-100 rounded-pill'>
                    <Col><span className='text-blue-500'>ترجمه شما : </span>{MeaningValue}</Col>
                    <Col className='d-flex justify-content-end'>
                    <OverlayTrigger overlay={<Tooltip>ویرایش</Tooltip>}>

                            <Button className='rounded-pill ' variant='success' onClick={handleStartEditMainmeaning}> <i class="fa-solid fa-pen-to-square"></i></Button>
                            </OverlayTrigger>

                    </Col></Row>
            }
            {isEditMainmeaning &&

                <Row className='border mt-2 bg-gray-100 rounded-pill'>
                    <Col>
                        <span className='text-blue-500'>ترجمه شما : </span>
                        <Form.Control id='form4Example1' value={MeaningValue} onChange={e => setMeaningValue(e.target.value)} />

                    </Col>
                    <Col className='d-flex justify-content-end'>
                    <OverlayTrigger overlay={<Tooltip>ذخیره</Tooltip>}>
                        <Button className='rounded-pill' variant='info' onClick={handleSaveEditmeaning} >
                        <i class="fa-solid fa-floppy-disk"></i>
                        </Button>
                        </OverlayTrigger><OverlayTrigger overlay={<Tooltip>انصراف</Tooltip>}>
                            <Button className='rounded-pill ' variant='danger' onClick={handleCancelSave}> 
                            <i class="fa-solid fa-ban"></i>
                                </Button>
                                </OverlayTrigger>
                    </Col></Row>

            }



        </>
    );
};

export default EditYourMeaning;
