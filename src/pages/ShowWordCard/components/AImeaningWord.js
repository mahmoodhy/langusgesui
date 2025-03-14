import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import EditMainMeaning from "./EditMainMeaning";
import EditYourMeaning from './EditYourMeaning';
import configData from "../../../config.json";
import { Button, Card, Row, Table, Spinner } from 'react-bootstrap';


const AImeaningWord = ({ currentword, token }) => {
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [meanings, setMeanings] = useState({});
    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };
    const fetchAiWordMeaning = async () => {
        try {

            const response = await axios.post(`${configData.SERVER_URL}/api/AI/GetAIMeanings/${currentword.boxId}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data.data;
            setMeanings(data)
<<<<<<< HEAD
            console.log(data);
=======
            console.log("GetAIMeanings : ",data);
>>>>>>> bbcffe301abcd411202922be5ac52ff7d098590b
            setLoading(false)
        } catch (error) {
            console.error('Error FindsimiliarWords:', error);

        }
    };

    useEffect(() => {

        setLoading(true)
        fetchAiWordMeaning();
    },
        [currentword])

    return (
        <Row>
            <Card>
                <Card.Header>
<h1>معنی های بیشتر</h1>
                 
                </Card.Header>
            
                    <div id="Meanings">
                        {loading && <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
                        <Card.Body>{!loading &&
                            <Table responsive striped bordered hover>
                                <thead className='bg-green-500 text-center'><th>معنی فارسی</th><th>معنی انگلیسی</th><th>مثال</th></thead>
                                <tbody>
                                    {
                                        meanings.map((meaning) => (
                                            <tr key={meaning.id}>
                                                <td>{meaning.persian}</td><td>{meaning.meaning} </td><td>{meaning.example}</td>
                                            </tr>
                                        ))
                                    }</tbody></Table>}
                        </Card.Body>
                        <Card.Footer>

                        </Card.Footer>

                    </div>
               
            </Card>



        </Row>
    );
};

export default AImeaningWord;
