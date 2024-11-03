import React, { useState, useEffect, useRef } from 'react';
import configData from "../../../config.json";
import { useCookies } from 'react-cookie'

import axios from 'axios';
import {
    MDBBtn,
    MDBInput,
    MDBRow,
    MDBTooltip,
    MDBCol, MDBCard, MDBCardBody,
    MDBCardFooter
} from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdb-react-ui-kit';

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
                <MDBRow className='border mt-2 bg-gray-100 rounded-pill'>
                    <MDBCol><span className='text-blue-500'>ترجمه شما : </span>{MeaningValue}</MDBCol>
                    <MDBCol className='d-flex justify-content-end'>
                        <MDBTooltip tag='span' title='ویرایش'>

                            <MDBBtn className='rounded-pill ' color='success' onClick={handleStartEditMainmeaning}> <MDBIcon far icon="edit" /></MDBBtn>
                        </MDBTooltip>

                    </MDBCol></MDBRow>
            }
            {isEditMainmeaning &&

                <MDBRow className='border mt-2 bg-gray-100 rounded-pill'>
                    <MDBCol>
                        <span className='text-blue-500'>ترجمه شما : </span>
                        <MDBInput id='form4Example1' value={MeaningValue} onChange={e => setMeaningValue(e.target.value)} />

                    </MDBCol>
                    <MDBCol className='d-flex justify-content-end'>
                    <MDBTooltip tag='span' title='ذخیره'>
                        <MDBBtn className='rounded-pill' color='info' onClick={handleSaveEditmeaning} >
                            <MDBIcon fas icon="save" />
                        </MDBBtn>
                        </MDBTooltip>
                        <MDBTooltip tag='span' title='انصراف'>
                            <MDBBtn className='rounded-pill ' color='danger' onClick={handleCancelSave}> 
                            <MDBIcon fas icon="ban" />
                                </MDBBtn>
                        </MDBTooltip>
                    </MDBCol></MDBRow>

            }



        </>
    );
};

export default EditYourMeaning;
