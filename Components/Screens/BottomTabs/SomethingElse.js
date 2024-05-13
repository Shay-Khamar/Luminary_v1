import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import colours from '../../../colours';

const SomethingElse = () => {
  const contactEmail = "s5414643@bournemouth.ac.uk"; 

  const handleEmailPress = () => {
    const url = `mailto:${contactEmail}?subject=Concerning My Data&body=Hi, I would like to discuss...`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Luminary</Text>
      <Text style={styles.description}>
        This application is designed to help users engage in various cognitive exercises. 
        It tracks performance over time and provides valuable feedback to improve cognitive skills.
      </Text>

      <Text style={styles.description}>
        If you have any concerns about your data or how it is being used, 
        or if you wish to inquire about any specific details, please contact us at the email address provided below.
      </Text>

      <TouchableOpacity style={styles.randomButton} onPress={handleEmailPress}>
        <Text style={styles.buttonText}>Contact Us: {contactEmail}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SomethingElse;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    padding: 20, // Added padding for overall padding
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  randomButton: {
    backgroundColor: 'rgb(52, 152, 219)',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});