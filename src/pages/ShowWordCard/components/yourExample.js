import React, { useState, useEffect, useRef } from 'react';
import configData from "../../../config.json";
import { useCookies } from 'react-cookie'
import axios from 'axios';
import {
    MDBBtn,
    MDBInput,
    MDBRow,
    MDBCardHeader,
    MDBCol, MDBSpinner, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBTextArea , MDBTableHead, MDBTableBody,
    MDBCardFooter
} from 'mdb-react-ui-kit';
const YourExample = ({ currentword }) => {
    
    const [isEditing, setisEditing] = useState(false);
    const [inputValue, setInputValue] = useState(currentword.yourExample);
    const [cookies] = useCookies(['token'])

    const addMyExample = async () => {
        setisEditing(true);
      };
      const saveMyExample = async () => {
        await ExampleSave();
        setisEditing(false);
      };
      async function ExampleSave() {
        try {
            const token=cookies.token.token;
            
           
            // Replace with your API call to get remaining word IDs
            const response = await axios.post(`${configData.SERVER_URL}/api/Home/EditYourExampleMeaningofWord/${inputValue},${currentword.userBoxid}`, {}, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.data.data;
          } catch (error) {
            console.error('Error fetching remaining word IDs:', error);
          }
    }
    async function cancelSaving() {        setisEditing(false);
    }
    // useEffect(() => {
    //     setInputValue(currentword.yourExample);
    //   }, [currentword]);
    return (

        <div>
            {inputValue && !isEditing &&
                <MDBCard alignment='center' className="mt-2 bg-light border">
                    <MDBCardHeader className='text-blue-500'>مثال شما</MDBCardHeader>
                    <MDBCardBody>
                        <MDBCardText className="text-start"><p style={{whiteSpace: 'pre-line'}}>{inputValue}</p></MDBCardText>
                    </MDBCardBody>
                    <MDBCardFooter><MDBBtn onClick={addMyExample}>مثال جدید اضافه کنید</MDBBtn></MDBCardFooter>
                </MDBCard>
            }
            {inputValue && isEditing &&
                <MDBCard alignment='center' className="mt-2 bg-light border">
                    <MDBCardHeader className='text-blue-500'>مثال شما</MDBCardHeader>
                    <MDBCardBody>
                        <MDBCardText className="text-start"><MDBTextArea  value={inputValue} onChange={e => setInputValue(e.target.value)} /></MDBCardText>
                    </MDBCardBody>
                    <MDBCardFooter><MDBBtn onClick={saveMyExample} color='success'>ذخیره</MDBBtn><MDBBtn onClick={cancelSaving} color='danger'>انصراف</MDBBtn></MDBCardFooter>
                </MDBCard>
            }
           <div className="text-center"> 
            {!inputValue && !isEditing &&
                <MDBBtn outline rounded className='mt-auto' color='info' onClick={addMyExample}>مثال خودتان را اضافه کنید</MDBBtn>
            }
             {!inputValue && isEditing && <>
                <MDBInput  value={inputValue} onChange={e => setInputValue(e.target.value)} />

                <MDBBtn outline rounded className='mt-auto' color='info' onClick={saveMyExample}>ذخیره</MDBBtn>
                </>
            }
            </div>
        </div>
    );

};

export default YourExample;