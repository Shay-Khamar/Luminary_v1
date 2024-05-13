import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFont } from '../misc/FontContext';
import { useFonts } from 'expo-font';
import { SelectList } from 'react-native-dropdown-select-list'

/**
 * A dropdown component that allows users to select a font from a list.
 * The selected font is then updated in the FontContext to be used across the application.
 */
const FontDropDown = () => {
    const { fontFamily, setFontFamily } = useFont();
    const fontData = [
      { key: 'sans-serif', value: 'sans-serif' },
      { key: 'OpenSans', value: 'OpenSans' },
      { key: 'Lexend', value: 'Lexend' },
      { key: 'Helvetica', value: 'Helvetica' },
      { key: 'CourierPrime', value: 'CourierPrime' },
      { key: 'OpenDyslexic', value: 'OpenDyslexic' },
      // Add more fonts as needed
    ];
  
    // Find the key of the currently selected font to match SelectList's expectations
    const selectedKey = fontData.find(font => font.value === fontFamily)?.key || 'sans-serif';
  
    return (
      <SelectList 
        setSelected={(key) => {
          // Use the key to find the corresponding font value and update the context
          const selectedFont = fontData.find(font => font.key === key)?.value || 'sans-serif';
          setFontFamily(selectedFont);
        }} 
        data={fontData} 
        placeholder={fontData.find(font => font.value === fontFamily)?.key || 'sans-serif'}
        boxStyles={{borderRadius: 10, backgroundColor: '#f0f0f0', padding: 20, borderColor: '#000', borderWidth: 2}} 
        dropdownTextStyles={{fontSize: 16, fontWeight: 'bold', color: '#000'}} 
        search={false} 
      />
    );
  };

export default FontDropDown;
const styles = StyleSheet.create({});