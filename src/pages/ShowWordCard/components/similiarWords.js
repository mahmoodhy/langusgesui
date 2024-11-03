
import React, { useState, useEffect, useRef } from 'react';
import {
    MDBTable, MDBTableHead, MDBTableBody, MDBSpinner, MDBBtn, MDBCollapse
}
    from 'mdb-react-ui-kit';


const SimiliarWords = (props) => {
    const { similiarWords } = props;

    const [showFirst, setShowFirst] = useState(false);
    const toggleFirst = () => setShowFirst(!showFirst);

    return (


        <div className="d-grid gap-2 m-2">

           
            
                <MDBBtn onClick={toggleFirst}><span>مشاهده کلمات مشابه</span></MDBBtn>
               
               
            <MDBCollapse open={showFirst} className='mt-3'>
            {!similiarWords &&
                    <MDBSpinner role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </MDBSpinner>
                }
            {similiarWords &&
                <MDBTable striped>
                    <MDBTableHead>
                        <tr>
                            <th scope='col'>کلمه مشابه</th>
                            <th scope='col'>معنی</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>

                        {similiarWords &&
                            similiarWords.map((similiarWord) => (
                                <tr><td>{similiarWord.word}</td><td>{similiarWord.officialTranslate} </td></tr>
                            ))
                        }

                    </MDBTableBody>
                </MDBTable>}
            </MDBCollapse>
        </div>
    );

};

export default SimiliarWords;