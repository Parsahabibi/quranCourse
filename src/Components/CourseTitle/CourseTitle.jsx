import React, { useRef } from 'react'
import './courseTitle.css'

const CourseTitle = ({ text }) => {

    const arrowRef = useRef(null);

    return (
        <div className='backGround w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
            <h1 className='courseTitle'>{text}</h1>
            <p className="arrow-animated text-slate-800" ref={arrowRef}>↓ Scroll</p>
        </div>

    )
}

export default CourseTitle