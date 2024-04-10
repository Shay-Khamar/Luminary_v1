import React from 'react';
import { Text } from 'react-native';
import { useFont } from './FontContext'; // Ensure this is correctly imported

const CustomText = ({style, ...props}) => {
  const { fontFamily } = useFont();
  
  return (
    <Text style={[{ fontFamily }, style]} {...props}>
      {props.children}
    </Text>
  );
};

export default CustomText;