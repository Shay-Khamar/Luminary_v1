import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, AntDesign  } from '@expo/vector-icons';
import Exercise2Button from '../../Buttons/Exercise2Button';



import Exercise2DisplayBox from '../../Displays/Exercise2DisplayBox';

const Exercise2 = () => {
    const [randomItemsArray, setRandomItemsArray] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [buttonValues, setButtonValues] = useState([]);
    const [counter, setCounter] = useState(0);

    const data = {
        frog: {
            name: 'frog',
            icon: <FontAwesome5 name="frog" size={70} color="black" />,
        },
        car: {
            name: 'car',
            icon: <FontAwesome5 name="car-side" size={70} color="black" />
        },
        shoe: {
            name: 'shoe',
            icon: <MaterialCommunityIcons name="shoe-sneaker" size={70} color="black" />,
        },
        duck: {
            name: 'duck',
            icon: <MaterialCommunityIcons name="duck" size={70} color="black" />
        },
        heart: {
            name: 'heart',
            icon: <AntDesign name="heart" size={70} color="black" />
        },

        cloud: {
            name: 'cloud',
            icon: <FontAwesome name="cloud" size={70} color="black" />
        }
    };

    const keys = Object.keys(data);
    const getRandomItem = () => data[keys[Math.floor(Math.random() * keys.length)]];

    useEffect(() => {
        const newArray = Array.from({ length: 50 }, () => getRandomItem());
        setRandomItemsArray(newArray);
    }, []);

    useEffect(() => {
        if (randomItemsArray.length > 0) {
            shuffleButtons();
        }
    }, [randomItemsArray, currentIndex]);

    const currentItem = randomItemsArray[currentIndex] || {};

    const shuffleButtons = () => {
      const currentName = randomItemsArray[currentIndex].name;
      const uniqueKeys = new Set(keys); 
      uniqueKeys.delete(currentName); 

      const shuffled = Array.from(uniqueKeys)
          .sort(() => Math.random() - 0.5) 
          .slice(0, 5); 

      shuffled.push(currentName); 
      shuffled.sort(() => Math.random() - 0.5); 

      setButtonValues(shuffled);
  };

  const handlePress = (value) => {
    if (value === randomItemsArray[currentIndex].name) {
        setCounter((prevCounter) => {
            const newCounter = prevCounter + 1;
            if (newCounter >= randomItemsArray.length) {
                console.log("Exercise completed!");
            }
            return newCounter;
        });
        setCurrentIndex((prevIndex) => (prevIndex + 1) % randomItemsArray.length);
    } else {
        console.log("Incorrect choice, try again!");
    }
};




























    return (
        <View style={styles.container}>
            <Text>Exercise2</Text>
            <Text>Counter: {counter}</Text>
            {currentItem && <Exercise2DisplayBox icon={currentItem.icon} />}
            <View style={styles.buttonsContainer}>
                {buttonValues.map((value, index) => (
                    <Exercise2Button key={index} value={value} onPress={handlePress} />
                ))}
            </View>
        </View>
    );
}

export default Exercise2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
  },

  columnWrapper: {
    justifyContent: 'center',
},


});