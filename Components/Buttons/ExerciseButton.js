import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ExerciseButton = ({onPress, Title}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
      <Text style={styles.text}>{Title}</Text>
      </View>

    </TouchableOpacity>

      
  )
}

export default ExerciseButton

const styles = StyleSheet.create({

    container : {
        width: 200,
        height: 300,
        borderRadius: 20,
        backgroundColor: '#C0C0C0',
        borderWidth: 3,
        borderBottomWidth: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: 'black',
        margin: 10,
    },

    text :{
      fontSize: 30,
      fontWeight: '700',
      textTransform: 'uppercase',

    },

    header : {
      alignSelf: 'center',
    }


})