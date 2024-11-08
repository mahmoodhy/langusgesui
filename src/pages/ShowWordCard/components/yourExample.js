import React, { useState, useEffect, useRef } from 'react';
import configData from "../../../config.json";
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { Button, Card ,Form   } from 'react-bootstrap';

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
                <Card alignment='center' className="mt-2 bg-light border">
                    <Card.Header className='text-blue-500'>مثال شما</Card.Header>
                    <Card.Body>
                        <Card.Text className="text-start"><p style={{whiteSpace: 'pre-line'}}>{inputValue}</p></Card.Text>
                    </Card.Body>
                    <Card.Footer><Button onClick={addMyExample}>مثال جدید اضافه کنید</Button></Card.Footer>
                </Card>
            }
            {inputValue && isEditing &&
                <Card alignment='center' className="mt-2 bg-light border">
                    <Card.Header className='text-blue-500'>مثال شما</Card.Header>
                    <Card.Body>
                        <Card.Text className="text-start"><Form.Text  value={inputValue} onChange={e => setInputValue(e.target.value)} /></Card.Text>
                    </Card.Body>
                    <Card.Footer><Button onClick={saveMyExample} color='success'>ذخیره</Button><Button onClick={cancelSaving} color='danger'>انصراف</Button></Card.Footer>
                </Card>
            }
           <div className="text-center"> 
            {!inputValue && !isEditing &&
                <Button outline rounded className='mt-auto' color='info' onClick={addMyExample}>مثال خودتان را اضافه کنید</Button>
            }
             {!inputValue && isEditing && <>
                <Form.Control  value={inputValue} onChange={e => setInputValue(e.target.value)} />

                <Button outline rounded className='mt-auto' color='info' onClick={saveMyExample}>ذخیره</Button>
                </>
            }
            </div>
        </div>
    );

};

export default YourExample;