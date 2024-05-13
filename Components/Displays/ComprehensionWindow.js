import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FontProvider } from '../misc/FontContext';
import CustomText from '../misc/CustomText';
import OptionsButton from '../Buttons/OptionsButton';

/**
 * A component that displays comprehension questions and options for a reading item.
 * It allows users to select an option and handles the selection to evaluate correctness.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.item - The reading item containing comprehension questions.
 * @param {Function} props.onCorrectAnswer - Function to call when the user selects the correct answer.
 * @param {Function} props.onHandleGuess - Function to call when the user makes a guess, correct or not.
 */
const ComprehensionWindow = ({ item, onCorrectAnswer, onHandleGuess }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = item.comprehensionQuestions[currentQuestionIndex];

  const handleOptionPress = (option) => {
    // Determine if the option selected is correct and invoke the corresponding callback
    if (option === currentQuestion.answer) {
      onCorrectAnswer();
    } else {
      onHandleGuess();
    }

    // Move to the next question or log completion if it was the last question
    if (currentQuestionIndex < item.comprehensionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Quiz completed');
    }
  };

  // Render nothing if there are no questions
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
    borderColor: '#000',
    borderWidth: 2,
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
    padding: '2%',
  },

  OptionsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});