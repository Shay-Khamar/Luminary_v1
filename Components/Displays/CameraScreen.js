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

import { useNavigation } from '@react-navigation/native';


import { uploadVideoAsync } from '../../firebaseConfig';
import { set } from 'firebase/database';

const { width, height } = Dimensions.get('window');

const CameraScreen = () => {
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

 

  const { setVisible, visible,  startRecording, stopRecording, cameraRef, isRecording , handleUploadPress, toggleCameraMinimized  } = useRecording();


  const handleCalibrationComplete = async () => {
    setActive(false);  // Turn off calibration

    // Trigger recording after calibration
    shrinkAndMoveToCorner();
      setIsActive(true);
  };

  


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

const shrinkAndMoveToCorner = () => {
  scale.value = withSpring(0.15);
  nowMoveIt(); 
  runOnJS(setAllowInteraction)(true);
};

const nowMoveIt = () => {
  translateY.value = withSpring(height * 1.5);
  translateX.value = withSpring(-width * 4.6)
};
  navResultScreen = () => {
    navigation.navigate('ResultScreen');
  }

  const calibrationToggle = async () => {
    setActive(true); // This will show the CalibrationScreen when button is pressed

    if (!isRecording) {
      await startRecording();
      // Do not shrink or start timer here
    }
  };





  


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


  /*
  if (CameraPermission === null || MicrophonePermission === null) {
    return <ActivityIndicator animating={true} color="#000" />;
  }

  const handleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      shrinkAndMoveToCorner();
      setIsActive(true);
      
    }
  };
  */

  const randomfunction = async () => {
    handleUploadPress();
    await navResultScreen();
  }

  const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
    <Animated.View style={[styles.cameraContainer, animatedStyle]}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={[styles.buttonContainer, { display: isRecording ? "none" : undefined }]}>
          <TestButton color={isRecording ? 'blue' : 'red'} onPress={calibrationToggle}/>
        </View>
      </Camera>
          
          <Portal>

           <ModalComponent
           visible={visible}
           /**
            * This solution to the navResultScreen function is not ideal, but it works for now.
            */
           hideModal={hideModal && navResultScreen}
           onUploadPress={randomfunction}
           isChecked={checked}
           toggleCheckbox={() => setChecked(!checked)}
             text="Would you like to upload this video?"
           />
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
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingRight: 10,
    zIndex: 10,
  },

});
