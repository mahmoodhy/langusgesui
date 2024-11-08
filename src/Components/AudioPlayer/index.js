import React, { useRef, useState } from 'react';

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

    return (
        <div>
            <audio ref={audioRef} src={src} onEnded={handleEnded} />
            <button onClick={handlePlayPause}>
                {isPlaying ?
                 <i class="fa-solid fa-volume-high fa-3x" style={{ color: '#3366ff' }}></i>:
                  <i class="fa-solid fa-volume-high fa-3x" style={{ color: '#666699'}}></i>}
            </button>
        </div>
    );
};

export default AudioPlayer;
