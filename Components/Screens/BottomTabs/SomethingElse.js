import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';


const SomethingElse = () => {


  return (
    <View style={styles.container}>      
    </View>
  )
}

export default SomethingElse

const styles = StyleSheet.create({

  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  DialogText: {
    fontSize: 20,
    padding: 10,
    paddingBottom: 20,
  },

  subheading: {
    fontWeight: 'bold',
  }
})