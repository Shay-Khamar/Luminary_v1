import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();

export const useResults = () => useContext(ResultContext);

export const ResultProvider = ({ children }) => {
    const [exerciseData, setExerciseData] = useState({exerciseType: '', results: {},});

    const updateExerciseData = (type, results) => {
        setExerciseData({exerciseType: type, results});
    };

    return (
        <ResultContext.Provider value={{exerciseData, updateExerciseData}}>
            {children}
        </ResultContext.Provider>
    );
}