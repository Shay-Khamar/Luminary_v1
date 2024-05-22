import { StyleSheet, Text, ScrollView, View, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { FontProvider } from '../../misc/FontContext';
import CustomText from '../../misc/CustomText';
import FontDropDown from '../../Displays/FontDropDown';
import { Dialog, Portal } from 'react-native-paper';
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
import colours from '../../../colours';

/** This object is created to avoid having this text inline much cleaner to look at and change */

const TextContent = {
  intro: " The Goal is to Read the Extract Aloud, then Answer the Comprehension Questions.",
  story: " You are able to change the font to your liking. This can help you read more comfortably and effectively. We want to make sure you have the best experience possible.",
  customization: "The Timer at the Top of the screen can be hidden or shown by tapping it ",
  gratitude: "You can choose to opt out of uploading the recording of your reading at the end of the exercise. We respect your privacy and your choices."
};

const Exercise1 = () => {
  const { cameraMinimized, stopRecording, visible, modalVisible, setModalVisible, showModal, hideModal } = useRecording();
  const [uploadDecisionMade, setUploadDecisionMade] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigation = useNavigation();
  const { time, setTime, setIsActive } = useTimer();
  const [counter, setCounter] = useState(0);
  const { updateExerciseData } = useResults();
  const [index, setIndex] = useState(0); // Starting index from 0
  const [wpm, setWpm] = useState(0);
  const [resultsRendered, setResultsRendered] = useState(false);
  const [timerVisible, setTimerVisible] = useState(true);

  // Retrieves routing information, specifically parameters passed to the component.
  const route = useRoute();
  // Extracts the 'Extract' object from route parameters, containing the exercise data.
  const item = route.params?.Extract;

  /**
   * Splits the content of the 'Extract' into paragraphs for display purposes,
   * breaking the content at double line breaks.
   */
  const paragraphs = item?.content.split('\n\n');

  /**
   * Counts the total number of words in the 'Extract' content by splitting the string
   * at spaces and measuring the length of the resulting array.
   */
  const wordCount = item?.content.split(' ').length;

  /**
   * Retrieves the total number of comprehension questions associated with the 'Extract',
   * which are used to construct the quiz portion of the exercise.
   */
  const totalQuestions = item?.comprehensionQuestions.length;

  /**
   * Determines whether the quiz is completed by comparing the current question index
   * with the total number of questions.
   */
  const isQuizCompleted = index >= totalQuestions;

  /**
   * Resets the timer by stopping it and setting the time back to zero.
   */
  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
  };

  /**
   * Navigates to the 'ResultScreen' using the navigation hook from react-navigation.
   */
  const navResultScreen = () => {
    navigation.navigate('ResultScreen');
  };

  /**
   * Completes the current exercise, hides content, calculates words per minute,
   * resets the timer, and updates the WPM state.
   */
  const finishFunction = () => {
    setShowContent(false);
    const timeInMinutes = time / 60;
    const wordsPerMinute = wordCount / timeInMinutes;
    setWpm(wordsPerMinute);
    resetTimer();
  };

  /**
   * Handles the event when a user selects the correct answer by incrementing the counter.
   */
  const onCorrectAnswer = () => {
    setCounter(prevCounter => prevCounter + 1);
    checkQuizCompletion();
  };

  /**
   * Handles any guess (correct or incorrect) by the user and checks if the quiz is completed.
   */
  const onHandleGuess = () => {
    checkQuizCompletion();
  };

  /**
   * Checks if the quiz is completed and logs a message or moves to the next question.
   */
  const checkQuizCompletion = () => {
    if (isQuizCompleted) {
      console.log('Quiz completed');
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  };

  /**
   * Shows the dialog by setting its visibility state to true.
   */
  const showDialog = () => setDialogVisible(true);

  /**
   * Hides the dialog by setting its visibility state to false.
   */
  const hideDialog = () => setDialogVisible(false);

  /**
   * Watches for the completion of the quiz and triggers modal display, stops recording, and handles the rendering of results.
   */
  useEffect(() => {
    showDialog();
  }, []);

  useEffect(() => {
    if (isQuizCompleted) {
      showModal();
      stopRecording();
      renderResults();
    }
  }, [isQuizCompleted]);

  /**
   * Gathers and updates the exercise data such as score, words per minute, and total questions,
   * and sends it to the appropriate handler (likely a state management or API call).
   */
  const renderResults = () => {
    updateExerciseData('Exercise1', {
      score: counter,
      wpm: wpm,
      tq: totalQuestions,
    });
  };

  /**
   * Reads aloud a concatenation of all text pieces defined in the TextContent object,
   * using specified language, pitch, and rate settings.
   */
  const readTextAloud = () => {
    const allText = Object.values(TextContent).join(" ");
    Speech.speak(allText, {
      language: 'en',
      pitch: 1.0,
      rate: 0.65,
    });
  };

  /**
   * Defines the style for the camera screen container, setting its position,
   * dimensions, and pointer event handling based on whether the camera is minimized.
   */
  const cameraScreenContainerStyle = {
    position: 'absolute', // Position the camera screen absolutely
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    pointerEvents: cameraMinimized ? 'auto' : 'box-none',
  };

  return (
    <>
      <DialogBoxComponent visible={dialogVisible} onDismiss={hideDialog} Title={'Just Before Start'}>
        <TouchableOpacity onPress={readTextAloud}>
          <FontAwesome name="volume-up" size={24} color={colours.accent} />
        </TouchableOpacity>
        <Text style={styles.DialogText}>
          <Text style={styles.subheading}>Reading Task:</Text>{TextContent.intro}
        </Text>
        <Text style={styles.DialogText}>
          <Text style={styles.subheading}>Accessibility Features:</Text>{TextContent.story}
        </Text>
        <Text style={styles.DialogText}>
          <Text style={styles.subheading}>Timer:</Text>{TextContent.customization}
        </Text>
        <Text style={styles.DialogText}>
          <Text style={styles.subheading}>The Recording</Text>{TextContent.gratitude}
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
                {timerVisible && (
                  <>
                    <Text style={styles.timerLabel}>Time:</Text>
                    <Text style={styles.timerValue}>{time}</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.dropdownContainer}>
              <FontDropDown />
            </View>
          </View>
          <View style={styles.centeredBoxContainer}>
            {showContent && (
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
            <View style={{ flex: 1 }}></View>
            {showContent && (
              <ThemedButton name="bruce" onPressIn={finishFunction} width={250} height={115} type="secondary" textSize={40} borderRadius={25} backgroundColor={colours.accent}>Finish</ThemedButton>
            )}
          </View>
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
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colours.background,
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
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
    padding: 20,
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
    fontSize: 30,
    marginBottom: 10,
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
    paddingTop: 20,
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
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  timerLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  timerValue: {
    fontSize: 25,
    color: colours.accent,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    position: 'absolute',
    width: '10%',
    zIndex: 1000,
    top: '50%',
    right: '1%',
    alignItems: 'flex-end',
  },
});
