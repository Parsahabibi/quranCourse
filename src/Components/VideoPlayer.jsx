import React, { useRef, useState, useEffect } from 'react';

const VideoPlayer = ({ title }) => {

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        if (!isPlaying) {
            videoRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(error => {
                console.error('Error playing video:', error);
            });
        } else {
            videoRef.current.pause();
            setTimeout(() => {
                setIsPlaying(false);
            }, 50); // Slight delay to ensure smooth state transition
        }
    };


    useEffect(() => {
        const video = videoRef.current;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        // Add event listeners for play and pause
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        // Clean up event listeners on unmount
        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, []);


    return (
        <div className='w-full'>
            <h4 className='text-slate-800 font-bold mb-16 text-2xl'>{title}</h4>
            <div className="w-[100%] sm:w-[75%] max-w-screen-2xl mx-auto mt-10 p-4 rounded-lg shadow-lg">
                <video
                    ref={videoRef}
                    className="w-full rounded-lg mb-4"
                    controls
                    poster="your-poster-image-url.jpg"
                >
                    <source src="/assets/video/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="flex justify-center">
                    <button
                        onClick={togglePlayPause}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                </div>
            </div>
        </div>

    );
};

export default VideoPlayer;
