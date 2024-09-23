import React from 'react'
import AudioPlayer from './AudioPlayer/AudioPlayer'

const WhatAllahTellsUs = () => {
    return (
        <div>
            <p className='text-slate-800 font-bold  mb-4 text-base lg:text-2xl'>What Allah tells us</p>
            <p className='text-stone-200 font-semibold mb-4 text-sm lg:text-base'>حَتَّىٰ إِذَا أَتَوْا عَلَىٰ وَادِ النَّمْلِ قَالَتْ نَمْلَةٌ يَا أَيُّهَا النَّمْلُ ادْخُلُوا مَسَاكِنَكُمْ لَا يَحْطِمَنَّكُمْ سُلَيْمَانُ وَجُنُودُهُ وَهُمْ لَا يَشْعُرُونَ(18)</p>
            <p className='text-slate-800 font-medium text-justify text-sm lg:text-sm mb-8' style={{maxHeight:'80px' , overflowY:'auto'}}>
                When they came to the Valley of Ants, an ant said, ‘O ants! Enter your dwellings, lest Solomon and his hosts should trample on you while they are unaware.’
            </p>
            <div className="flex justify-center">
                <AudioPlayer
                    image="https://i.ibb.co/ZS3wRSh/cover.jpg"
                    title="playing now"
                    artist="Disclosure"
                    song="Playing Now"
                    audioSrc="/assets/audio/song.mp3"
                />
            </div>
        </div>
    )
}

export default WhatAllahTellsUs