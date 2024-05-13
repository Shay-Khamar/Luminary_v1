import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import ReadingCarouselItem, { ITEM_WIDTH, SLIDER_WIDTH } from './ReadingCarouselItem'
import ExtractCatalogue from '../../../ExtractCatalogue'
import { useNavigation } from '@react-navigation/native';

/**
 * A carousel component for displaying a list of reading items from an extract catalogue.
 * Utilizes navigation from react-navigation to handle navigation within carousel items.
 */
const ReadingCarousel = () => {
  const navigation = useNavigation();  // Hook to access navigation object.
  const isCarousel = React.useRef(null);  // Ref to hold the carousel component.
  const [index, setIndex] = React.useState(0)  // State to track the current carousel index.

  /**
   * Renders a single carousel item.
   * 
   * @param {Object} props - The properties for the item.
   * @param {Object} props.item - The data of the item to render.
   * @param {number} props.index - The index of the current item.
   * @returns {React.ReactNode} The carousel item component.
   */
  const renderItem = ({item, index}) => (
    <ReadingCarouselItem item={item} index={index} navigation={navigation} />
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
        onSnapToItem={(index) => setIndex(index)}
        inactiveSlideShift={0}
        useScrollView={true}
        />
    </View>
  )
}

export default ReadingCarousel

const styles = StyleSheet.create({})