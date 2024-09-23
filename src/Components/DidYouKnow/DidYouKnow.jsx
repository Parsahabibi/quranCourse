import React from 'react';
import './didYouKnow.css';

const DidYouKnow = () => {


    const data = [
        { id: 0, title: 'Ants...', description: 'Do you know about ants that...' },
        { id: 1, title: 'Ants...', description: 'Ants live in groups (Colonies)' },
        { id: 2, title: 'Ants...', description: 'Ants work in cooperation with each other' },
        { id: 3, title: 'Ants...', description: 'The body of ants is made of glass' },
        { id: 4, title: 'Ants...', description: 'Ants can lift objects that are heavier than themselves' },
        { id: 5, title: 'Ants...', description: 'Ants can swim in water' },
        { id: 6, title: 'Ants...', description: 'There are many, many ants in this world' },
        { id: 7, title: 'Ants...', description: 'Ants can tolerate all kinds of weather and climate' },
        { id: 8, title: 'Ants...', description: 'Ants build their nests in layers' },
        { id: 9, title: 'Ants...', description: 'Ants are omnivores' },
        { id: 10, title: 'Ants...', description: 'Some ants, like carnivorous ants, can be dangerous' },
    ]


    return (
        <div className="containers w-full">
            <p id="title" className="text-slate-900 font-bold text-2xl">Did You Know</p>
            <div className="sticky-notes w-full">
                <form id="survey-form" className="w-full h-[500px]">
                    {
                        data.map(
                            item =>
                                <fieldset className="sticky-note" style={{ cursor: 'pointer' }}>
                                    <legend className="tape">{item.title}</legend>
                                    <p className="text-slate-900 text-base">{item.description}</p>
                                </fieldset>
                        )
                    }
                </form>
            </div>
        </div>
    );
}

export default DidYouKnow;
