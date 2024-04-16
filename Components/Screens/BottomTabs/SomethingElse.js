import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import ComprehensionWindow from '../../Displays/ComprehensionWindow';


const SomethingElse = () => {


  return (
    <View style={styles.container}>
    <ComprehensionWindow/>
    </View>
  )
}

export default SomethingElse

const styles = StyleSheet.create({

  container : {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

})