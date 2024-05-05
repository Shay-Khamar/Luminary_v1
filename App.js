import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer, getFocusedRouteNameFromRoute  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import { RecordingProvider } from './Components/misc/RecordingContext';
import { TimerProvider } from './Components/misc/TimerContext';
import * as ScreenOrientation from 'expo-screen-orientation'
import {ResultProvider} from './Components/misc/ResultContext';
import { useFonts } from 'expo-font';




import Home from './Components/Screens/BottomTabs/Home';
import ExampleScreen from './Components/Screens/Stacks/ExampleScreen';
import SomethingElse from './Components/Screens/BottomTabs/SomethingElse';
import CameraScreen from './Components/Displays/CameraScreen';
import ReadingCatalogue from './Components/Screens/Stacks/ReadingCatalogue';
import Exercise1 from './Components/Screens/Stacks/Exercise1';
import ResultScreen from './Components/Screens/Stacks/ResultScreen'; 
import Exercise2 from './Components/Screens/Stacks/Exercise2';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  return !['CameraScreen', 'SomethingElse'].includes(routeName);
}


function StackNavigator() {
  return (
    <Stack.Navigator
    options={{headerShown: false}}
    >
      <Stack.Screen name="HomeTab" options={{headerShown: false}} component={TabNavigator} />
      <Stack.Screen options={{ headerShown: false}} name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="ExampleScreen" component={ExampleScreen} />
      <Stack.Screen options={{headerShown: false}} name="ReadingCatalogue" component={ReadingCatalogue} />
      <Stack.Screen options={{headerShown: false}} name="Exercise1" component={Exercise1} />
      <Stack.Screen options={{headerShown: false}} name="ResultScreen" component={ResultScreen} />
      <Stack.Screen options={{headerShown: false}} name="Exercise2" component={Exercise2} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      headerStyle: {
        backgroundColor: 'blue',
        height : "6%",
        headerShown: false,

      },
      tabBarStyle : {
        display: getTabBarVisibility(route) ? "none" : "flex",
      }  
    })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SomethingElse" component={SomethingElse} />
    </Tab.Navigator>
  );
};




export default function App() {
  const [orienation, setOrientation] = useState(1);
  const [dimensions, setDimensions] = useState({ width: Dimensions.get('window').width, height: Dimensions.get('window').height });


  useEffect(() => {
    LockOrientation();
  }, []);


  let [fontsLoaded] = useFonts({
    'CourierPrime': require('./assets/fonts/CourierPrime-Regular.ttf'),
    'Helvetica': require('./assets/fonts/Helvetica.ttf'),
    'Lexend': require('./assets/fonts/Lexend-VariableFont_wght.ttf'),
    'OpenDyslexic': require('./assets/fonts/OpenDyslexic3-Regular.ttf'),
    'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
  });

  const LockOrientation = async () => {
    try {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      const o = await ScreenOrientation.getOrientationAsync();
      setOrientation(o);
    } catch (error) {
      console.error("Failed to lock orientation:", error);
    }
  };
  

  useEffect(() => {
    const update = () => {
      setDimensions({ width: Dimensions.get('window').width, height: Dimensions.get('window').height });
    };
  
    Dimensions.addEventListener('change', update);
    return () => Dimensions.removeEventListener('change', update);
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Or any loading indicator
  }


  return (
    <ResultProvider>
    <TimerProvider>
    <RecordingProvider>
    <PaperProvider>
    <NavigationContainer>
     <StackNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
    </PaperProvider>
    </RecordingProvider>
    </TimerProvider>
    </ResultProvider>
  );
}
AppRegistry.registerComponent('App', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
