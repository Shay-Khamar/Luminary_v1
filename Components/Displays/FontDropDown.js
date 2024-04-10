import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFont } from '../misc/FontContext';
import { useFonts } from 'expo-font';
import { SelectList } from 'react-native-dropdown-select-list'


const FontDropDown = () => {
    const { fontFamily, setFontFamily } = useFont();
    const fontData = [
      { key: 'default', value: 'System Default' },
      { key: 'OpenSans', value: 'OpenSans' },
      { key: 'Lexend', value: 'Lexend' },
      { key: 'Helvetica', value: 'Helvetica' },
      { key: 'CourierPrime', value: 'CourierPrime' },
      { key: 'OpenDyslexic', value: 'OpenDyslexic' },
      // Add more fonts as needed
    ];
  
    // Find the key of the currently selected font to match SelectList's expectations
    const selectedKey = fontData.find(font => font.value === fontFamily)?.key || 'default';
  
    return (
      <SelectList 
        setSelected={(key) => {
          // Use the key to find the corresponding font value and update the context
          const selectedFont = fontData.find(font => font.key === key)?.value || 'System Default';
          setFontFamily(selectedFont);
        }} 
        data={fontData} 
        placeholder="Select a font"
        boxStyles={{borderRadius: 5}} 
        dropdownTextStyles={{fontSize: 16}} 
        search={false} 
      />
    );
  };

  export default FontDropDown;
const styles = StyleSheet.create({})