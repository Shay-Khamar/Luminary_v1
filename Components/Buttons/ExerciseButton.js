import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colours from '../../colours'

const ExerciseButton = ({onPress, Title, children}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
      <Text style={styles.text}>{Title}</Text>
      <View style={styles.header}>{children}</View>
      </View>
    </TouchableOpacity>

      
  )
}

export default ExerciseButton

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 300,
    borderRadius: 20,
    backgroundColor: colours.accent,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',  // Ensure the text is centered within the button
    padding: 10,  // Add padding to prevent text touching the edges
    shadowColor: '#000',  // Black shadow for contrast
    shadowOffset: { width: 0, height: 2 },  // Shadow appears slightly below the button
    shadowOpacity: 0.3,  // Semi-transparent shadow
    shadowRadius: 4,  // Soften the shadow edges
    elevation: 8,  // Elevation for Android to create shadow effect
  },
text: {
    fontSize: 30,
    textTransform: 'uppercase',
    color: colours.text,
    fontFamily: 'Lexend',
    textAlign: 'center',  // Center-align text
},
header: {
    alignSelf: 'center',
  
}
});