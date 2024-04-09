import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import ReadingCarousel from '../../Displays/ExtractCarousel/ReadingCarousel'

const ReadingCatalogue = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.pageHeader}>What Would You Like To Read?</Text>
        <ReadingCarousel/>
    </View>
  )
}

export default ReadingCatalogue

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  pageHeader:{
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 30,
  }
})