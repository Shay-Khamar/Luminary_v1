import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import ReadingCarouselItem, { ITEM_WIDTH, SLIDER_WIDTH } from './ReadingCarouselItem'  
import ExtractCatalogue from '../../../ExtractCatalogue'

const ReadingCarousel = () => {
    const isCarousel = React.useRef(null)

  return (
    <View>
        <Carousel
        layout='default'
        layoutCardOffset={9}
        ref={isCarousel}
        data={ExtractCatalogue}
        renderItem={ReadingCarouselItem}
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