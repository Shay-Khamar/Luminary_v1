import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { ActivityIndicator, Portal, PaperProvider } from 'react-native-paper';
import TestButton from '../Buttons/TestButtons';
import ModalComponent from './ModalComponent';

import { uploadVideoAsync } from '../../firebaseConfig';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CameraScreen = () => {
  const [visible, setVisible] = useState(false);
  const [CameraPermission, setCameraPermission] = useState(null);
  const [MicrophonePermission, setMicrophonePermission] = useState(null);
  const [mediaPermission, setMediaPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const cameraRef = useRef(null);
  const [checked, setChecked] = useState(false);

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

  const handleUploadPress = async () => {
    setVisible(false);
    if (videoUri) {
      try {
        const uploadUrl = await uploadVideoAsync(videoUri);
        console.log('Uploaded video URL:', uploadUrl);
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    }
  };

  const handleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true);
      const options = { quality: '720p' };
      const recording = await cameraRef.current.recordAsync(options);
      setIsRecording(false);
      if (!recording.cancelled) {
        setVideoUri(recording.uri);
        showModal();
        console.log(visible);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(false);
      cameraRef.current.stopRecording();
    }
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
    <View style={styles.cameraContainer}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TestButton color={isRecording ? 'blue' : 'red'} onPress={handleRecording} />
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
    </View>
   </PaperProvider>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  cameraContainer: {
    overflow: 'hidden',
  },
  camera: {
    width: '100%',
    height: '100%',
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
