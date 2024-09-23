import React, { createContext, useContext } from 'react';
import useLocalStorage from 'use-local-storage';


const LinkIdContext = createContext();

export const LinkIdProvider = ({ children }) => {

    const [linkId, setLinkId] = useLocalStorage('LinkId', []);

    const saveLinkId = (data) => {
        setLinkId(prevData => [...prevData, ...data]);
    };

    return (
        <LinkIdContext.Provider value={{ linkId, setLinkId , saveLinkId }}>
            {children}
        </LinkIdContext.Provider>
    );
};

export const useLinkId = () => {
    return useContext(LinkIdContext);
};