import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './scrollMenu.css'
import { ScrollTrigger, ScrollToPlugin, Power1 } from 'gsap/all';
import Ants from '../Ants';
import WhatAllahTellsUs from '../WhatAllahTellsUs';
import DidYouKnow from '../DidYouKnow/DidYouKnow';
import VideoPlayer from '../VideoPlayer';
import { useLinkId } from '../../context/LinkId';
import ImageGallery from '../ImageGallery';
import CourseTitle from '../CourseTitle/CourseTitle';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ScrollMenu = () => {

    const dudeRef = useRef(null);
    const headRef = useRef(null);
    const legsRef = useRef([]);
    const armsRef = useRef([]);
    const legBottomsRef = useRef([]);
    const armBottomsRef = useRef([]);
    const contentRef = useRef(null);
    const arrowRef = useRef(null);

    useEffect(() => {

        
        const dude = dudeRef.current;
        const head = headRef.current;
        const legs = legsRef.current;
        const arms = armsRef.current;
        const legBottoms = legBottomsRef.current;
        const armBottoms = armBottomsRef.current;
        const content = contentRef.current;
        const arrowEl = arrowRef.current;
        gsap.set(arms, { svgOrigin: "180 58" });
        gsap.set(head, { svgOrigin: "180 45" });
        gsap.set(armBottoms, { svgOrigin: "178 118" });
        gsap.set(legs, { svgOrigin: "177 145" });
        gsap.set(legBottoms, { svgOrigin: "171 220" });

        const halfBodyTimeline = (leg, arm) => {
            const legBottom = leg.querySelector('.leg-bottom');
            const armBottom = arm.querySelector('.arm-bottom');
            return gsap.timeline({
                repeat: -1,
                paused: true,
            })
                .fromTo(leg, { rotation: -25 }, { duration: 0.5, rotation: 15, ease: 'sine.inOut' }, 0)
                .to(leg, { duration: 0.25, rotation: -25, ease: 'sine.in' }, '>')
                .to(legBottom, { duration: 0.25, rotation: 15, ease: 'sine.inOut' }, 0.25)
                .to(legBottom, { duration: 0.25, rotation: 80, ease: 'sine.in' }, '>')
                .to(legBottom, { duration: 0.25, rotation: 0, ease: 'sine.out' }, '>')
                .fromTo(arm, { rotation: -12 }, { duration: 0.5, rotation: 12, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0)
                .fromTo(armBottom, { rotation: -15 }, { duration: 0.5, rotation: 10, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0);
        };

        const backCycle = halfBodyTimeline(legs[0], arms[1]);
        const frontCycle = halfBodyTimeline(legs[1], arms[0]);
        const bodyTimeline = gsap.timeline({ paused: true })
            .to(dude, { duration: 0.25, y: '-=20', repeat: -1, yoyo: true, ease: 'sine.inOut' }, 0)
            .fromTo(head, { rotation: -25 }, { duration: 0.25, rotation: 1, repeat: -1, yoyo: true, ease: 'sine.inOut' }, 0);

        const numberOfCycles = Math.ceil(3 * window.innerWidth / window.innerHeight);
        gsap.timeline({
            scrollTrigger: {
                trigger: '.page',
                scrub: true,
                start: '0% 0%',
                end: '100% 100%',
                markers: false
            },
        })
            .to(arrowEl, { duration: 0.05, opacity: 0 }, 0)
            .fromTo(content, { xPercent: 0 }, { xPercent: -50, ease: 'none' }, 0)
            .fromTo(bodyTimeline, { time: 0.7 }, { time: 0.75 + numberOfCycles }, 0)
            .fromTo(backCycle, { time: 0.7 }, { time: 0.75 + numberOfCycles }, 0)
            .fromTo(frontCycle, { time: 0.2 }, { time: 0.25 + numberOfCycles }, 0);

        window.addEventListener('resize', () => {
            ScrollTrigger.refresh();
        });

        // For CodePen preview-like scroll
        gsap.set(window, { scrollTo: 0 });
        gsap.timeline({}).to(window, { duration: 1, scrollTo: 0.3 * window.innerHeight, ease: 'power1.inOut' });
    }, []);
    


    return (
        <div className="page">
            <div className="content" ref={contentRef}>
                <div className="content-section section-1">
                    <div className='w-full'>
                        <CourseTitle text={'Course Title'}/>
                    </div>
                </div>
                <div className="content-section section-2" id='Ants'>
                    <div>
                        <Ants />
                    </div>
                </div>
                <div className="content-section section-3" id='WhatAllahTellsUs'>
                    <div>
                        <WhatAllahTellsUs />
                    </div>
                </div>
                <div className="content-section section-4" id='DidYouKnow'>
                    <DidYouKnow />
                </div>
                <div className="content-section section-5" id='PoetryTime'>
                    <div>
                        <VideoPlayer title={'Poetry time!'}/>
                    </div>
                </div>
                <div className="content-section section-6" id='TakeACloserLook'>
                    <div>
                        <VideoPlayer title={'Take a closer look!'}/>
                    </div>
                </div>
                <div className="content-section section-7" id='ImagesGallery'>
                    <ImageGallery />
                </div>
                <div className="content-section section-8">
                </div>
                <div className="content-section section-8">
                </div>
                <div className="content-section section-8">
                </div>
                <div className="content-section section-9">
                </div>
                <div className="content-section">
                </div>
            </div>
            <div className="animation-container">
                <svg viewBox="0 -10 315 350" ref={dudeRef} className='airplaneIcon'>
                    <g className="dude" stroke="black" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none">
                        <g className="leg" ref={el => (legsRef.current[0] = el)}>
                            <path className="leg-bottom" ref={el => (legBottomsRef.current[0] = el)} d="M182,317l-10.4-2.8c-2.7-0.7-4.5-3.2-4.4-6c1.7-13,3-27,3.7-42.1c0.8-16.5,0.7-32,0.1-46.1" />
                            <path d="M171,220l6-60" />
                        </g>
                        <g className="leg" ref={el => (legsRef.current[1] = el)}>
                            <path className="leg-bottom" ref={el => (legBottomsRef.current[1] = el)} d="M182,317l-10.2-2.7c-2.8-0.8-4.7-3.4-4.6-6.3c-0.8-13.9-1-29.2-0.2-45.8c0.7-15.2,2.1-29.4,4-42.2" />
                            <path d="M171,222c0.3-10,4.3-42,5.3-48" />
                        </g>
                        <g className="arm" ref={el => (armsRef.current[0] = el)}>
                            <path d="M175,75c-0.6,8.7-0.6,18.9,0.8,30.1c0.6,4.6,1.3,8.9,2.2,12.9" />
                            <path className="arm-bottom" ref={el => (armBottomsRef.current[0] = el)} d="M186,175c-0.2-3.1-0.4-6.2-0.7-9.3c-1.5-16.9-4.1-32.9-7.3-47.7" />
                        </g>
                        <g className="arm" ref={el => (armsRef.current[1] = el)}>
                            <path d="M178.8,82.2c-1.9,13.1-1.8,25.2-0.8,35.8" />
                            <path className="arm-bottom" ref={el => (armBottomsRef.current[1] = el)} d="M186,175c-2.4-7.6-4.7-16.8-6.3-27.2c-1.6-11.3-2-21.3-1.7-29.8" />
                        </g>
                        <path className="head" ref={headRef} d="M195,14.8c-10.8-5.7-23.9,1.3-28.2,12.4c-4.9,13,6.3,28.4,17.8,29.1c13.2,0.8,22.2-16.1,19.5-26.7c-1.6-6.5-5.2-7.1-5.2-7.1" />
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default ScrollMenu;
