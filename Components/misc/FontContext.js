import React, { createContext, useContext, useState } from 'react';

/**
 * Creates a context for managing font settings across the application.
 */
const FontContext = createContext();

/**
 * A custom hook for accessing the font context. This hook simplifies the usage of font context
 * in any component that requires font information.
 *
 * @returns {Object} The font context containing `fontFamily` and `setFontFamily`.
 */
export const useFont = () => useContext(FontContext);

/**
 * A provider component that wraps its children with FontContext providing them access to the font settings.
 * It manages the state of the font family used across the application.
 *
 * @param {Object} props - The props passed to the provider component.
 * @param {React.ReactNode} props.children - The child components that will have access to the font context.
 */
export const FontProvider = ({ children }) => {
  const [fontFamily, setFontFamily] = useState('sans-serif');  // Initialize with a default font family

  return (
    <FontContext.Provider value={{ fontFamily, setFontFamily }}>
      {children}
    </FontContext.Provider>
  );
};