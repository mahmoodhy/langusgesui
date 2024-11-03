import React, { useState, useEffect, useRef } from 'react';
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
                <MDBRow className='border mt-2 bg-gray-100 rounded-pill'>
                    <MDBCol><span className='text-blue-500'>معنی فارسی : </span>{mainMeaningValue}</MDBCol>
                    <MDBCol className='d-flex justify-content-end'>
                    <MDBTooltip tag='span' title='ویرایش'>
      
                        <MDBBtn className='rounded-pill ' color='success' onClick={handleStartEditMainmeaning}> <MDBIcon far icon="edit" /></MDBBtn>
                        </MDBTooltip>
                        <MDBTooltip tag='span' title='گزارش خطا'>
                        <MDBBtn className='rounded-pill ' color='warning' onClick={handleSendReport}> <MDBIcon fas icon="exclamation-triangle" /></MDBBtn>
                        </MDBTooltip>
                    </MDBCol></MDBRow>
            }
            {isEditMainmeaning &&

                <MDBRow className='border mt-2 bg-gray-100 rounded-pill'>
                    <MDBCol>
                        <span className='text-blue-500'>معنی فارسی : </span>
                        <MDBInput id='form4Example1' value={mainMeaningValue} onChange={e => setMainMeaningValue(e.target.value)} />

                    </MDBCol>
                    <MDBCol className='d-flex justify-content-end'>
                        <MDBBtn className='rounded-pill' color='danger' onClick={handleSaveEditMainmeaning} >ذخیره <MDBIcon far icon="edit" /></MDBBtn>
                    </MDBCol></MDBRow>

            }



        </>
    );
};

export default EditMainMeaning;
