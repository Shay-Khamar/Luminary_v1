
import React, { createContext, useContext, useState } from 'react';

/**
 * Context for managing exercise results.
 * @typedef {Object} ResultContextType
 * @property {Object} exerciseData - The exercise data containing exercise type and results.
 * @property {function} updateExerciseData - Function to update the exercise data.
 * @property {function} resetResults - Function to reset the exercise data.
 */

/**
 * Context for managing exercise results.
 * @type {ResultContextType}
 */
const ResultContext = createContext();

/**
 * Hook to access the exercise results context.
 * @returns {ResultContextType} The exercise results context.
 */
export const useResults = () => useContext(ResultContext);

/**
 * Provider component for the exercise results context.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The provider component.
 */
export const ResultProvider = ({ children }) => {
    // Initialize the state with an empty/default structure
    const initialState = {
        exerciseType: '',
        results: {},
    };

    const [exerciseData, setExerciseData] = useState(initialState);

    /**
     * Function to update the exercise data.
     * @param {string} type - The exercise type.
     * @param {Object} results - The exercise results.
     */
    const updateExerciseData = (type, results) => {
        setExerciseData({ exerciseType: type, results });
    };

    /**
     * Function to reset the exercise data.
     */
    const resetResults = () => {
        setExerciseData(initialState);
    };

    return (
        <ResultContext.Provider value={{ exerciseData, updateExerciseData, resetResults }}>
            {children}
        </ResultContext.Provider>
    );
}