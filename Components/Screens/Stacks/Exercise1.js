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
import ComprehensionWindow from '../../Displays/ComprehensionWindow';
import { ThemedButton } from "react-native-really-awesome-button";
import { useTimer } from '../../misc/TimerContext';
import { useResults } from '../../misc/ResultContext';


import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';




const TextContent = {
  intro: " Notice a small recording indicator at the bottom left of your screen? It's there because we're gathering insights to make experiences like yours even better. Not comfortable with sharing? No worries, feel free to opt out anytime.",
  story: " We encourage you to read through the extract fully. There's a world within these words, and at the end, we have some questions to help us explore your thoughts and insights together.",
  customization: " Your comfort is our priority. Feel free to adjust the font to your liking from the dropdown menu in the top right. Finding what works best for you can make all the difference.",
  gratitude: " We can't thank you enough for joining us and participating. Your involvement is a huge support to our research and helps us create more inclusive and empowering reading environments."
};

const Exercise1 = () => {
  const { cameraMinimized, stopRecording, visible, modalVisible, setModalVisible, showModal, hideModal} = useRecording();
  const [uploadDecisionMade, setUploadDecisionMade] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigation = useNavigation();
  const {time, setTime, setIsActive} = useTimer();
  const [counter, setCounter] = useState(0);
  const {updateExerciseData} = useResults();
  const [index, setIndex] = useState(1);
  const [wpm, setWpm] = useState(0);
  const [resultsRendered, setResultsRendered] = useState(false);
  const [timerVisible, setTimerVisible] = useState(true);

  

  const route = useRoute();
  const item = route.params?.Extract;


  const paragraphs = item?.content.split('\n\n');

  const wordCount = item?.content.split(' ').length;

  const totalQuestions = item?.comprehensionQuestions.length;

  const isQuizCompleted = index === totalQuestions - 1;

  const resetTimer = () => {
    setIsActive(false);
    setTime(0);

  }

  navResultScreen = () => {
    navigation.navigate('ResultScreen');
  }

  const finishFunction = () => {
    setShowContent(false);
    timeInMintues = time / 60;
    wordsPerMinute = wordCount / timeInMintues;
    setWpm(wordsPerMinute);
    resetTimer();
};

const onCorrectAnswer = () => {
  setCounter(prevCounter => prevCounter + 1);
  setIndex(prevIndex => {
      const newIndex = prevIndex + 1;
      if (newIndex >= totalQuestions) { 
          checkQuizCompletion(); 
      }
      return newIndex;
  });
};

  const onHandleGuess = () => {
    checkQuizCompletion();
  };

  
  const checkQuizCompletion = () => {
    if (isQuizCompleted) {
      console.log('Something happens here');
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  };

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  useEffect(() => {
     
    showDialog()
  }, []);

  useEffect(() => {
    //Gonna need an if statement to check the state of the visivibility of the camera Screen, probably don't want it showing until after the calibration 
    if(isQuizCompleted){
      showModal();
      stopRecording();
      renderRusults();
    }
  }, [isQuizCompleted]);

  

  


  
  const renderRusults = () => {
    updateExerciseData('Exercise1', {
      score: counter,
      wpm: wpm,
      tq: totalQuestions,
    });
  };



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
      zIndex: 10, 
      pointerEvents: cameraMinimized ? 'auto' : 'box-none', 
  }

 


  return (
    <>
    <DialogBoxComponent visible={dialogVisible} onDismiss={hideDialog} Title={'Just Before Start'}>
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
      <Text style={styles.title}>{item?.title}</Text>
      <View style={styles.timerWrapper}>
      <TouchableOpacity
      style={styles.timerContainer}
      onPress={() => setTimerVisible(!timerVisible)}
      >
        {timerVisible &&(
          <>
        <Text style={styles.timerLabel}>Time:</Text>
      <Text style={styles.timerValue}>{time}</Text>
      </>
      )}

      </TouchableOpacity>
      </View>
      
      <FontDropDown />
      </View>
      <View style={styles.centeredBoxContainer}>
        { showContent && (
      <View style={styles.boxContainer}>
      
    <ScrollView contentContainerStyle={styles.extractContainer} fadingEdgeLength={2} scrollEnabled={true}>
      {paragraphs.map((paragraph, index) => (
        <CustomText key={index} style={styles.paragraph}>
          {paragraph}
        </CustomText>
      ))}
    </ScrollView>
    </View>
    )}
    {!showContent && (
    <ComprehensionWindow item={item} onCorrectAnswer={onCorrectAnswer} onHandleGuess={onHandleGuess} />
    )}
    <View style={{flex: 1}}></View>
    {showContent && (
    <ThemedButton name="bruce" onPressIn={finishFunction} width={250} height={115}  type="secondary" textSize={40} borderRadius={25}>Finish</ThemedButton>
    )}
    </View>
    </View>
    </FontProvider>

    <View style={cameraScreenContainerStyle}>
    <CameraScreen/>
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
    backgroundColor: '#cfcfdb'
  },

  timerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },



  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
    justifyContent: 'space-between',
    marginTop: 10,
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
    borderWidth: 3,
    borderColor: '#000000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
    borderRadius: 35,
},

  centeredBoxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,

  },

  DialogText: {
    fontSize: 20,
    padding: 10,
    paddingBottom: 20,
  },

  subheading: {
    fontWeight: 'bold',
  },

  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    borderRadius: 40, // Half of width and height for circle
    width: 80,
    height: 80,
},

  timerLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey'
  },
  timerValue: {
    fontSize: 25,
    color: 'grey',
    fontWeight: 'bold'
  },






});