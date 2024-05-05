import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carousel,{Pagination} from 'react-native-snap-carousel'
import ReadingCarouselItem, { ITEM_WIDTH, SLIDER_WIDTH } from './ReadingCarouselItem'  
import ExtractCatalogue from '../../../ExtractCatalogue'
import { useNavigation } from '@react-navigation/native';


const ReadingCarousel = () => {
  const navigation = useNavigation(); 
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState(0)


  const renderItem = ({item, index}) => (
    <ReadingCarouselItem  item={item} index={index} navigation={navigation} /> // Passing navigation as a prop worked
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