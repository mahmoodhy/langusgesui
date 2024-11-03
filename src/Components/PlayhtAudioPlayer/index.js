import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import configData from "../../config.json";
const PlayhtAudioPlayer = ({ word ,token}) => {
    const audioRef = useRef(null);
    
        const fetchAudio = async () => {
        try{
            console.log('GetaudioFileFrom_Playht started . . . ');
        const response =await  axios.post(`${configData.SERVER_URL}/api/Home/GetaudioFileFrom_Playht?word=${word}`, {}, {
            headers: {
              'Content-Type': 'application/json',
              'accept': 'audio/mpeg',
              Authorization: `Bearer ${token}`,
            },
          });
          const data =await response.data.data
          const audioSrc =data;
          if (audioRef.current) {
              audioRef.current.src = audioSrc;
            }
        }
        catch(error) {
           
            console.error('Error getFromTranslator:', error);
        

        }
    };
    fetchAudio();
   

    return (
        <div>
            <audio ref={audioRef} controls />
        </div>
    );
};

export default PlayhtAudioPlayer;
