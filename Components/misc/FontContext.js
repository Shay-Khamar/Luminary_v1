import React, { createContext, useContext, useState } from 'react';

// Create the context
const FontContext = createContext();

// Hook to use the context
export const useFont = () => useContext(FontContext);

// Provider component
export const FontProvider = ({ children }) => {
  const [fontFamily, setFontFamily] = useState('sans-serif');

  return (
    <FontContext.Provider value={{ fontFamily, setFontFamily }}>
      {children}
    </FontContext.Provider>
  );
};