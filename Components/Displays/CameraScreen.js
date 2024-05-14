
/**
 * @file CameraScreen.js
 * @description A screen component that displays the camera view and handles video recording and calibration.
 * @module Components/Displays/CameraScreen
 */

import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { ActivityIndicator, Portal, PaperProvider } from 'react-native-paper';
import TestButton from '../Buttons/TestButtons';
import ModalComponent from './ModalComponent';
import { useRecording } from '../misc/RecordingContext';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import { useTimer } from '../misc/TimerContext';
import CalibrationScreen from './CalibrationScreen';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { ThemedButton } from 'react-native-really-awesome-button';


import { uploadVideoAsync } from '../../firebaseConfig';
import { set } from 'firebase/database';
import colours from '../../colours';

const { width, height } = Dimensions.get('window');

/**
 * A screen component that displays the camera view and handles video recording and calibration.
 * @returns {JSX.Element} The CameraScreen component.
 */
const CameraScreen = () => {
  // State variables
  const [CameraPermission, setCameraPermission] = useState(null);
  const [MicrophonePermission, setMicrophonePermission] = useState(null);
  const [mediaPermission, setMediaPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [videoUri, setVideoUri] = useState(null);
  const [checked, setChecked] = useState(false);
  const { time, setTime,  setIsActive } = useTimer();
  const navigation = useNavigation();
  const [allowInteraction, setAllowInteraction] = useState(true); 
  const [active, setActive] = useState(false);

  // Custom hooks
  const { setVisible, visible,  startRecording, stopRecording, cameraRef, isRecording , handleUploadPress, toggleCameraMinimized, hideModal,isUploading, uploadFinished, setUploadFinished} = useRecording();

  // Animated values and styles
  const scale = useSharedValue(1); // Start with the original size
  const translateY = useSharedValue(0); // Start at original vertical position
  const translateX = useSharedValue(0); // Start at original horizontal position

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
        { translateX: translateX.value }
      ],
      position: 'absolute',
      bottom: 0,
      left: 0,
      pointerEvents: allowInteraction ? 'auto' : 'none',
    };
  });

  /**
   * Shrinks the camera view and moves it to the corner of the screen.
   */
  const shrinkAndMoveToCorner = () => {
    scale.value = withSpring(0.15);
    nowMoveIt(); 
    runOnJS(setAllowInteraction)(true);
  };

  /**
   * Moves the camera view to the corner of the screen.
   */
  const nowMoveIt = () => {
    translateY.value = withSpring(height * 1.5);
    translateX.value = withSpring(-width * 4.6)
  };

  /**
   * Navigates to the ResultScreen.
   */
  const navResultScreen = () => {
    navigation.navigate('ResultScreen');
  };

  /**
   * Hides the modal and navigates to the ResultScreen.
   */
  const hideModalAndNavigate = () => {
    hideModal(); // This should just set 'visible' to false
    navResultScreen(); // Ensure this function navigates to the result screen
  };

  /**
   * Handles the completion of the calibration process.
   */
  const handleCalibrationComplete = async () => {
    setActive(false);  // Turn off calibration

    // Trigger recording after calibration
    shrinkAndMoveToCorner();
    setIsActive(true);
  };

  /**
   * Toggles the calibration process.
   */
  const calibrationToggle = async () => {
    setActive(true); // This will show the CalibrationScreen when button is pressed

    if (!isRecording) {
      await startRecording();
      // Do not shrink or start timer here
    }
  };

  /**
   * Requests camera, microphone, and media permissions on component mount.
   */
  useEffect(() => {
    const requestPermissions = async () => {
      if (!CameraPermission) {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setCameraPermission(status === 'granted');
      }

      if (!MicrophonePermission) {
        const { status } = await Camera.requestMicrophonePermissionsAsync();
        setMicrophonePermission(status === 'granted');
      }

      if (!mediaPermission) {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        setMediaPermission(status === 'granted');
      }
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    if (uploadFinished) {
        setTimeout(() => {
            navResultScreen();
        }, 500);
        setUploadFinished(false); // Reset the state
    }
}, [uploadFinished]);

  return (
    <PaperProvider>
      <Animated.View style={[styles.cameraContainer, animatedStyle]}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <TouchableOpacity
            style={[styles.backButton,{ display: isRecording ? "none" : undefined }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={40} color="white" />
          </TouchableOpacity>
          <View style={[styles.buttonContainer, { display: isRecording ? "none" : undefined }]}>
            <ThemedButton name="bruce" onPressIn={calibrationToggle} width={250} height={115}  type="secondary" textSize={40} borderRadius={25} backgroundColor={colours.accent} textColor={colours.text}>Begin Calibration</ThemedButton>
          </View>
        </Camera>
          
        <Portal>
          <ModalComponent
            visible={visible}
            hideModal={hideModalAndNavigate}  
            onUploadPress={() => handleUploadPress(checked)} // Pass 'checked' state or similar if you need to know the upload decision
            isChecked={checked}
            toggleCheckbox={() => setChecked(!checked)}
            text="Would you like to upload this video?"
          />

          {isUploading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="40%" color={colours.accent} />
                <View style={styles.box}>
                  <Text style={styles.text}>Please wait, uploading...</Text>
                  </View>
              </View>
              )}
        </Portal>

        {active && (
          <CalibrationScreen calibrationActive={active} onCalibrationComplete={handleCalibrationComplete} />
        )}

      </Animated.View>
    </PaperProvider>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  camera: {
    flex  : 1,
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 40, // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 11,  // ensure it's on top
  },

  loadingContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100, // Make sure it covers other elements
  },

  box: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: colours.accent, // Slightly lighter dark background for the box
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  text: {
    fontSize: 20, // Larger text size for better visibility
    color: colours.text, // White text color
  },

  
});
