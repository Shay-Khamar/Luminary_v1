import React, { createContext, useContext, useState, useRef } from 'react';
import { uploadVideoAsync } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const RecordingContext = createContext();

export const useRecording = () => useContext(RecordingContext);



export const RecordingProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [videoUri, setVideoUri] = useState(null);
    const cameraRef = useRef(null);
    const [cameraMinimized, setCameraMinimized] = useState(false);
    const [uploadDecisionCallback, setUploadDecisionCallback] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);


    const toggleCameraMinimized = (cameraMinimized) => {
      setCameraMinimized(cameraMinimized);
    };

    const registerUploadDecisionCallback = (callback) => {
      setUploadDecisionCallback(() => callback);
  };

  navResultScreen = () => {
    navigation.navigate('ResultScreen');
  }


    const startRecording = async () => {
        if (cameraRef.current) {
          setIsRecording(true);
          const options = { quality: '720p' };
          const recording = await cameraRef.current.recordAsync(options);
          setIsRecording(false);
          if (!recording.cancelled) {
            setVideoUri(recording.uri);
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

    
    const handleUploadPress = async (shouldUpload) => {
      hideModal(); // Always hide the modal after the decision
      if (shouldUpload && videoUri) {
        try {
          const uploadUrl = await uploadVideoAsync(videoUri);
          console.log('Uploaded video URL:', uploadUrl);
        } catch (error) {
          console.error('Error uploading video:', error);
        }
      }
      // Navigation should be a distinct step, possibly called after a brief delay or as a callback
      setTimeout(() => {
        navResultScreen();
      }, 500); // Delay to allow for state updates or UI effects
    };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);




  return (
    <RecordingContext.Provider value={{ 
        startRecording, 
        stopRecording, 
        handleUploadPress, 
        setVisible, 
        visible, 
        cameraRef, 
        isRecording,
        toggleCameraMinimized,
        cameraMinimized,
        setCameraMinimized,
        registerUploadDecisionCallback,
        showModal,
        hideModal,

    }}>
        {children}
    </RecordingContext.Provider>
  );


};