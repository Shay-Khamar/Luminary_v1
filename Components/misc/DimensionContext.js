import React, { createContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const DimensionsContext = createContext();

export const DimensionsProvider = ({ children }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    useEffect(() => {
        const onChange = ({ window }) => {
            setDimensions(window);
        };

        Dimensions.addEventListener('change', onChange);

        return () => {
            Dimensions.removeEventListener('change', onChange);
        };
    }, []);

    return (
        <DimensionsContext.Provider value={dimensions}>
            {children}
        </DimensionsContext.Provider>
    );
};