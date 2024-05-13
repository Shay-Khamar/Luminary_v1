import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();

export const useResults = () => useContext(ResultContext);

export const ResultProvider = ({ children }) => {
    // Initialize the state with an empty/default structure
    const initialState = {
        exerciseType: '',
        results: {},
    };

    const [exerciseData, setExerciseData] = useState(initialState);

    const updateExerciseData = (type, results) => {
        setExerciseData({exerciseType: type, results});
    };

    // Function to reset the exercise data
    const resetResults = () => {
        setExerciseData(initialState);
    };

    return (
        <ResultContext.Provider value={{exerciseData, updateExerciseData, resetResults}}>
            {children}
        </ResultContext.Provider>
    );
}