import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import ReadingCarouselItem, { ITEM_WIDTH, SLIDER_WIDTH } from './ReadingCarouselItem'  
import ExtractCatalogue from '../../../ExtractCatalogue'
import { useNavigation } from '@react-navigation/native';


const ReadingCarousel = () => {
  const navigation = useNavigation(); // Use the hook to get the navigation object
  const isCarousel = React.useRef(null);

  const renderItem = ({item, index}) => (
    <ReadingCarouselItem item={item} index={index} navigation={navigation} /> // Pass navigation as a prop
  );

  return (
    <View>
        <Carousel
        layout='default'
        layoutCardOffset={9}
        ref={isCarousel}
        data={ExtractCatalogue}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
        />
    </View>
   
  )
}

export default ReadingCarousel

const styles = StyleSheet.create({})