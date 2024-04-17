import React, { createContext, useState, useContext, useEffect } from 'react';

const ScoreContext = createContext();

export const useScore = () => useContext(ScoreContext);// Not the best name for this function but I think it's clear enough!

export const ScoreProvider = ({ children }) => {}
    //I need to keep track of the number of comprehension questions answered correctly
    // I need to cacluate the time taken to read the extract and the amount of words in the extract to calculate the wpm.
    //