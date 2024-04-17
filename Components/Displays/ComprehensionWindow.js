import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FontProvider } from '../misc/FontContext';
import CustomText from '../misc/CustomText';
import OptionsButton from '../Buttons/OptionsButton';

const ComprehensionWindow = ({ item, onCorrectAnswer }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = item.comprehensionQuestions[currentQuestionIndex];

  const handleOptionPress = (option) => {
    //console.log(option);
    // Move to the next question
    if(option === currentQuestion.answer){
      onCorrectAnswer();
    }


    if (currentQuestionIndex < item.comprehensionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Quiz completed'); // Handle quiz completion
    }
  };

  // Check if there are questions to display
  if (!item.comprehensionQuestions || item.comprehensionQuestions.length === 0) {
    return null; // or some placeholder indicating there are no questions
  }

 

  return (
    <FontProvider>
      <View style={styles.compWindowContainer}>
        <View style={styles.questionContainer}>
          <CustomText style={styles.QuestionHeader}>{currentQuestion.question}</CustomText>
          <View style={styles.OptionsContainer}>
            {currentQuestion.options.map((option, optionIndex) => (
              <OptionsButton key={optionIndex} onPress={() => handleOptionPress(option)}>
                {option}
              </OptionsButton>
            ))}
          </View>
        </View>
      </View>
    </FontProvider>
  );
};

export default ComprehensionWindow;

const styles = StyleSheet.create({
  compWindowContainer: {
    backgroundColor: '#fff',
    height: '70%',
    width: '40%', // Adjusted for better visibility
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
  },

  QuestionHeader: {
    fontSize: 24,
    textAlign: 'center',
  },

  OptionsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});