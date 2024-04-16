import { StyleSheet, Text, ScrollView, View, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { FontProvider } from '../../misc/FontContext';
import CustomText from '../../misc/CustomText';
import FontDropDown from '../../Displays/FontDropDown';
import {  Dialog, Portal, } from 'react-native-paper';
import DialogBoxComponent from '../../Displays/DialogBoxComponent';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import CameraScreen from '../../Displays/CameraScreen';
import { useRecording } from '../../misc/RecordingContext';


import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';




const TextContent = {
  intro: " Notice a small recording indicator at the bottom left of your screen? It's there because we're gathering insights to make experiences like yours even better. Not comfortable with sharing? No worries, feel free to opt out anytime.",
  story: " We encourage you to read through the extract fully. There's a world within these words, and at the end, we have some questions to help us explore your thoughts and insights together.",
  customization: " Your comfort is our priority. Feel free to adjust the font to your liking from the dropdown menu in the top right. Finding what works best for you can make all the difference.",
  gratitude: " We can't thank you enough for joining us and participating. Your involvement is a huge support to our research and helps us create more inclusive and empowering reading environments."
};

const Exercise1 = () => {

  const { cameraMinimized } = useRecording();


  const navigation = useNavigation();

  navResultScreen = () => {
    navigation.navigate('ResultScreen');
  }

  const route = useRoute();
  const item = route.params?.Extract;
  // Split the content by newline characters to separate paragraphs
  const paragraphs = item?.content.split('\n\n');

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    //Gonna need an if statement to check the state of the visivibility of the camera Screen, probably don't want it showing until after the calibration 
    showDialog();
  }, []);

  const readTextAloud = () => {
    const allText = Object.values(TextContent).join(" ");
    Speech.speak(allText, {
      language: 'en',
      pitch: 0.8,
      rate: 1,
    });
  };

  const cameraScreenContainerStyle = {
      position: 'absolute', // Position the camera screen absolutely
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10, // Ensure it's above other components
      pointerEvents: cameraMinimized ? 'box-none' : 'auto', 
  }


  return (
    <>
    <DialogBoxComponent visible={visible} onDismiss={hideDialog} Title={'Just Before Start'}>
      <TouchableOpacity onPress={readTextAloud}><FontAwesome name="volume-up" size={24} color="black" /></TouchableOpacity>
      <Text style={styles.DialogText}>
      <Text style={styles.subheading}>Your Journey, Your Control:</Text>{TextContent.intro}
      </Text>

      <Text style={styles.DialogText}>
      <Text style={styles.subheading}>Dive Deep into the Story: </Text>{TextContent.story}
      </Text>

      <Text style={styles.DialogText}>
      <Text style={styles.subheading}>Customize Your Reading Experience:</Text>{TextContent.customization}
      </Text>

      <Text style={styles.DialogText}>
      <Text style={styles.subheading}>Gratitude:</Text>{TextContent.gratitude}
      </Text>
      </DialogBoxComponent>

    <FontProvider>
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.title}>Exercise 1 Screen</Text>
      <Text>0:00</Text>
      <FontDropDown />
      </View>
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
    <TouchableOpacity onPress={navResultScreen} style={styles.tester}><Ionicons name="checkmark-circle" size={50} color="black" /></TouchableOpacity>
    </View>
    </FontProvider>

    <View style={cameraScreenContainerStyle}>
    <CameraScreen />
    </View>

    </>
  );
};

export default Exercise1;

const styles = StyleSheet.create({
  // I want to center the text in the middle of the screen encapsulating ScrollView into a  View.
  // That way I can add the custom font drop down menu from the top of the screen.
  // Create the timer shouldn't be too hard many examples online.
  container: {
    flex: 1,
    position: 'relative',
  },

  tester: {
    position: 'absolute', // Position it relative to the container's boundaries
    right: 20, // Distance from the right edge of the container
    bottom: 20, // Distance from the bottom edge of the container
    justifyContent: 'center',
    alignItems: 'center',

  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },


  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
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
  },

  DialogText: {
    fontSize: 20,
    padding: 10,
    paddingBottom: 20,
  },

  subheading: {
    fontWeight: 'bold',
  },
});