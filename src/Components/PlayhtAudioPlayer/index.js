import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import configData from "../../config.json";
import { Button, Spinner } from 'react-bootstrap';
const PlayhtAudioPlayer = ({ word ,token}) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioSrc, setaudioSrc] = useState('');
    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };
        const fetchAudio = async () => {
        try{
        const response =await  axios.post(`${configData.SERVER_URL}/api/Home/GetaudioFileFrom_AI?word=${word}`, {}, {
            headers: {
              'Content-Type': 'application/json',
              'accept': 'audio/mpeg',
              Authorization: `Bearer ${token}`,
            },
          });
          const data =await response.data.data
          setaudioSrc(data);
          if (audioRef.current) {
              audioRef.current.src = audioSrc;
            }
        }
        catch(error) {
           
            console.error('Error getFromTranslator:', error);
        

        }
    };
   
    fetchAudio();
   useEffect(()=>{
    setaudioSrc(null);
   },[word]);

    return (
        <>
        {!audioSrc && 
                 <Spinner animation="border" variant="success" />

        }
        {audioSrc && 
        <div className='mt-2'>
           
            <audio ref={audioRef}  onEnded={handleEnded}/>
            <button onClick={handlePlayPause}>
                {isPlaying ?
                 <i className="fa-solid fa-volume-high fa-3x" style={{ color: '#3366ff' }}></i>:
                  <i className="fa-solid fa-volume-high fa-3x" style={{ color: '#666699'}}></i>}
            </button>
        </div>
                }</>
    );
};

export default PlayhtAudioPlayer;
