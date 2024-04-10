import { View, Text, StyleSheet, Dimensions,TouchableOpacity} from "react-native"
import { useNavigation } from '@react-navigation/native';
import React, {useContext} from 'react'


export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)



const ReadingCarouselItem = ({item, index, navigation}) => {
 

  return (
    <TouchableOpacity style={styles.container} key={index}  onPress={() => navigation.navigate('Exercise1', { Extract: item })} >
      <Text style={styles.header}>{item.title}</Text>
      <View style={styles.something}>
      <Text>{item.difficultyLevel}</Text>
      <Text style={styles.somethingText}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  )
};

export default ReadingCarouselItem

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    height: '50%',
    paddingBottom: 5,
    shadowColor: "#002",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    flexDirection: 'column',
  },

  header: {
    flex: 1,
    paddingTop: 10,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 70,
  },

  something: {
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,1)',
    zIndex: 100,
    padding: 10,
    opacity: 0.7,
  },

  somethingText:{
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
  }
})