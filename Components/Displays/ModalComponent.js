import React from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import { Modal, Portal, Text, Button, PaperProvider, Checkbox } from 'react-native-paper';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { ThemedButton } from 'react-native-really-awesome-button';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**
 * A modal component designed to confirm user actions and toggle settings.
 * Features a checkbox to confirm understanding and themed buttons to manage actions.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.visible - Controls the visibility of the modal.
 * @param {Function} props.hideModal - Callback to hide the modal.
 * @param {Function} props.onUploadPress - Callback triggered when the upload button is pressed.
 * @param {boolean} props.isChecked - State indicating whether the checkbox is checked.
 * @param {Function} props.toggleCheckbox - Function to toggle the checkbox state.
 * @param {Object} props.contentContainerStyle - Styling for the modal's container.
 * @param {string} props.text - Text displayed within the modal.
 */
const ModalComponent = ({ visible, hideModal, onUploadPress, isChecked, toggleCheckbox, contentContainerStyle = styles.modalContainer, text }) => {
  return (
    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={contentContainerStyle}>
       <View style={styles.centeredView}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>{text}</Text>
        <View style={styles.buttonRow}>
        <ThemedButton name="bruce" type="primary" width={100} onPressOut={isChecked ? onUploadPress : undefined} backgroundColor={"#000"} style={[styles.button, { opacity: isChecked ? 1 : 0.5 }]} >Upload</ThemedButton>
        <ThemedButton name="bruce" type="primary" style={styles.button} width={100} onPressOut={hideModal} backgroundColor={"#000"}>Cancel
        </ThemedButton>
        </View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={toggleCheckbox}
          />
          <Text style={styles.checkboxText}>Do you understand?</Text>
        </View>
      </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white', 
    padding: 20,
    margin: '20%',
  },
  modalContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',  
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 8,
  },
});