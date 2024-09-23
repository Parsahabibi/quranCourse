import React, { useEffect, useRef, useState } from "react";
import "./audioPlayer.css"; // Assuming you're using a CSS file for the styles
import { FaPlay, FaPause} from 'react-icons/fa';


const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};


const AudioPlayer = ({ image, title, artist, song, audioSrc }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const rangeRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;

        const updateCurrentTime = () => {
            setCurrentTime(audio.currentTime);
        };

        const updateDuration = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener('timeupdate', updateCurrentTime);
        audio.addEventListener('loadedmetadata', updateDuration);

        return () => {
            audio.removeEventListener('timeupdate', updateCurrentTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
            setTimeout(() => {
                setIsPlaying(false);
            }, 300); // Adjust timeout if needed
        } else {
            audio.play().then(() => {
                setIsPlaying(true);
            }).catch(() => {
                // Handle playback errors, if any
            });
        }
    };

    const handleRangeChange = (e) => {
        const audio = audioRef.current;
        const newTime = (e.target.value / 100) * duration;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };


    return (
        <div className="flex items-center justify-center max-w-[500px] w-full">
            <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center rounded-xl shadow-lg p-5 lg:p-5">
                <div className="flex w-full justify-evenly items-center mb-6">
                    <h5 className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                        {title}
                    </h5>
                </div>
                <div className="w-24 mb-4">
                    <img src={image} alt="Album Cover" className="w-full h-auto rounded-full shadow-md" />
                </div>
                <h2 className="text-lg lg:text-xl font-semibold text-gray-500">{artist}</h2>
                <h3 className="text-base lg:text-lg font-normal text-gray-500 text-center">{song}</h3>
                <input
                    type="range"
                    value={(currentTime / duration) * 100 || 0}
                    min="0"
                    max="100"
                    className="w-4/5 my-6 appearance-none h-1 bg-gray-300 rounded-full cursor-pointer"
                    onChange={handleRangeChange}
                    ref={rangeRef}
                />
                <div className="flex justify-between w-4/5 text-xs font-semibold text-gray-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
                <audio ref={audioRef} src={audioSrc} className="hidden" />
                <div className="flex w-full justify-evenly mt-6">
                    <button onClick={togglePlayPause} className={`p-4 w-[60px] h-[60px] flex justify-center items-center rounded-full bg-blue-500 shadow-inner`}>
                        {isPlaying ? <FaPause className="text-white w-4 h-4" /> : <FaPlay className="text-white w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
