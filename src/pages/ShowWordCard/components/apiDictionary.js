import React, { useState, useEffect, useRef } from 'react';
import {
    MDBBtn,
    MDBCollapse,
    MDBRow,
    MDBCardHeader,
    MDBSpinner, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBTable,
    MDBCardFooter
} from 'mdb-react-ui-kit';
import RightClickArea from '../../../../src/Components/RightClickArea';
import zIndex from '@mui/material/styles/zIndex';
const ApiDictionary = (props) => {

    const { meanings,onSearch  } = props;
    const [showFirst, setShowFirst] = useState(true);
    const toggleFirst = () => setShowFirst(!showFirst);
    
    return (


        <div>
            {meanings && meanings.map((meaning) => {
                // const hasExamples = meaning.definitions.some(definition => definition.example);
                // const hasDefinitions = meaning.definitions.some(definition => definition.definition);

                return (
                    <MDBCard key={meaning.id}>
                        <MDBCardHeader className='text-center bg-green-200'>
                            <MDBBtn onClick={toggleFirst}>
                                {meaning.partOfSpeech === 'noun' ? 'noun(اسم)'
                                    : meaning.partOfSpeech === 'verb' ? 'verb(فعل)' : meaning.partOfSpeech === 'adverb' ? 'adverb(قید)'
                                        : meaning.partOfSpeech === 'adjective' ? 'adjective(صفت)' : meaning.partOfSpeech}
                            </MDBBtn>
                        </MDBCardHeader>
                        <MDBCollapse open={showFirst} className='mt-3'>
                            <MDBCardBody className='bg-blue-200'>
                               

                                                {meaning.definitions.map((definition) => (
                                                    <div key={definition.id}>
                                                        {definition.definition && <p className='text-green-500 text-start border p-2'><span className='text-dark'>Meaning : </span>{definition.definition}</p>}
                                                        {definition.example && <p className='text-red-500 text-start border p-2'><span className='text-dark'>Example : </span>{definition.example}</p>}
                                                        
                                                    </div>
                                                ))}
                                               
                                       
                                
                            </MDBCardBody>
                        </MDBCollapse>
                    </MDBCard>
                );
            })}

        </div>
    );

};

export default ApiDictionary;