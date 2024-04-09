import { StyleSheet, Text, ScrollView } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const Exercise1 = () => {
  const route = useRoute();
  const item = route.params?.Extract;

  // Split the content by newline characters to separate paragraphs
  const paragraphs = item?.content.split('\n\n');

  return (
    <ScrollView style={styles.container}>
      {paragraphs.map((paragraph, index) => (
        <Text key={index} style={styles.paragraph}>
          {paragraph}
        </Text>
      ))}
    </ScrollView>
  );
};

export default Exercise1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10, // Add some space between paragraphs
  },
});