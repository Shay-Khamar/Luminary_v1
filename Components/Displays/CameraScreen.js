import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { ActivityIndicator, Portal, PaperProvider } from 'react-native-paper';
import TestButton from '../Buttons/TestButtons';
import ModalComponent from './ModalComponent';
import { useRecording } from '../misc/RecordingContext';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';



import { uploadVideoAsync } from '../../firebaseConfig';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CameraScreen = () => {
  //const [visible, setVisible] = useState(false);
  const [CameraPermission, setCameraPermission] = useState(null);
  const [MicrophonePermission, setMicrophonePermission] = useState(null);
  const [mediaPermission, setMediaPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  //const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  //const cameraRef = useRef(null);
  const [checked, setChecked] = useState(false);

  const { setVisible, visible,  startRecording, stopRecording, cameraRef, isRecording , handleUploadPress, toggleCameraMinimized  } = useRecording();


  const width = useSharedValue('100%');
  const height = useSharedValue('100%');
  const bottom = useSharedValue(0);
  const left = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      position: 'absolute',
      bottom: bottom.value,
      left: left.value,
    };
  });


  const shrinkAndMoveToCorner = () => {
    width.value = withSpring('15%');
    height.value = withSpring('20%');
    bottom.value = withSpring(20); // Adjust as needed
    left.value = withSpring(20); // Adjust as needed
    toggleCameraMinimized(true);
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



  if (CameraPermission === null || MicrophonePermission === null) {
    return <ActivityIndicator animating={true} color="#000" />;
  }

  const handleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
      shrinkAndMoveToCorner();

    }
  };

  const hideModal = () => setVisible(false);


 



  



  return (
    <PaperProvider>
    <Animated.View style={[styles.cameraContainer, animatedStyle]}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={[styles.buttonContainer, { display: isRecording ? "none" : undefined }]}>
          <TestButton color={isRecording ? 'blue' : 'red'} onPress={handleRecording}/>
        </View>
      </Camera>
          
          <Portal>

           <ModalComponent
           visible={visible}
           hideModal={hideModal}
           onUploadPress={handleUploadPress}
           isChecked={checked}
           toggleCheckbox={() => setChecked(!checked)}
             text="Would you like to upload this video?"
           />
           </Portal>
    </Animated.View>
   </PaperProvider>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    borderRadius: 20,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
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
