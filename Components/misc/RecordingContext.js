
/**
 * @file Provides the RecordingContext and RecordingProvider components for managing recording functionality.
 */

import React, { createContext, useContext, useState, useRef } from 'react';
import { uploadVideoAsync } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

/**
 * Context object for accessing recording functionality.
 * @type {React.Context}
 */
const RecordingContext = createContext();

/**
 * Hook for accessing the recording context.
 * @returns {Object} The recording context object.
 */
export const useRecording = () => useContext(RecordingContext);

/**
 * Provider component for managing recording functionality.
 * @param {Object} props - The component props.
 * @returns {JSX.Element} The RecordingProvider component.
 */
export const RecordingProvider = ({ children,}) => {
    const [visible, setVisible] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [videoUri, setVideoUri] = useState(null);
    const cameraRef = useRef(null);
    const [cameraMinimized, setCameraMinimized] = useState(false);
    const [uploadDecisionCallback, setUploadDecisionCallback] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadFinished, setUploadFinished] = useState(false);



    /**
     * Toggles the camera minimized state.
     * @param {boolean} cameraMinimized - The new camera minimized state.
     */
    const toggleCameraMinimized = (cameraMinimized) => {
      setCameraMinimized(cameraMinimized);
    };

    /**
     * Registers a callback function for upload decision.
     * @param {Function} callback - The callback function.
     */
    const registerUploadDecisionCallback = (callback) => {
      setUploadDecisionCallback(() => callback);
    };

    /**
     * Navigates to the result screen.
     */
   

    /**
     * Starts the video recording.
     */
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

    /**
     * Stops the video recording.
     */
    const stopRecording = async () => {
        if (cameraRef.current) {
          setIsRecording(false);
          cameraRef.current.stopRecording();
        }
    };

    /**
     * Handles the upload button press.
     * @param {boolean} shouldUpload - Indicates whether the video should be uploaded.
     */
    const handleUploadPress = async (shouldUpload) => {
      hideModal();
      if (shouldUpload && videoUri) {
        setIsUploading(true); // Start uploading indicator
    
        try {
          const uploadUrl = await uploadVideoAsync(videoUri);
          console.log('Uploaded video URL:', uploadUrl);
        } catch (error) {
          console.error('Error uploading video:', error);
        } finally {
          setIsUploading(false); // Stop uploading indicator regardless of success or failure
          setUploadFinished(true); // Indicate that upload is finished
        }
      }
    };
    /**
     * Shows the modal.
     */
    const showModal = () => setVisible(true);

    /**
     * Hides the modal.
     */
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
          isUploading,
          uploadFinished, 
          setUploadFinished
      }}>
          {children}
      </RecordingContext.Provider>
    );
};