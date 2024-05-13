import React from 'react';
import { Text } from 'react-native';
import { useFont } from './FontContext'; // Ensure this is correctly imported

/**
 * A wrapper component for the React Native `Text` component that applies a global font setting.
 * It uses a font context to fetch the current font family and apply it to all text within this component.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.style - Style object or array of styles that will be applied to the text.
 * @param {React.ReactNode} props.children - The content within the text element.
 */
const CustomText = ({ style, ...props }) => {
  const { fontFamily } = useFont(); // Retrieve the current font family from context
  
  return (
    <Text style={[{ fontFamily }, style]} {...props}>
      {props.children}
    </Text>
  );
};

export default CustomText;