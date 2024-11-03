import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import EditMainMeaning from "./EditMainMeaning";
import EditYourMeaning from './EditYourMeaning';
import {
    MDBBtn,
    MDBInput,
    MDBRow,
    MDBCardHeader,
    MDBCol, MDBCard, MDBCardBody,
    MDBCardFooter
} from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdb-react-ui-kit';

const MeaningWord = ({ currentword, handleLearnWord, handleNotLearnWord, toggleCollapse, isOpen }) => {
    const [isEditMainmeaning, setisEditMainmeaning] = useState(false);
    const [mainMeaningValue, setMainMeaningValue] = useState('');
    
    const handleFullyLearnWord = async () => {
        window.alert("به زودی تکمیل می شود");

    };
    return (
        <MDBRow>
            <MDBCard>
                <MDBCardHeader>

                    {!isOpen && <MDBBtn rounded className='mx-2 m-2 w-100' color='secondary' onClick={toggleCollapse}>مشاهده معنی   <MDBIcon fas icon="expand" />    </MDBBtn>}
                    {isOpen && <MDBBtn rounded className='mx-2 m-2 w-100' color='secondary' onClick={toggleCollapse}>مخفی کردن محتوا    <MDBIcon fas icon="compress" /> </MDBBtn>}

                </MDBCardHeader>
                {isOpen && (
                    <div id="Meanings">
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol>
                                    <MDBBtn className='mx-2 w-75' color='success' onClick={handleLearnWord}>یاد گرفتم <MDBIcon fas icon="check" /></MDBBtn>
                                </MDBCol>
                                <MDBCol>
                                    <MDBBtn className='mx-2 w-75' color='danger' onClick={handleNotLearnWord}>معنیش رو نمیدونستم <MDBIcon fas icon="times" /></MDBBtn>
                                </MDBCol>
                            </MDBRow>
                            
                            <EditMainMeaning currentword={currentword.farsi} ></EditMainMeaning>
                            <EditYourMeaning currentword={currentword} ></EditYourMeaning>

                            <MDBRow className='border mt-2 bg-gray-100 rounded-pill'>
                                <MDBCol><span className='text-blue-500'>ترجمه گوگل: </span>{currentword.gtAnswer}</MDBCol>
                                <MDBCol className='d-flex justify-content-end'>
                                    <MDBBtn className='rounded-pill' color='success'>ویرایش <MDBIcon far icon="edit" /></MDBBtn>
                                </MDBCol>
                            </MDBRow>

                        </MDBCardBody>
                        <MDBCardFooter>
                            <MDBBtn className='mx-2 w-100' color='info' onClick={handleFullyLearnWord}>این لغت رو بلدم<MDBIcon fas icon="check-double" /></MDBBtn>
                        </MDBCardFooter>
                       
                    </div>
                )}
            </MDBCard>
            


        </MDBRow>
    );
};

export default MeaningWord;
