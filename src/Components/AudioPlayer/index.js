import React, { useRef, useState,useEffect } from 'react';

const AudioPlayer = ({ src }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
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
    useEffect(() => {
 
   



        if (src !== null) {
          if (audioRef.current) {
            audioRef.current.load();
            var playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
              playPromise.then(_ => {
                playPromise.autoPlay();
                playPromise.pause();
              })
              .catch(error => {
               
              });
            }
          }
        }
    
      }, [src]);
    return (
        <div>
            <audio ref={audioRef} src={src} onEnded={handleEnded} />
            <button onClick={handlePlayPause}>
                {isPlaying ?
                 <i className="fa-solid fa-volume-high fa-3x" style={{ color: '#3366ff' }}></i>:
                  <i className="fa-solid fa-volume-high fa-3x" style={{ color: '#666699'}}></i>}
            </button>
        </div>
    );
};

export default AudioPlayer;
