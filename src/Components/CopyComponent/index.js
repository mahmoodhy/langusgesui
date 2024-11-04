import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function CopyComponent({ text }) {
  return (
    <CopyToClipboard text={text} >
      <button className='w-100 text-justify'>
        <div className='d-flex justify-content-between'>         
          <span className='text-justify-start'>کپی</span>
          <span className='text-justify-center'> . . . </span>
          <span className='text-justify-end'>Copy</span>
        </div>
      </button>
    </CopyToClipboard>
  );
}

export default CopyComponent;
