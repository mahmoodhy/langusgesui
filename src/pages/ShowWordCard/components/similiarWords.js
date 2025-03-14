

import { Table,Spinner   } from 'react-bootstrap';


const SimiliarWords = (props) => {
    const { similiarWords } = props;

    

    return (


        <div className="d-grid gap-2 m-2">

           
            
               
               
               
            {!similiarWords &&
                    <Spinner role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                }
            {similiarWords &&
                <Table striped responsive="sm">
                    <thead>
                        <tr>
                            <th width="20%">کلمه مشابه</th>
                            <th>معنی</th>
                        </tr>
                    </thead>
                    <tbody>

                        {similiarWords &&
                            similiarWords.map((similiarWord) => (
                                <tr><td>{similiarWord.word}</td><td className='text-secondary'>{similiarWord.officialTranslate} </td></tr>
                            ))
                        }

                    </tbody>
                </Table>}
        </div>
    );

};

export default SimiliarWords;