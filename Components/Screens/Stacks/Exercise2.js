import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons, AntDesign  } from '@expo/vector-icons';
import Exercise2Button from '../../Buttons/Exercise2Button';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { useResults } from '../../misc/ResultContext';
import {useTimer} from '../../misc/TimerContext';
import colours from '../../../colours';



import Exercise2DisplayBox from '../../Displays/Exercise2DisplayBox';
import { average } from 'firebase/firestore';

const Exercise2 = () => {
    const [randomItemsArray, setRandomItemsArray] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [buttonValues, setButtonValues] = useState([]);
    const [counter, setCounter] = useState(0);
    const [reactionTimes, setReactionTimes] = useState([]);
    const [startTime, setStartTime] = useState(Date.now());
    const [errors, setErrors] = useState(0);
    const {updateExerciseData} = useResults();
    const [finalRate, setFinalRate] = useState(null);
    const [finalAverageTime, setFinalAverageTime] = useState(null);
    const [finalErrors, setFinalErrors] = useState(null);
    const [exerciseStarted, setExerciseStarted] = useState(false);
    const [showModal, setShowModal] = useState(true);

    const navigation = useNavigation();

    navResultScreen = () => {
        navigation.navigate('ResultScreen');
      }
    

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
        setStartTime(Date.now());  
    }, []);

    useEffect(() => {
        if (randomItemsArray.length > 0) {
            shuffleButtons();
            setStartTime(Date.now());
        }
    }, [randomItemsArray, currentIndex]);

    useEffect(() => {
        if (finalRate !== null && finalAverageTime !== null && finalErrors !== null) {
            renderResults(finalRate, finalAverageTime, finalErrors);
        }
    }, [finalRate, finalAverageTime, finalErrors]);

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

  const playSound = async (correct) => {
    const sound = correct
        ? require('../../../assets/sounds/blop1.mp3')
        : require('../../../assets/sounds/miss.mp3');
    const { sound: soundObject } = await Audio.Sound.createAsync(sound);

    try {
        await soundObject.playAsync();
        // Wait until the sound is finished playing
        await soundObject.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
                soundObject.unloadAsync();
            }
        });
    } catch (error) {
        console.error("Error playing sound:", error);
    }
};

const handlePress = async (value) => {
    const reactionTime = Date.now() - startTime;
    if (value === randomItemsArray[currentIndex].name) {
        setReactionTimes([...reactionTimes, reactionTime]);
        setCounter((prevCounter) => {
            const newCounter = prevCounter + 1;
            if (newCounter >= randomItemsArray.length) {
                const totalTime = reactionTimes.reduce((a, b) => a + b, 0) / 1000; // In seconds
                const averageTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
                const rate = randomItemsArray.length / totalTime;
                console.log(`Exercise completed! Rate: ${rate.toFixed(2)} items/sec, Average reaction time: ${averageTime.toFixed(2)} ms, Errors: ${errors}`);
                setFinalRate(rate);
                setFinalAverageTime(averageTime);
                setFinalErrors(errors);
            }
            return newCounter;
        });
        setCurrentIndex((prevIndex) => (prevIndex + 1) % randomItemsArray.length);
        await playSound(true);
    } else {
        console.log("Incorrect choice, try again!");
        setErrors((prevErrors) => prevErrors + 1);
        await playSound(false);
    }
};






const renderResults = (rate, averageTime, errors) => {
    updateExerciseData('Exercise2', {
        rate,
        responseTime: averageTime,
        errors,
    });
    navigation.navigate('ResultScreen');
};

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.title}>SPEED TASK</Text>
            <Text style={styles.counterStyle}>Counter: {counter}/<Text style={styles.someColour}>{randomItemsArray.length}</Text></Text>
            </View>
            <View style={styles.mainElementsContainer}>
                <Text style={styles.whatIsThis}>What Is This?</Text>
            {currentItem && <Exercise2DisplayBox icon={currentItem.icon} />}
            <View style={styles.buttonsContainer}>
                {buttonValues.map((value, index) => (
                    <Exercise2Button key={index} value={value} onPress={handlePress} />
                ))}
            </View>
            </View>


            <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
            setShowModal(!showModal);
            }}
            >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>Match the word and symbol as fast as possible !</Text>
            <Button
             title="OK"
            onPress={() => {
            setShowModal(false);
            setExerciseStarted(true);
            }}
            />
        </View>
        </View>
        </Modal>
    </View>
    );
}

export default Exercise2;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colours.background,
    },

    whatIsThis: {
        fontSize: 40,
        fontFamily: 'OpenSans', 
        marginBottom: '2%',
    },

    someColour: {
        color: colours.accent,
    },

    mainElementsContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        flexDirection: 'row',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '1%'
    
    },

    counterStyle : {
        fontSize: 30,
        fontWeight: 'bold',
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    buttonsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
  },

  columnWrapper: {
    justifyContent: 'center',
},


centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: colours.background,
    borderRadius: 20,
    padding: '10%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20
  }


});