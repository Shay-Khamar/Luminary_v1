import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useResults } from '../../misc/ResultContext'


const ResultScreen = () => {

  const {exerciseData} = useResults();

  const renderRusults = () => {
    switch(exerciseData.exerciseType){
      case  'Exercise1':
        return (
          <View>
            <Text>WPM: {Math.floor(exerciseData.results.wpm)}</Text>
            <Text>Score:{exerciseData.results.score} / {exerciseData.results.tq}</Text>
          </View>
        )
  }
  }


  return (
    <View style={styles.container}>
      {renderRusults()}
    </View>
  )
}

export default ResultScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },

    placeholder : {
        fontSize: 100,
        fontWeight: '700',
        borderRadius: 10,
        borderColor: 'green',
        color: 'black',

    }
})