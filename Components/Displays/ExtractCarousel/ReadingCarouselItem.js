import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colours from "../../../colours";

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

/**
 * A component for rendering an item in a reading carousel.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.item - The data for the reading item to display.
 * @param {number} props.index - The index of the current item in the carousel.
 * @param {Object} props.navigation - The navigation prop passed from the parent component for navigation handling.
 */
const ReadingCarouselItem = ({ item, index, navigation }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // Log window dimensions on mount and when dimensions change
  useEffect(() => {
    console.log("Width: " + windowWidth);
    console.log("Height: " + windowHeight);
  }, [windowWidth, windowHeight]);

  return (
    <TouchableOpacity 
      style={styles.container} 
      key={index}  
      onPress={() => navigation.navigate('Exercise1', { Extract: item })}
    >
      <Text style={styles.header}>{item.title}</Text>
      <View style={styles.something}>
        <View style={styles.difficulty}>
          <FontAwesome5 name="mountain" size={24} color={colours.primary} />
          <Text style={styles.somethingText}>{item.difficultyLevel}</Text>
        </View>
        <View style={styles.genre}>
          <FontAwesome name="book" size={24} color={colours.primary} />
          <Text style={styles.somethingText}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default ReadingCarouselItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.background,
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
    textAlign: 'center',
    paddingTop: 10,
    color: colours.text,
    fontWeight: 'bold',
    fontSize: 70,
  },

  something: {
    fontWeight: 'bold',
    zIndex: 100,
    padding: 10,
    paddingHorizontal: '6%',
    opacity: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  somethingText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: colours.text,
  },

  difficulty: {
    padding: 5,
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },

  genre: {
    alignItems: 'center',
    flexDirection: 'column',
  }
});