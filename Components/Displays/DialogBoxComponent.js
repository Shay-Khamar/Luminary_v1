import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import colours from '../../colours';

/**
 * A dialog box component that renders a modal dialog with a title and customizable content.
 * The content can include any React components encapsulated within a scrollable area.
 *
 * @param {Object} props - The props passed to the component.
 * @param {boolean} props.visible - Controls the visibility of the dialog.
 * @param {Function} props.onDismiss - Callback function that is called when the dialog is dismissed.
 * @param {React.ReactNode} props.children - The content to be displayed within the dialog.
 * @param {string} props.Title - The title text to display at the top of the dialog.
 */
const DialogBoxComponent = ({ visible, onDismiss, children, Title }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.DialogBox}>
        <Dialog.Title style={styles.Title}>{Title}</Dialog.Title>
        <Dialog.ScrollArea>
          {/* The ScrollView allows for scrolling through the content if it exceeds the viewable area */}
          <ScrollView contentContainerStyle={styles.content}>
            {children}
          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  DialogBox: {
    width: '40%', 
    maxHeight: '80%',
    backgroundColor: colours.background, 
  },
  Title: {
    fontSize: 20, 
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: colours.primary,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24, 
  },
});

export default DialogBoxComponent;
