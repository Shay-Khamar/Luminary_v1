import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';

const DialogBoxComponent = ({ visible, onDismiss, children, Title }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.DialogBox}>
        <Dialog.Title style={styles.Title}>{Title}</Dialog.Title>
        <Dialog.ScrollArea>
          {/* Adjusting the ScrollArea to not enforce Text style on children */}
          <ScrollView contentContainerStyle={styles.content}>
            {/* Directly render children which can now be any React component, including View */}
            {children}
          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  DialogBox: {
    width: '40%', // Adjusted for mobile screen
    maxHeight: '80%', // Adjusted to manage dialog size
  },
  Title: {
    fontSize: 20, // Adjust as needed
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24, // Ensures padding at the bottom
  },
});

export default DialogBoxComponent;