import React, { createContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

/**
 * Create a context for managing and providing window dimensions across the application.
 */
export const DimensionsContext = createContext();

/**
 * A provider component that listens for changes in window dimensions and provides these dimensions to its children.
 * It uses the React Context API to allow any child component to access the current window dimensions.
 *
 * @param {Object} props - The props passed to the provider.
 * @param {React.ReactNode} props.children - The child components that can access the dimensions context.
 */
export const DimensionsProvider = ({ children }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    useEffect(() => {
        const onChange = ({ window }) => {
            setDimensions(window);
        };

        // Add event listener for window dimension changes
        Dimensions.addEventListener('change', onChange);

        // Cleanup listener on component unmount
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