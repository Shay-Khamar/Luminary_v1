import { StyleSheet, Text, ScrollView, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { FontProvider } from '../../misc/FontContext';
import CustomText from '../../misc/CustomText';
import FontDropDown from '../../Displays/FontDropDown';

const Exercise1 = () => {
  const route = useRoute();
  const item = route.params?.Extract;

  // Split the content by newline characters to separate paragraphs
  const paragraphs = item?.content.split('\n\n');

  return (
    <FontProvider>
    <View style={styles.container}>
      <FontDropDown/>
      <Text style={styles.header}>Exercise 1 Screen</Text>
      <View style={styles.centeredBoxContainer}>
      <View style={styles.boxContainer}>
      
    <ScrollView contentContainerStyle={styles.extractContainer} fadingEdgeLength={2} scrollEnabled={true}>
      {paragraphs.map((paragraph, index) => (
        <CustomText key={index} style={styles.paragraph}>
          {paragraph}
        </CustomText>
      ))}
    </ScrollView>
    </View>
    </View>
    </View>
    </FontProvider>
  );
};

export default Exercise1;

const styles = StyleSheet.create({
  // I want to center the text in the middle of the screen encapsulating ScrollView into a  View.
  // That way I can add the custom font drop down menu from the top of the screen.
  // Create the timer shouldn't be too hard many examples online.
  container: {
    flex: 1
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    padding : 20,
  },
  extractContainer: {
    paddingHorizontal: 50,  
  },

  paragraph: {
    fontSize: 30 ,
    marginBottom: 10, // Add some space between paragraphs
    textAlignVertical: 'center',  
  },

  boxContainer: {
    width: '65%',
    height: '75%',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#d0d0d0', // Border color for depth
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow effect
    borderRadius: 1
  },

  centeredBoxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});