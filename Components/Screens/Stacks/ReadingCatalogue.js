import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import ReadingCarousel from '../../Displays/ExtractCarousel/ReadingCarousel'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { startAfter } from 'firebase/database';
import colours from '../../../colours';

const ReadingCatalogue = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backButton}>
        <TouchableOpacity
                onPress={handleBackPress}
            >
              <Ionicons name="arrow-back" size={50} color={colours.accent} />
            </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.pageHeader}>What Would You Like To Read?</Text>
        <ReadingCarousel/>
    </View>
  )
}

export default ReadingCatalogue

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
  pageHeader: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
  },
})