import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import EditMainMeaning from "./EditMainMeaning";
import EditYourMeaning from './EditYourMeaning';
import configData from "../../../../src/config.json";
import {
    MDBBtn,
    MDBInput,
    MDBRow,
    MDBCardHeader,
    MDBCol, MDBCard, MDBCardBody,
    MDBCardFooter
} from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdb-react-ui-kit';

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
                            <MDBBtn className='mx-2 w-100' color='info' onClick={handleFullyLearnWordClicked}>این لغت رو بلدم<MDBIcon fas icon="check-double" /></MDBBtn>
                            {isFullyLearnWordClicked && <><div>این لغت به لغات فراگرفته شما منتقل می شود و دیگر از شما پرسیده نخواهد شد آیا مطمئن هستید ؟
                                </div><div className='d-flex justify-content-between'><MDBBtn className='mx-2' color='success' onClick={handleFullyLearnWord}>بله <MDBIcon fas icon="check" />
                            </MDBBtn><MDBBtn className='mx-2' color='danger' onClick={handleFullyLearnWordCancel}>خیر منصرف شدم <MDBIcon fas icon="times" /></MDBBtn></div>
                            </>}
                        </MDBCardFooter>
                       
                    </div>
                )}
            </MDBCard>
            


        </MDBRow>
    );
};

export default MeaningWord;
